import type { DriverRaceResult, SeasonStanding } from "@/lib/api/jolpica";

export type CareerSummary = {
  starts: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  points: number;
  championships: number;
  firstRace: { year: number; raceName: string } | null;
  lastRace: { year: number; raceName: string } | null;
  teams: { constructorId: string; name: string; years: string }[];
  seasonBreakdown: {
    year: number;
    team: string;
    constructorId: string;
    points: number;
    position: number;
    wins: number;
    podiums: number;
  }[];
};

function formatYearRanges(years: number[]): string {
  const sorted = [...new Set(years)].sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (const year of sorted.slice(1)) {
    if (year === prev + 1) {
      prev = year;
      continue;
    }
    ranges.push(start === prev ? `${start}` : `${start}–${prev}`);
    start = year;
    prev = year;
  }
  if (start !== undefined) {
    ranges.push(start === prev ? `${start}` : `${start}–${prev}`);
  }
  return ranges.join(", ");
}

export function buildCareerSummary(
  results: DriverRaceResult[],
  standings: SeasonStanding[],
): CareerSummary {
  const sorted = [...results].sort(
    (a, b) => a.season - b.season || a.round - b.round,
  );

  let wins = 0;
  let podiums = 0;
  let poles = 0;
  let fastestLaps = 0;
  let points = 0;
  const teamYears = new Map<string, { name: string; years: number[] }>();
  const seasonAgg = new Map<
    number,
    { wins: number; podiums: number; teams: Map<string, string> }
  >();

  for (const entry of sorted) {
    const row = entry.result;
    if (row.position === 1) wins += 1;
    if (row.position >= 1 && row.position <= 3) podiums += 1;
    if (row.grid === 1) poles += 1;
    if (row.fastestLap?.rank === 1) fastestLaps += 1;
    points += row.points;

    const team = teamYears.get(row.constructor.constructorId) ?? {
      name: row.constructor.name,
      years: [],
    };
    team.years.push(entry.season);
    teamYears.set(row.constructor.constructorId, team);

    const seasonEntry = seasonAgg.get(entry.season) ?? {
      wins: 0,
      podiums: 0,
      teams: new Map<string, string>(),
    };
    if (row.position === 1) seasonEntry.wins += 1;
    if (row.position >= 1 && row.position <= 3) seasonEntry.podiums += 1;
    seasonEntry.teams.set(row.constructor.constructorId, row.constructor.name);
    seasonAgg.set(entry.season, seasonEntry);
  }

  const standingsBySeason = new Map(standings.map((entry) => [entry.season, entry]));

  const seasonBreakdown = [...seasonAgg.entries()]
    .map(([year, agg]) => {
      const standing = standingsBySeason.get(year);
      const teamNames = [...agg.teams.values()].join(" / ");
      const constructorId = [...agg.teams.keys()][0] ?? "";
      return {
        year,
        team: teamNames,
        constructorId,
        points: standing?.points ?? 0,
        position: standing?.position ?? 0,
        wins: agg.wins,
        podiums: agg.podiums,
      };
    })
    .sort((a, b) => b.year - a.year);

  const first = sorted[0];
  const last = sorted.at(-1);

  return {
    starts: sorted.length,
    wins,
    podiums,
    poles,
    fastestLaps,
    points,
    championships: standings.filter((entry) => entry.position === 1).length,
    firstRace: first ? { year: first.season, raceName: first.raceName } : null,
    lastRace: last ? { year: last.season, raceName: last.raceName } : null,
    teams: [...teamYears.entries()].map(([constructorId, team]) => ({
      constructorId,
      name: team.name,
      years: formatYearRanges(team.years),
    })),
    seasonBreakdown,
  };
}
