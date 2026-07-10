import type { Metadata } from "next";
import Link from "next/link";
import { getConstructorStandings } from "@/lib/api/jolpica";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { getTeamMeta, getTeamColor } from "@/content/teams/team-meta";
import { PageHeader } from "@/components/ui-kit/page-header";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { FadeIn } from "@/components/ui-kit/fade-in";

export const metadata: Metadata = {
  title: "Teams",
  description: "Every Formula One team on the current grid — profiles, history and statistics.",
};

export default async function TeamsPage() {
  const standings = await getConstructorStandings(CURRENT_SEASON);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${CURRENT_SEASON} Teams`}
        lead="Eleven constructors, ordered by championship position. Historical teams are reachable from any season page or via search."
      />

      {!standings.ok ? (
        <ErrorNote context="the team list" error={standings.error} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standings.data.map((standing, index) => {
            const constructor = standing.constructor;
            const meta = getTeamMeta(constructor.constructorId);
            const color = getTeamColor(constructor.constructorId);
            return (
              <FadeIn key={constructor.constructorId} delay={Math.min(index * 0.04, 0.4)}>
                <Link
                  href={`/teams/${constructor.constructorId}`}
                  className="glass-panel carbon-texture group relative block h-full overflow-hidden rounded-xl p-6 transition-shadow hover:shadow-md"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold group-hover:underline">
                      {meta?.name ?? constructor.name}
                    </h3>
                    <span className="timing-mono text-2xl font-black text-muted-foreground/40">
                      P{standing.position}
                    </span>
                  </div>
                  {meta ? (
                    <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4">
                        <dt>Principal</dt>
                        <dd className="text-right font-medium text-foreground">{meta.principal}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Power unit</dt>
                        <dd className="text-right font-medium text-foreground">{meta.powerUnit}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Base</dt>
                        <dd className="text-right font-medium text-foreground">{meta.base}</dd>
                      </div>
                    </dl>
                  ) : null}
                  <p className="mt-4 text-sm">
                    <span className="timing-mono font-bold">{standing.points}</span>{" "}
                    <span className="text-muted-foreground">
                      pts · {standing.wins} wins
                      {meta && meta.championships > 0
                        ? ` · ${meta.championships} titles`
                        : ""}
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
