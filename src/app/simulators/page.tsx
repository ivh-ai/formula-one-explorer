import type { Metadata } from "next";
import { getDriverStandings, getSchedule } from "@/lib/api/jolpica";
import { getNextRace } from "@/lib/utils/countdown";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { PageHeader } from "@/components/ui-kit/page-header";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChampionshipSim } from "@/components/simulators/championship-sim";
import { TireStrategyViz } from "@/components/simulators/tire-strategy-viz";
import { PitStopGame } from "@/components/simulators/pit-stop-game";

export const metadata: Metadata = {
  title: "Simulators",
  description:
    "Interactive F1 tools: championship permutations, tire strategy comparison and a pit stop reaction game.",
};

export default async function SimulatorsPage() {
  const [standings, schedule] = await Promise.all([
    getDriverStandings(CURRENT_SEASON),
    getSchedule(CURRENT_SEASON),
  ]);

  const now = new Date();
  const remaining = schedule.ok
    ? schedule.data.filter(
        (race) =>
          race.dateTimeUtc !== null && new Date(race.dateTimeUtc).getTime() > now.getTime(),
      )
    : [];
  const nextRace = schedule.ok ? getNextRace(schedule.data, now) : null;
  const remainingSprints = remaining.filter((race) => race.sprint).length;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Simulators"
        lead={`Play strategist${nextRace ? ` before the ${nextRace.raceName}` : ""}: run the title permutations, duel two tire strategies, and try a two-second pit stop yourself.`}
      />

      <Tabs defaultValue="championship">
        <TabsList>
          <TabsTrigger value="championship">Championship</TabsTrigger>
          <TabsTrigger value="strategy">Tire strategy</TabsTrigger>
          <TabsTrigger value="pitstop">Pit stop challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="championship" className="mt-4">
          {standings.ok && standings.data.length > 0 ? (
            <ChampionshipSim
              standings={standings.data}
              remainingRaces={remaining.length}
              remainingSprints={remainingSprints}
            />
          ) : (
            <ErrorNote context="current standings" />
          )}
        </TabsContent>

        <TabsContent value="strategy" className="mt-4">
          <TireStrategyViz />
        </TabsContent>

        <TabsContent value="pitstop" className="mt-4">
          <PitStopGame />
        </TabsContent>
      </Tabs>
    </main>
  );
}
