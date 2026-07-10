import type { Metadata } from "next";
import { getSeasonResultsBulk } from "@/lib/api/jolpica";
import { computeSeasonStats } from "@/lib/services/season-stats";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { ALL_TIME_RECORDS } from "@/content/stats/records";
import { PageHeader } from "@/components/ui-kit/page-header";
import { Section } from "@/components/ui-kit/section";
import { StatCard } from "@/components/ui-kit/stat-card";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { WinsByTeamChart } from "@/components/stats/wins-by-team-chart";

export const metadata: Metadata = {
  title: "Statistics",
  description: "All-time Formula One records and the current season in numbers.",
};

export default async function StatsPage() {
  const results = await getSeasonResultsBulk(CURRENT_SEASON);
  const stats = results.ok ? computeSeasonStats(results.data) : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Statistics"
        lead="The records that define greatness, and the current season by the numbers."
      />

      <Section title={`${CURRENT_SEASON} in numbers`}>
        {!results.ok ? (
          <ErrorNote context="current-season statistics" error={results.error} />
        ) : stats && stats.races > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              <StatCard label="Races completed" value={stats.races} accentColor="#E8002D" />
              <StatCard
                label="Different winners"
                value={stats.differentWinners}
                accentColor="#FF8000"
              />
              <StatCard
                label="Podium visitors"
                value={stats.differentPodiumFinishers}
                accentColor="#27F4D2"
              />
              <StatCard label="Retirements" value={stats.dnfCount} accentColor="#3671C6" />
            </div>
            <WinsByTeamChart data={stats.winsByTeam} />
          </div>
        ) : (
          <p className="text-muted-foreground">
            The {CURRENT_SEASON} season hasn&apos;t produced results yet.
          </p>
        )}
      </Section>

      <Section
        title="All-time records"
        lead="The benchmarks of 75+ years, accurate to mid-2026."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ALL_TIME_RECORDS.map((category, index) => (
            <FadeIn key={category.category} delay={Math.min(index * 0.05, 0.3)}>
              <div className="glass-panel h-full rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {category.category}
                </h3>
                <ul className="mt-3 space-y-3">
                  {category.records.map((record) => (
                    <li key={record.detail} className="flex items-baseline gap-3">
                      <span className="timing-mono shrink-0 text-lg font-bold text-primary">
                        {record.value}
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">{record.holder}</span>
                        <br />
                        <span className="text-muted-foreground">{record.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </main>
  );
}
