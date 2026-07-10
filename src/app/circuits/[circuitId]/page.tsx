import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCircuits, getCircuitWinners } from "@/lib/api/jolpica";
import { getCircuitGuide } from "@/content/circuits/circuit-guides";
import { getTrackPath } from "@/content/circuits/track-paths";
import { PageHeader } from "@/components/ui-kit/page-header";
import { StatCard } from "@/components/ui-kit/stat-card";
import { Section } from "@/components/ui-kit/section";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { DriverLink } from "@/components/ui-kit/driver-link";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { TrackMap } from "@/components/circuits/track-map";
import { CircuitWeather } from "@/components/circuits/circuit-weather";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { RaceResultRow } from "@/lib/models/f1";

type WinnerRow = { season: number; raceName: string; winner: RaceResultRow };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ circuitId: string }>;
}): Promise<Metadata> {
  const { circuitId } = await params;
  return { title: `Circuit — ${circuitId.replaceAll("_", " ")}` };
}

export default async function CircuitPage({
  params,
}: {
  params: Promise<{ circuitId: string }>;
}) {
  const { circuitId } = await params;
  const [allCircuits, winners] = await Promise.all([
    getCircuits(),
    getCircuitWinners(circuitId, 10),
  ]);

  const circuit = allCircuits.ok
    ? allCircuits.data.find((entry) => entry.circuitId === circuitId)
    : undefined;
  const guide = getCircuitGuide(circuitId);
  const track = getTrackPath(circuitId);

  if (!circuit) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <ErrorNote context="this circuit" error={allCircuits.ok ? undefined : allCircuits.error} />
      </main>
    );
  }

  const winnerColumns: Column<WinnerRow>[] = [
    { key: "season", header: "Season", render: (row) => (
      <Link href={`/seasons/${row.season}`} className="font-medium hover:underline">
        {row.season}
      </Link>
    ) },
    { key: "race", header: "Race", render: (row) => row.raceName },
    { key: "winner", header: "Winner", render: (row) => <DriverLink driver={row.winner.driver} /> },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <TeamChip
          constructorId={row.winner.constructor.constructorId}
          name={row.winner.constructor.name}
        />
      ),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={circuit.name}
        lead={`${circuit.locality}, ${circuit.country}`}
      >
        <CountryFlag country={circuit.country} className="h-8" />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass-panel rounded-xl p-6 lg:col-span-3">
          {track ? (
            <>
              <TrackMap track={track} className="mx-auto max-h-96 w-full text-foreground" />
              <div className="mt-3 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="inline-block h-1 w-6 rounded bg-current" /> Racing line
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="inline-block h-1.5 w-6 rounded bg-[#22C55E]" /> DRS zone
                </span>
                <span>Stylized layout — not to scale</span>
              </div>
            </>
          ) : (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No stylized map available for this historical circuit.
            </p>
          )}
        </div>
        <div className="glass-panel rounded-xl p-6 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trackside weather
          </h2>
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <CircuitWeather lat={circuit.lat} lng={circuit.lng} />
          </Suspense>
        </div>
      </div>

      {guide ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Length" value={`${guide.lengthKm} km`} />
            <StatCard label="Race laps" value={guide.laps} />
            <StatCard label="Corners" value={guide.corners} />
            <StatCard label="DRS zones" value={guide.drsZoneCount} accentColor="#22C55E" />
            <StatCard
              label="Lap record"
              value={guide.lapRecord?.time ?? "—"}
              sub={
                guide.lapRecord
                  ? `${guide.lapRecord.driver}, ${guide.lapRecord.year}`
                  : "New circuit — no record yet"
              }
              accentColor="#A855F7"
            />
          </div>

          <Section title="Corner by corner">
            <Accordion type="multiple" className="glass-panel rounded-xl px-5">
              {guide.cornerGuide.map((corner) => (
                <AccordionItem key={String(corner.corner)} value={String(corner.corner)}>
                  <AccordionTrigger className="text-left">
                    <span>
                      <span className="timing-mono mr-3 text-muted-foreground">
                        T{corner.corner}
                      </span>
                      {corner.name ?? `Turn ${corner.corner}`}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{corner.note}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>

          <Section title="Race craft">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass-panel rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Overtaking spots
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {guide.overtakingSpots.map((spot) => (
                    <li key={spot} className="flex gap-2">
                      <span aria-hidden className="text-primary">▸</span>
                      {spot}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">{guide.elevationNote}</p>
              </div>
              <div className="glass-panel rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Strategy & tires
                </h3>
                <p className="mt-2">
                  <Badge
                    variant={guide.tireStress === "high" ? "destructive" : "secondary"}
                  >
                    {guide.tireStress} tire stress
                  </Badge>
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {guide.strategyNotes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <span aria-hidden className="text-primary">▸</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel carbon-texture rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Interesting facts
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {guide.funFacts.map((fact) => (
                    <li key={fact} className="flex gap-2">
                      <span aria-hidden>💡</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </>
      ) : null}

      {winners.ok && winners.data.length > 0 ? (
        <Section title="Recent winners">
          <DataTable
            columns={winnerColumns}
            rows={winners.data}
            rowKey={(row) => `${row.season}`}
            caption={`Recent winners at ${circuit.name}`}
          />
        </Section>
      ) : !winners.ok ? (
        <div className="mt-8">
          <ErrorNote context="past winners" error={winners.error} />
        </div>
      ) : null}
    </main>
  );
}
