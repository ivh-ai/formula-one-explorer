import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getConstructorStandings,
  getDriverStandings,
  getSchedule,
} from "@/lib/api/jolpica";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { getChampion } from "@/content/history/champions";
import { getSeasonNote } from "@/content/history/season-notes";
import { formatDate } from "@/lib/utils/format";
import { PageHeader } from "@/components/ui-kit/page-header";
import { Section } from "@/components/ui-kit/section";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { DriverLink } from "@/components/ui-kit/driver-link";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { Badge } from "@/components/ui/badge";
import type { ConstructorStanding, DriverStanding, Race } from "@/lib/models/f1";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Season`,
    description: `The ${year} Formula One season — calendar, results and standings.`,
  };
}

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  if (Number.isNaN(year) || year < FIRST_SEASON || year > CURRENT_SEASON) notFound();

  const [schedule, drivers, constructors] = await Promise.all([
    getSchedule(year),
    getDriverStandings(year),
    getConstructorStandings(year),
  ]);

  const champion = getChampion(year);
  const note = getSeasonNote(year);
  const now = new Date();

  const raceColumns: Column<Race>[] = [
    { key: "round", header: "Rd", align: "right", render: (race) => race.round },
    {
      key: "race",
      header: "Grand Prix",
      render: (race) => {
        const hasHappened =
          race.dateTimeUtc !== null && new Date(race.dateTimeUtc).getTime() < now.getTime();
        return (
          <span className="flex items-center gap-2">
            <CountryFlag country={race.circuit.country} />
            {hasHappened ? (
              <Link
                href={`/seasons/${year}/${race.round}`}
                className="font-medium hover:underline"
              >
                {race.raceName}
              </Link>
            ) : (
              <span className="font-medium">{race.raceName}</span>
            )}
            {race.sprint ? <Badge variant="secondary">Sprint</Badge> : null}
          </span>
        );
      },
    },
    {
      key: "circuit",
      header: "Circuit",
      className: "text-muted-foreground",
      render: (race) => (
        <Link href={`/circuits/${race.circuit.circuitId}`} className="hover:underline">
          {race.circuit.name}
        </Link>
      ),
    },
    {
      key: "date",
      header: "Date",
      align: "right",
      className: "timing-mono",
      render: (race) => formatDate(race.dateTimeUtc ?? race.date),
    },
  ];

  const driverColumns: Column<DriverStanding>[] = [
    { key: "pos", header: "Pos", align: "right", render: (row) => row.position },
    { key: "driver", header: "Driver", render: (row) => <DriverLink driver={row.driver} /> },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          {row.constructors.map((constructor) => (
            <TeamChip
              key={constructor.constructorId}
              constructorId={constructor.constructorId}
              name={constructor.name}
            />
          ))}
        </span>
      ),
    },
    {
      key: "points",
      header: "Points",
      align: "right",
      className: "timing-mono font-semibold",
      render: (row) => row.points,
    },
  ];

  const constructorColumns: Column<ConstructorStanding>[] = [
    { key: "pos", header: "Pos", align: "right", render: (row) => row.position },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <TeamChip
          constructorId={row.constructor.constructorId}
          name={row.constructor.name}
          className="font-medium"
        />
      ),
    },
    {
      key: "points",
      header: "Points",
      align: "right",
      className: "timing-mono font-semibold",
      render: (row) => row.points,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${year} Season`}
        lead={
          champion
            ? `World Champion: ${champion.driver} (${champion.team})`
            : "Championship in progress."
        }
      >
        <div className="flex items-center gap-2">
          {year > FIRST_SEASON ? (
            <Link
              href={`/seasons/${year - 1}`}
              className="glass-panel rounded-lg px-3 py-1.5 text-sm font-medium hover:shadow-md"
            >
              ← {year - 1}
            </Link>
          ) : null}
          {year < CURRENT_SEASON ? (
            <Link
              href={`/seasons/${year + 1}`}
              className="glass-panel rounded-lg px-3 py-1.5 text-sm font-medium hover:shadow-md"
            >
              {year + 1} →
            </Link>
          ) : null}
        </div>
      </PageHeader>

      {note ? (
        <div className="glass-panel carbon-texture mb-8 rounded-xl p-6">
          <h2 className="heading-editorial text-xl">{note.headline}</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            {note.notes.map((entry) => (
              <li key={entry} className="flex gap-2">
                <span aria-hidden className="text-primary">▸</span>
                {entry}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!schedule.ok ? (
        <ErrorNote context="the season calendar" error={schedule.error} />
      ) : (
        <Section title="Calendar" lead="Completed races link to full results.">
          <DataTable
            columns={raceColumns}
            rows={schedule.data}
            rowKey={(race) => String(race.round)}
            caption={`${year} race calendar`}
          />
        </Section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {drivers.ok && drivers.data.length > 0 ? (
            <Section title="Final driver standings">
              <DataTable
                columns={driverColumns}
                rows={drivers.data}
                rowKey={(row) => row.driver.driverId}
                caption={`${year} driver standings`}
              />
            </Section>
          ) : !drivers.ok ? (
            <ErrorNote context="driver standings" error={drivers.error} />
          ) : null}
        </div>
        <div>
          {constructors.ok && constructors.data.length > 0 ? (
            <Section title="Constructor standings">
              <DataTable
                columns={constructorColumns}
                rows={constructors.data}
                rowKey={(row) => row.constructor.constructorId}
                caption={`${year} constructor standings`}
              />
            </Section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
