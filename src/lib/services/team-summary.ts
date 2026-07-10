import type { ConstructorStanding } from "@/lib/models/f1";
import type { DriverRaceResult } from "@/lib/api/jolpica";

export type TeamSummary = {
  entries: number;
  seasons: number;
  wins: number;
  podiums: number;
  poles: number;
  points: number;
  championshipSeasons: number[];
  bestFinish: { position: number; count: number } | null;
  seasonBreakdown: {
    year: number;
    position: number;
    points: number;
    wins: number;
  }[];
};

export function buildTeamSummary(
  results: DriverRaceResult[],
  standingsBySeason: { season: number; standing: ConstructorStanding }[],
): TeamSummary {
  let wins = 0;
  let podiums = 0;
  let poles = 0;
  let points = 0;
  const seasons = new Set<number>();
  let bestPosition = Number.POSITIVE_INFINITY;
  let bestCount = 0;

  for (const entry of results) {
    const row = entry.result;
    seasons.add(entry.season);
    if (row.position === 1) wins += 1;
    if (row.position >= 1 && row.position <= 3) podiums += 1;
    if (row.grid === 1) poles += 1;
    points += row.points;
    if (row.position > 0 && row.position < bestPosition) {
      bestPosition = row.position;
      bestCount = 1;
    } else if (row.position === bestPosition) {
      bestCount += 1;
    }
  }

  return {
    entries: results.length,
    seasons: seasons.size,
    wins,
    podiums,
    poles,
    points,
    championshipSeasons: standingsBySeason
      .filter((entry) => entry.standing.position === 1)
      .map((entry) => entry.season)
      .sort((a, b) => a - b),
    bestFinish: Number.isFinite(bestPosition)
      ? { position: bestPosition, count: bestCount }
      : null,
    seasonBreakdown: standingsBySeason
      .map((entry) => ({
        year: entry.season,
        position: entry.standing.position,
        points: entry.standing.points,
        wins: entry.standing.wins,
      }))
      .sort((a, b) => b.year - a.year),
  };
}
