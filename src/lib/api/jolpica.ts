/**
 * Jolpica F1 API client (Ergast successor). Covers every season since 1950.
 * Rate-limited (~500 req/hr) — every call goes through tiered Next.js caching
 * via fetchJson's revalidate option.
 */
import { fetchJson, type ApiResult } from "@/lib/api/fetch-json";
import {
  mapConstructor,
  mapConstructorStanding,
  mapDriver,
  mapDriverStanding,
  mapQualifying,
  mapRace,
  mapResult,
} from "@/lib/api/jolpica-mappers";
import type {
  CircuitTableResponse,
  ConstructorTableResponse,
  DriverTableResponse,
  RaceTableResponse,
  SeasonTableResponse,
  StandingsResponse,
} from "@/lib/api/jolpica-types";
import { mapCircuit } from "@/lib/api/jolpica-mappers";
import type {
  CircuitRef,
  ConstructorRef,
  ConstructorStanding,
  DriverRef,
  DriverStanding,
  QualifyingRow,
  Race,
  RaceResultRow,
  SeasonSummary,
} from "@/lib/models/f1";
import {
  CURRENT_SEASON,
  SCHEDULE_REVALIDATE,
  revalidateFor,
} from "@/lib/utils/season";

const BASE = "https://api.jolpi.ca/ergast/f1";

type Revalidate = number | false;

function get<T>(path: string, revalidate: Revalidate): Promise<ApiResult<T>> {
  return fetchJson<T>(`${BASE}${path}`, { revalidate });
}

/**
 * Run async tasks with bounded concurrency, preserving input order. Used to
 * fan out per-season standings requests without bursting past Jolpica's rate
 * limit (fetchJson also retries 429s as a backstop).
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index]);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    worker(),
  );
  await Promise.all(workers);
  return results;
}

/** Seasons a driver or constructor competed in. */
async function getEntitySeasons(
  entity: "drivers" | "constructors",
  id: string,
): Promise<ApiResult<number[]>> {
  const result = await get<SeasonTableResponse>(
    `/${entity}/${id}/seasons.json?limit=100`,
    86_400,
  );
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.MRData.SeasonTable.Seasons.map((season) =>
      Number.parseInt(season.season, 10),
    ),
  };
}

export async function getSeasons(): Promise<ApiResult<SeasonSummary[]>> {
  const result = await get<SeasonTableResponse>("/seasons.json?limit=100", 86_400);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.MRData.SeasonTable.Seasons.map((season) => ({
      year: Number.parseInt(season.season, 10),
      url: season.url ?? null,
    })),
  };
}

export async function getSchedule(year: number): Promise<ApiResult<Race[]>> {
  const revalidate = year < CURRENT_SEASON ? false : SCHEDULE_REVALIDATE;
  const result = await get<RaceTableResponse>(`/${year}.json?limit=100`, revalidate);
  if (!result.ok) return result;
  return { ok: true, data: result.data.MRData.RaceTable.Races.map(mapRace) };
}

