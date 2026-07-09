/**
 * Championship progression built locally from bulk season results, avoiding
 * one API call per round against Jolpica's rate limit.
 */
import type { ApiResult } from "@/lib/api/fetch-json";
import { getSeasonResultsBulk, getSeasonSprintsBulk } from "@/lib/api/jolpica";
import type { RaceResultRow } from "@/lib/models/f1";
import { getTeamColor } from "@/content/teams/team-meta";

export type ProgressionPoint = { round: number; total: number };

export type ProgressionSeries = {
  id: string;
  label: string;
  color: string;
  points: ProgressionPoint[];
};

type KeyFn = (row: RaceResultRow) => { id: string; label: string; color: string };

function accumulate(
  raceByRound: Map<number, RaceResultRow[]>,
  sprintByRound: Map<number, RaceResultRow[]>,
  keyFn: KeyFn,
): ProgressionSeries[] {
  const rounds = [...new Set([...raceByRound.keys(), ...sprintByRound.keys()])].sort(
    (a, b) => a - b,
  );
  const totals = new Map<string, number>();
  const series = new Map<string, ProgressionSeries>();

  for (const round of rounds) {
    const rows = [
      ...(raceByRound.get(round) ?? []),
      ...(sprintByRound.get(round) ?? []),
    ];
    for (const rowEntry of rows) {
      const key = keyFn(rowEntry);
      totals.set(key.id, (totals.get(key.id) ?? 0) + rowEntry.points);
      if (!series.has(key.id)) {
        series.set(key.id, { ...key, points: [] });
      }
    }
    // Record the cumulative total for every known entrant at this round.
    for (const [id, entry] of series) {
      entry.points.push({ round, total: totals.get(id) ?? 0 });
    }
  }

  return [...series.values()].sort(
    (a, b) => (b.points.at(-1)?.total ?? 0) - (a.points.at(-1)?.total ?? 0),
  );
}

export function accumulateDriverProgression(
  raceByRound: Map<number, RaceResultRow[]>,
  sprintByRound: Map<number, RaceResultRow[]>,
): ProgressionSeries[] {
  return accumulate(raceByRound, sprintByRound, (row) => ({
    id: row.driver.driverId,
    label: row.driver.code ?? row.driver.familyName,
    color: getTeamColor(row.constructor.constructorId),
  }));
}

export function accumulateConstructorProgression(
  raceByRound: Map<number, RaceResultRow[]>,
  sprintByRound: Map<number, RaceResultRow[]>,
): ProgressionSeries[] {
  return accumulate(raceByRound, sprintByRound, (row) => ({
    id: row.constructor.constructorId,
    label: row.constructor.name,
    color: getTeamColor(row.constructor.constructorId),
  }));
}

export async function getStandingsProgression(
  year: number,
  kind: "drivers" | "constructors",
): Promise<ApiResult<ProgressionSeries[]>> {
  const [races, sprints] = await Promise.all([
    getSeasonResultsBulk(year),
    getSeasonSprintsBulk(year),
  ]);
  if (!races.ok) return races;
  const sprintData = sprints.ok ? sprints.data : new Map<number, RaceResultRow[]>();
  return {
    ok: true,
    data:
      kind === "drivers"
        ? accumulateDriverProgression(races.data, sprintData)
        : accumulateConstructorProgression(races.data, sprintData),
  };
}
