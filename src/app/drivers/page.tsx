import type { Metadata } from "next";
import Link from "next/link";
import { getDriverStandings } from "@/lib/api/jolpica";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { getDriverMeta } from "@/content/drivers/driver-meta";
import { getTeamColor } from "@/content/teams/team-meta";
import { PageHeader } from "@/components/ui-kit/page-header";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { FadeIn } from "@/components/ui-kit/fade-in";

export const metadata: Metadata = {
  title: "Drivers",
  description: "The current Formula One grid — profiles, statistics and career histories.",
};

export default async function DriversPage() {
  const standings = await getDriverStandings(CURRENT_SEASON);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${CURRENT_SEASON} Grid`}
        lead="Every driver racing this season, ordered by championship position. Looking for a legend? Any driver in history is searchable with ⌘K."
      />

      {!standings.ok ? (
        <ErrorNote context="the driver list" error={standings.error} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {standings.data.map((standing, index) => {
            const driver = standing.driver;
            const constructor = standing.constructors.at(-1);
            const meta = getDriverMeta(driver.driverId);
            const teamColor = getTeamColor(constructor?.constructorId ?? "");
            return (
              <FadeIn key={driver.driverId} delay={Math.min(index * 0.03, 0.4)}>
                <Link
                  href={`/drivers/${driver.driverId}`}
                  className="glass-panel group relative block h-full overflow-hidden rounded-xl p-5 transition-shadow hover:shadow-md"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: teamColor }}
                  />
                  {meta ? (
                    <span
                      aria-hidden
                      className="absolute right-4 top-4 size-6 rounded-full border-2"
                      style={{
                        backgroundColor: meta.helmetColors[0],
                        borderColor: meta.helmetColors[1],
                      }}
                      title="Helmet colors"
                    />
                  ) : null}
                  <p className="timing-mono text-3xl font-black text-muted-foreground/50">
                    {driver.permanentNumber ?? "—"}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 text-lg font-bold group-hover:underline">
                    <CountryFlag nationality={driver.nationality} />
                    {driver.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{constructor?.name}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">P{standing.position}</span>{" "}
                    <span className="text-muted-foreground">
                      · {standing.points} pts · {standing.wins} wins
                    </span>
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </main>
  );
}