/** Race + results for one round; null when the race hasn't happened yet. */
export async function getRaceResults(
  year: number,
  round: number,
): Promise<ApiResult<{ race: Race; results: RaceResultRow[] } | null>> {
  const result = await get<RaceTableResponse>(
    `/${year}/${round}/results.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const race = result.data.MRData.RaceTable.Races[0];
  if (!race) return { ok: true, data: null };
  return {
    ok: true,
    data: { race: mapRace(race), results: (race.Results ?? []).map(mapResult) },
  };
}

export async function getQualifying(
  year: number,
  round: number,
): Promise<ApiResult<QualifyingRow[]>> {
  const result = await get<RaceTableResponse>(
    `/${year}/${round}/qualifying.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const race = result.data.MRData.RaceTable.Races[0];
  return { ok: true, data: (race?.QualifyingResults ?? []).map(mapQualifying) };
}

export async function getSprintResults(
  year: number,
  round: number,
): Promise<ApiResult<RaceResultRow[]>> {
  const result = await get<RaceTableResponse>(
    `/${year}/${round}/sprint.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const race = result.data.MRData.RaceTable.Races[0];
  return { ok: true, data: (race?.SprintResults ?? []).map(mapResult) };
}

export async function getDriverStandings(
  year: number,
): Promise<ApiResult<DriverStanding[]>> {
  const result = await get<StandingsResponse>(
    `/${year}/driverstandings.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const list = result.data.MRData.StandingsTable.StandingsLists[0];
  return { ok: true, data: (list?.DriverStandings ?? []).map(mapDriverStanding) };
}

export async function getConstructorStandings(
  year: number,
): Promise<ApiResult<ConstructorStanding[]>> {
  const result = await get<StandingsResponse>(
    `/${year}/constructorstandings.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const list = result.data.MRData.StandingsTable.StandingsLists[0];
  return {
    ok: true,
    data: (list?.ConstructorStandings ?? []).map(mapConstructorStanding),
  };
}

export async function getDrivers(year: number): Promise<ApiResult<DriverRef[]>> {
  const result = await get<DriverTableResponse>(
    `/${year}/drivers.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  return { ok: true, data: result.data.MRData.DriverTable.Drivers.map(mapDriver) };
}

export async function getDriver(driverId: string): Promise<ApiResult<DriverRef | null>> {
  const result = await get<DriverTableResponse>(`/drivers/${driverId}.json`, 86_400);
  if (!result.ok) return result;
  const raw = result.data.MRData.DriverTable.Drivers[0];
  return { ok: true, data: raw ? mapDriver(raw) : null };
}

export async function getConstructors(
  year: number,
): Promise<ApiResult<ConstructorRef[]>> {
  const result = await get<ConstructorTableResponse>(
    `/${year}/constructors.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.MRData.ConstructorTable.Constructors.map(mapConstructor),
  };
}

export async function getCircuits(year?: number): Promise<ApiResult<CircuitRef[]>> {
  const path = year ? `/${year}/circuits.json?limit=100` : "/circuits.json?limit=100";
  const result = await get<CircuitTableResponse>(
    path,
    year ? revalidateFor(year) : 86_400,
  );
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.MRData.CircuitTable.Circuits.map(mapCircuit),
  };
}

export type DriverRaceResult = {
  season: number;
  round: number;
  raceName: string;
  circuitId: string;
  result: RaceResultRow;
};

/** Paginated fetch of a driver's (or constructor's) entire race history. */
async function getEntityResults(
  entity: "drivers" | "constructors",
  id: string,
): Promise<ApiResult<DriverRaceResult[]>> {
  const pageSize = 100;
  const all: DriverRaceResult[] = [];

  for (let offset = 0; offset < 1500; offset += pageSize) {
    const result = await get<RaceTableResponse>(
      `/${entity}/${id}/results.json?limit=${pageSize}&offset=${offset}`,
      3600,
    );
    if (!result.ok) return result;
    const races = result.data.MRData.RaceTable.Races;
    for (const race of races) {
      for (const raw of race.Results ?? []) {
        all.push({
          season: Number.parseInt(race.season, 10),
          round: Number.parseInt(race.round, 10),
          raceName: race.raceName,
          circuitId: race.Circuit.circuitId,
          result: mapResult(raw),
        });
      }
    }
    const total = Number.parseInt(result.data.MRData.total, 10);
    if (offset + pageSize >= total) break;
  }

  return { ok: true, data: all };
}

export function getDriverResults(driverId: string) {
  return getEntityResults("drivers", driverId);
}

export function getConstructorResults(constructorId: string) {
  return getEntityResults("constructors", constructorId);
}

export type SeasonStanding = {
  season: number;
  position: number;
  points: number;
  wins: number;
  constructors: ConstructorRef[];
};

/**
 * A driver's final championship standing for every season they raced.
 *
 * Jolpica retired the unscoped `/drivers/{id}/driverstandings.json` endpoint
 * (it now returns 400), so we discover the driver's seasons and fetch each
 * season's scoped standing. Past seasons cache indefinitely, so the fan-out
 * cost is paid once per driver.
 */
export async function getDriverSeasonsStandings(
  driverId: string,
): Promise<ApiResult<SeasonStanding[]>> {
  const seasons = await getEntitySeasons("drivers", driverId);
  if (!seasons.ok) return seasons;

  const standings = await mapWithConcurrency(seasons.data, 6, async (year) => {
    const result = await get<StandingsResponse>(
      `/${year}/drivers/${driverId}/driverstandings.json`,
      revalidateFor(year),
    );
    if (!result.ok) return null;
    const raw = result.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings?.[0];
    if (!raw) return null;
    const mapped = mapDriverStanding(raw);
    return {
      season: year,
      position: mapped.position,
      points: mapped.points,
      wins: mapped.wins,
      constructors: mapped.constructors,
    } satisfies SeasonStanding;
  });

  return {
    ok: true,
    data: standings
      .filter((entry): entry is SeasonStanding => entry !== null)
      .sort((a, b) => a.season - b.season),
  };
}

/**
 * Final constructor standing per season for a constructor. Uses the same
 * per-season fan-out as {@link getDriverSeasonsStandings} because the unscoped
 * constructor-standings endpoint was likewise retired (now 400).
 */
export async function getConstructorSeasonsStandings(
  constructorId: string,
): Promise<ApiResult<{ season: number; standing: ConstructorStanding }[]>> {
  const seasons = await getEntitySeasons("constructors", constructorId);
  if (!seasons.ok) return seasons;

  const entries = await mapWithConcurrency(seasons.data, 6, async (year) => {
    const result = await get<StandingsResponse>(
      `/${year}/constructors/${constructorId}/constructorstandings.json`,
      revalidateFor(year),
    );
    if (!result.ok) return null;
    const raw =
      result.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings?.[0];
    if (!raw) return null;
    return { season: year, standing: mapConstructorStanding(raw) };
  });

  return {
    ok: true,
    data: entries
      .filter(
        (entry): entry is { season: number; standing: ConstructorStanding } =>
          entry !== null,
      )
      .sort((a, b) => a.season - b.season),
  };
}

/** Winners of past races at a circuit (most recent first). */
export async function getCircuitWinners(
  circuitId: string,
  limit = 10,
): Promise<ApiResult<{ season: number; raceName: string; winner: RaceResultRow }[]>> {
  // results/1 returns only the winner of each race at the circuit.
  const result = await get<RaceTableResponse>(
    `/circuits/${circuitId}/results/1.json?limit=100`,
    3600,
  );
  if (!result.ok) return result;
  const races = result.data.MRData.RaceTable.Races;
  const winners = races
    .map((race) => ({
      season: Number.parseInt(race.season, 10),
      raceName: race.raceName,
      winner: mapResult((race.Results ?? [])[0]!),
    }))
    .filter((entry) => Boolean(entry.winner))
    .sort((a, b) => b.season - a.season)
    .slice(0, limit);
  return { ok: true, data: winners };
}

/** All race results for a season, grouped by round (bulk, paginated). */
export async function getSeasonResultsBulk(
  year: number,
): Promise<ApiResult<Map<number, RaceResultRow[]>>> {
  const pageSize = 100;
  const byRound = new Map<number, RaceResultRow[]>();

  for (let offset = 0; offset < 1000; offset += pageSize) {
    const result = await get<RaceTableResponse>(
      `/${year}/results.json?limit=${pageSize}&offset=${offset}`,
      revalidateFor(year),
    );
    if (!result.ok) return result;
    for (const race of result.data.MRData.RaceTable.Races) {
      const round = Number.parseInt(race.round, 10);
      const rows = byRound.get(round) ?? [];
      rows.push(...(race.Results ?? []).map(mapResult));
      byRound.set(round, rows);
    }
    const total = Number.parseInt(result.data.MRData.total, 10);
    if (offset + pageSize >= total) break;
  }

  return { ok: true, data: byRound };
}

/** All sprint results for a season, grouped by round. */
export async function getSeasonSprintsBulk(
  year: number,
): Promise<ApiResult<Map<number, RaceResultRow[]>>> {
  const result = await get<RaceTableResponse>(
    `/${year}/sprint.json?limit=100`,
    revalidateFor(year),
  );
  if (!result.ok) return result;
  const byRound = new Map<number, RaceResultRow[]>();
  for (const race of result.data.MRData.RaceTable.Races) {
    const round = Number.parseInt(race.round, 10);
    byRound.set(round, (race.SprintResults ?? []).map(mapResult));
  }
  return { ok: true, data: byRound };
}
