import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQualifying, getRaceResults, getSprintResults } from "@/lib/api/jolpica";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { formatDate } from "@/lib/utils/format";
import { PageHeader } from "@/components/ui-kit/page-header";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { Section } from "@/components/ui-kit/section";
import { RaceResultsTabs } from "@/components/seasons/race-results-tabs";
import { PositionChanges } from "@/components/seasons/position-changes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; round: string }>;
}): Promise<Metadata> {
  const { year, round } = await params;
  return { title: `${year} · Round ${round}` };
}

export default async function RacePage({
  params,
}: {
  params: Promise<{ year: string; round: string }>;
}) {
  const { year: yearParam, round: roundParam } = await params;
  const year = Number.parseInt(yearParam, 10);
  const round = Number.parseInt(roundParam, 10);
  if (
    Number.isNaN(year) ||
    Number.isNaN(round) ||
    year < FIRST_SEASON ||
    year > CURRENT_SEASON ||
    round < 1
  ) {
    notFound();
  }

  const [raceResults, qualifying, sprint] = await Promise.all([
    getRaceResults(year, round),
    getQualifying(year, round),
    getSprintResults(year, round),
  ]);

  if (!raceResults.ok) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <ErrorNote context="this race" error={raceResults.error} />
      </main>
    );
  }

  if (raceResults.data === null) notFound();

  const { race, results } = raceResults.data;
  const winner = results[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <p className="mb-2 text-sm text-muted-foreground">
        <Link href={`/seasons/${year}`} className="hover:underline">
          {year} season
        </Link>{" "}
        · Round {race.round}
      </p>
      <PageHeader
        title={race.raceName}
        lead={`${formatDate(race.dateTimeUtc ?? race.date)} · ${race.circuit.name}, ${race.circuit.locality}`}
      >
        <div className="flex items-center gap-3">
          <CountryFlag country={race.circuit.country} className="h-6" />
          <Link
            href={`/circuits/${race.circuit.circuitId}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Circuit guide →
          </Link>
        </div>
      </PageHeader>

      {winner ? (
        <div className="glass-panel mb-8 flex flex-wrap items-center gap-x-8 gap-y-2 rounded-xl p-5">
          <p>
            <span className="text-sm text-muted-foreground">Winner</span>
            <br />
            <span className="text-lg font-bold">🏆 {winner.driver.fullName}</span>
          </p>
          <p>
            <span className="text-sm text-muted-foreground">Team</span>
            <br />
            <span className="font-medium">{winner.constructor.name}</span>
          </p>
          <p>
            <span className="text-sm text-muted-foreground">Race time</span>
            <br />
            <span className="timing-mono font-medium">{winner.timeText ?? "—"}</span>
          </p>
          <p>
            <span className="text-sm text-muted-foreground">Laps</span>
            <br />
            <span className="timing-mono font-medium">{winner.laps}</span>
          </p>
        </div>
      ) : null}

      <RaceResultsTabs
        results={results}
        qualifying={qualifying.ok ? qualifying.data : []}
        sprint={sprint.ok ? sprint.data : []}
      />

      {results.length > 0 ? (
        <Section title="Position changes">
          <PositionChanges results={results} />
        </Section>
      ) : null}
    </main>
  );
}
