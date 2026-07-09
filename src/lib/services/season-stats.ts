import type { RaceResultRow } from "@/lib/models/f1";

export type SeasonStats = {
  races: number;
  differentWinners: number;
  differentPodiumFinishers: number;
  winsByTeam: { constructorId: string; name: string; wins: number }[];
  dnfCount: number;
  avgFinishers: number;
};

/** Aggregate "season in numbers" stats from bulk per-round results. */
export function computeSeasonStats(byRound: Map<number, RaceResultRow[]>): SeasonStats {
  const winners = new Set<string>();
  const podiumFinishers = new Set<string>();
  const winsByTeam = new Map<string, { name: string; wins: number }>();
  let dnfCount = 0;
  let finisherTotal = 0;
  let races = 0;

  for (const rows of byRound.values()) {
    if (rows.length === 0) continue;
    races += 1;
    for (const row of rows) {
      if (row.position === 1) {
        winners.add(row.driver.driverId);
        const team = winsByTeam.get(row.constructor.constructorId) ?? {
          name: row.constructor.name,
          wins: 0,
        };
        team.wins += 1;
        winsByTeam.set(row.constructor.constructorId, team);
      }
      if (row.position >= 1 && row.position <= 3) {
        podiumFinishers.add(row.driver.driverId);
      }
      // Ergast convention: classified finishers have "Finished" or "+n Laps".
      if (row.status === "Finished" || row.status.startsWith("+")) {
        finisherTotal += 1;
      } else {
        dnfCount += 1;
      }
    }
  }

  return {
    races,
    differentWinners: winners.size,
    differentPodiumFinishers: podiumFinishers.size,
    winsByTeam: [...winsByTeam.entries()]
      .map(([constructorId, team]) => ({ constructorId, ...team }))
      .sort((a, b) => b.wins - a.wins),
    dnfCount,
    avgFinishers: races > 0 ? Math.round((finisherTotal / races) * 10) / 10 : 0,
  };
}
