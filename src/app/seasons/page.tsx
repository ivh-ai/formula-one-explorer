import type { Metadata } from "next";
import Link from "next/link";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { getChampion } from "@/content/history/champions";
import { PageHeader } from "@/components/ui-kit/page-header";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Season Archive",
  description: "Every Formula One season from 1950 to today.",
};

export default function SeasonsPage() {
  const decades: { label: string; years: number[] }[] = [];
  for (let year = CURRENT_SEASON; year >= FIRST_SEASON; year -= 1) {
    const decadeStart = Math.floor(year / 10) * 10;
    const label = `${decadeStart}s`;
    let decade = decades.find((entry) => entry.label === label);
    if (!decade) {
      decade = { label, years: [] };
      decades.push(decade);
    }
    decade.years.push(year);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Season Archive"
        lead={`Every world championship since ${FIRST_SEASON} — calendars, results, standings and the stories that defined them.`}
      />

      <div className="space-y-10">
        {decades.map((decade, index) => (
          <FadeIn key={decade.label} delay={Math.min(index * 0.04, 0.3)}>
            <section aria-labelledby={`decade-${decade.label}`}>
              <h2
                id={`decade-${decade.label}`}
                className="heading-editorial mb-4 text-2xl text-muted-foreground"
              >
                {decade.label}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {decade.years.map((year) => {
                  const champion = getChampion(year);
                  return (
                    <Link
                      key={year}
                      href={`/seasons/${year}`}
                      className="glass-panel group flex items-center justify-between gap-3 rounded-xl p-4 transition-shadow hover:shadow-md"
                    >
                      <div>
                        <p className="timing-mono text-xl font-bold group-hover:underline">
                          {year}
                        </p>
                        {champion ? (
                          <p className="text-sm text-muted-foreground">
                            🏆 {champion.driver}
                            <span className="hidden sm:inline"> · {champion.team}</span>
                          </p>
                        ) : (
                          <Badge className="mt-1 bg-[var(--live)] text-white">In progress</Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
