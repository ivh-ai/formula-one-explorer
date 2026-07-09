import type { Metadata } from "next";
import Link from "next/link";
import { ERAS } from "@/content/history/eras";
import { WORLD_CHAMPIONS } from "@/content/history/champions";
import { PageHeader } from "@/components/ui-kit/page-header";
import { Section } from "@/components/ui-kit/section";
import { EraTimeline } from "@/components/history/era-timeline";

export const metadata: Metadata = {
  title: "History",
  description:
    "The history of Formula One — every era from 1950 to today, champions by decade and the moments that defined the sport.",
};

function championCounts(): { driver: string; titles: number[] }[] {
  const byDriver = new Map<string, number[]>();
  for (const [year, champion] of Object.entries(WORLD_CHAMPIONS)) {
    const years = byDriver.get(champion.driver) ?? [];
    years.push(Number.parseInt(year, 10));
    byDriver.set(champion.driver, years);
  }
  return [...byDriver.entries()]
    .map(([driver, titles]) => ({ driver, titles: titles.sort((a, b) => a - b) }))
    .sort((a, b) => b.titles.length - a.titles.length)
    .slice(0, 8);
}

export default function HistoryPage() {
  const mostTitles = championCounts();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Seventy-five years of speed"
        lead="From front-engined roadsters on airfields to hybrid ground-effect machines on five continents — the story of Formula One, era by era."
      />

      <Section title="The most decorated champions">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mostTitles.map((entry) => (
            <div key={entry.driver} className="glass-panel rounded-xl p-4">
              <p className="timing-mono text-3xl font-black">{entry.titles.length}</p>
              <p className="font-semibold">{entry.driver}</p>
              <p className="text-xs text-muted-foreground">{entry.titles.join(", ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The eras">
        <EraTimeline eras={ERAS} />
      </Section>

      <Section title="Explore further">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/seasons"
            className="glass-panel carbon-texture group rounded-xl p-6 hover:shadow-md"
          >
            <h3 className="text-lg font-bold group-hover:underline">Season archive →</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Full results and standings for every championship since 1950.
            </p>
          </Link>
          <Link
            href="/learn/history-of-f1"
            className="glass-panel carbon-texture group rounded-xl p-6 hover:shadow-md"
          >
            <h3 className="text-lg font-bold group-hover:underline">History lesson →</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The interactive course version, with quiz and flashcards.
            </p>
          </Link>
        </div>
      </Section>
    </main>
  );
}
