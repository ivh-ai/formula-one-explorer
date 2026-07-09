import type { Metadata } from "next";
import { getSchedule } from "@/lib/api/jolpica";
import { getNextRace } from "@/lib/utils/countdown";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { PageHeader } from "@/components/ui-kit/page-header";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { EmptyState } from "@/components/ui-kit/empty-state";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { YearSelector } from "@/components/standings/year-selector";
import { RaceCard } from "@/components/calendar/race-card";

export const metadata: Metadata = {
  title: "Race Calendar",
  description: "The Formula One race calendar with session times and countdowns.",
};

function parseYear(raw: string | undefined): number {
  const year = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(year)) return CURRENT_SEASON;
  return Math.min(Math.max(year, FIRST_SEASON), CURRENT_SEASON);
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const year = parseYear((await searchParams).year);
  const schedule = await getSchedule(year);
  const now = new Date();
  const nextRace = schedule.ok ? getNextRace(schedule.data, now) : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${year} Race Calendar`}
        lead={`Every Grand Prix of the ${year} season — session times, sprint weekends and countdowns.`}
      >
        <YearSelector year={year} />
      </PageHeader>

      {!schedule.ok ? (
        <ErrorNote context="the race calendar" error={schedule.error} />
      ) : schedule.data.length === 0 ? (
        <EmptyState
          title="Calendar not published"
          message={`No races found for ${year} yet.`}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schedule.data.map((race, index) => {
            const isNext = nextRace?.round === race.round;
            const isPast =
              !isNext &&
              race.dateTimeUtc !== null &&
              new Date(race.dateTimeUtc).getTime() < now.getTime();
            return (
              <FadeIn key={race.round} delay={Math.min(index * 0.04, 0.4)}>
                <RaceCard
                  race={race}
                  status={isNext ? "next" : isPast ? "completed" : "upcoming"}
                />
              </FadeIn>
            );
          })}
        </div>
      )}
    </main>
  );
}
