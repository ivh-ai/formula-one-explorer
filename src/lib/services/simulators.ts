/** Pure engines behind the interactive simulators. */

export type TitleChance = {
  driverId: string;
  label: string;
  currentPoints: number;
  maxPoints: number;
  canWin: boolean;
};

/** Max points still available per remaining GP (win) and sprint (win). */
const GP_WIN_POINTS = 25;
const SPRINT_WIN_POINTS = 8;

/**
 * Who can still mathematically win the championship, assuming they win
 * everything remaining and rivals score nothing.
 */
export function simulateChampionship(
  standings: { driverId: string; label: string; points: number }[],
  remainingRaces: number,
  remainingSprints: number,
): TitleChance[] {
  const maxRemaining =
    remainingRaces * GP_WIN_POINTS + remainingSprints * SPRINT_WIN_POINTS;
  const leaderPoints = Math.max(...standings.map((entry) => entry.points), 0);

  return standings.map((entry) => {
    const maxPoints = entry.points + maxRemaining;
    return {
      driverId: entry.driverId,
      label: entry.label,
      currentPoints: entry.points,
      maxPoints,
      canWin: maxPoints >= leaderPoints,
    };
  });
}

export type TireCompound = "soft" | "medium" | "hard";

export type StintPlan = { compound: TireCompound; laps: number };

export type StrategyResult = {
  totalTime: number;
  valid: boolean;
  lapTimes: number[];
  stops: number;
};

/**
 * Linear-degradation strategy model: each compound has a base pace offset
 * and per-lap degradation; every stop after the first stint adds pitLoss.
 * Valid only if stint laps sum to raceLaps and (for realism) uses 2+ compounds.
 */
export function computeTireStrategy(
  raceLaps: number,
  stints: StintPlan[],
  compoundData: Record<TireCompound, { paceOffset: number; degPerLap: number }>,
  basePace: number,
  pitLoss: number,
): StrategyResult {
  const totalLaps = stints.reduce((sum, stint) => sum + stint.laps, 0);
  const compoundsUsed = new Set(stints.map((stint) => stint.compound));
  const valid =
    totalLaps === raceLaps &&
    stints.length >= 1 &&
    stints.every((stint) => stint.laps > 0) &&
    compoundsUsed.size >= 2;

  const lapTimes: number[] = [];
  let totalTime = 0;

  stints.forEach((stint, stintIndex) => {
    const data = compoundData[stint.compound];
    for (let lapInStint = 0; lapInStint < stint.laps; lapInStint += 1) {
      const lapTime = basePace + data.paceOffset + data.degPerLap * lapInStint;
      lapTimes.push(lapTime);
      totalTime += lapTime;
    }
    if (stintIndex > 0) totalTime += pitLoss;
  });

  return {
    totalTime: Math.round(totalTime * 1000) / 1000,
    valid,
    lapTimes,
    stops: Math.max(stints.length - 1, 0),
  };
}

export type PitStopRating = "legendary" | "great" | "good" | "slow";

export type PitStopScore = {
  total: number;
  rating: PitStopRating;
};

/**
 * The pit-stop reaction game: four crew stages, each with a reaction time in
 * ms on top of a 1.6s mechanical baseline. Rating thresholds mirror real
 * stops (world record 1.80s).
 */
export function scorePitStop(reactionsMs: number[]): PitStopScore {
  const BASELINE_MS = 1600;
  const total = Math.round(
    BASELINE_MS + reactionsMs.reduce((sum, reaction) => sum + Math.max(reaction, 0), 0),
  );

  const rating: PitStopRating =
    total <= 2000 ? "legendary" : total <= 2500 ? "great" : total <= 3200 ? "good" : "slow";

  return { total, rating };
}
