import type { Metadata } from "next";
import Link from "next/link";
import { getCircuits } from "@/lib/api/jolpica";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { getCircuitGuide } from "@/content/circuits/circuit-guides";
import { getTrackPath } from "@/content/circuits/track-paths";
import { PageHeader } from "@/components/ui-kit/page-header";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { TrackMap } from "@/components/circuits/track-map";

export const metadata: Metadata = {
  title: "Circuits",
  description:
    "Every circuit on the Formula One calendar — track maps, corner guides and records.",
};

export default async function CircuitsPage() {
  const circuits = await getCircuits(CURRENT_SEASON);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${CURRENT_SEASON} Circuits`}
        lead="Track maps, corner-by-corner guides, DRS zones and lap records for every venue on the calendar."
      />

      {!circuits.ok ? (
        <ErrorNote context="the circuit list" error={circuits.error} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {circuits.data.map((circuit, index) => {
            const guide = getCircuitGuide(circuit.circuitId);
            const track = getTrackPath(circuit.circuitId);
            return (
              <FadeIn key={circuit.circuitId} delay={Math.min(index * 0.03, 0.4)}>
                <Link
                  href={`/circuits/${circuit.circuitId}`}
                  className="glass-panel group flex h-full gap-4 rounded-xl p-5 transition-shadow hover:shadow-md"
                >
                  {track ? (
                    <TrackMap
                      track={track}
                      animate={false}
                      className="size-24 shrink-0 text-foreground"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 font-bold leading-snug group-hover:underline">
                      <CountryFlag country={circuit.country} />
                      <span className="truncate">{circuit.name}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {circuit.locality}, {circuit.country}
                    </p>
                    {guide ? (
                      <p className="mt-2 text-sm">
                        <span className="timing-mono font-semibold">{guide.lengthKm} km</span>
                        <span className="text-muted-foreground">
                          {" "}· {guide.corners} corners · {guide.drsZoneCount} DRS
                        </span>
                      </p>
                    ) : null}
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </main>
  );
}
