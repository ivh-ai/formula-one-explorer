/** Builds the Live Race Center leaderboard from raw OpenF1 entry streams. */
import type {
  IntervalEntry,
  LapEntry,
  LiveDriver,
  PitEntry,
  PositionEntry,
  StintEntry,
} from "@/lib/models/live";
import { formatGapSeconds, formatLapSeconds } from "@/lib/utils/format";

export type LeaderboardRow = {
  position: number;
  driverNumber: number;
  acronym: string;
  fullName: string;
  teamName: string;
  /** Hex color with '#', or a neutral fallback. */
  teamColor: string;
  gapToLeader: string;
  interval: string;
  lastLap: string;
  bestLap: string;
  compound: string;
  tyreAge: number | null;
  pitCount: number;
};

/** Latest entry per driver by an ISO date key (streams arrive unordered). */
export function latestPerDriver<T extends { driverNumber: number }>(
  entries: T[],
  dateOf: (entry: T) => string,
): Map<number, T> {
  const latest = new Map<number, T>();
  for (const entry of entries) {
    const existing = latest.get(entry.driverNumber);
    if (!existing || dateOf(entry) >= dateOf(existing)) {
      latest.set(entry.driverNumber, entry);
    }
  }
  return latest;
}

const COMPOUND_LABELS: Record<string, string> = {
  SOFT: "Soft",
  MEDIUM: "Medium",
  HARD: "Hard",
  INTERMEDIATE: "Inter",
  WET: "Wet",
};

export function buildLeaderboard(
  drivers: LiveDriver[],
  positions: PositionEntry[],
  intervals: IntervalEntry[],
  laps: LapEntry[],
  stints: StintEntry[],
  pits: PitEntry[],
): LeaderboardRow[] {
  const latestPositions = latestPerDriver(positions, (entry) => entry.dateUtc);
  const latestIntervals = latestPerDriver(intervals, (entry) => entry.dateUtc);

  const lapsByDriver = new Map<number, LapEntry[]>();
  for (const lap of laps) {
    const list = lapsByDriver.get(lap.driverNumber) ?? [];
    list.push(lap);
    lapsByDriver.set(lap.driverNumber, list);
  }

  const stintsByDriver = new Map<number, StintEntry[]>();
  for (const stint of stints) {
    const list = stintsByDriver.get(stint.driverNumber) ?? [];
    list.push(stint);
    stintsByDriver.set(stint.driverNumber, list);
  }

  const pitCounts = new Map<number, number>();
  for (const pit of pits) {
    pitCounts.set(pit.driverNumber, (pitCounts.get(pit.driverNumber) ?? 0) + 1);
  }

  const rows = drivers.map((driver) => {
    const position = latestPositions.get(driver.driverNumber)?.position ?? 99;
    const interval = latestIntervals.get(driver.driverNumber);

    const driverLaps = (lapsByDriver.get(driver.driverNumber) ?? []).sort(
      (a, b) => a.lapNumber - b.lapNumber,
    );
    const lastTimedLap = [...driverLaps].reverse().find((lap) => lap.lapDuration !== null);
    const bestLap = driverLaps.reduce<number | null>(
      (best, lap) =>
        lap.lapDuration !== null && (best === null || lap.lapDuration < best)
          ? lap.lapDuration
          : best,
      null,
    );

    const driverStints = (stintsByDriver.get(driver.driverNumber) ?? []).sort(
      (a, b) => a.stintNumber - b.stintNumber,
    );
    const currentStint = driverStints.at(-1) ?? null;
    const compoundRaw = currentStint?.compound ?? null;

    return {
      position,
      driverNumber: driver.driverNumber,
      acronym: driver.acronym,
      fullName: driver.fullName,
      teamName: driver.teamName,
      teamColor: driver.teamColor ? `#${driver.teamColor}` : "#9CA3AF",
      gapToLeader:
        position === 1 ? "Leader" : formatGapSeconds(interval?.gapToLeader ?? null),
      interval: position === 1 ? "—" : formatGapSeconds(interval?.interval ?? null),
      lastLap: formatLapSeconds(lastTimedLap?.lapDuration ?? null),
      bestLap: formatLapSeconds(bestLap),
      compound: compoundRaw ? (COMPOUND_LABELS[compoundRaw] ?? "—") : "—",
      tyreAge:
        currentStint === null
          ? null
          : currentStint.tyreAgeAtStart +
            (currentStint.lapEnd - currentStint.lapStart + 1),
      pitCount: pitCounts.get(driver.driverNumber) ?? 0,
    };
  });

  return rows.sort((a, b) => a.position - b.position);
}
