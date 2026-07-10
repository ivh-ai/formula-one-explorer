import type { Race } from "@/lib/models/f1";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function getCountdownParts(target: Date, now: Date): CountdownParts {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}

/** A race stays "next" for 3 hours after lights-out (it's likely running). */
const RACE_GRACE_MS = 3 * 60 * 60 * 1000;

export function getNextRace(races: Race[], now: Date): Race | null {
  const upcoming = races
    .filter((race) => race.dateTimeUtc !== null)
    .filter(
      (race) =>
        new Date(race.dateTimeUtc as string).getTime() + RACE_GRACE_MS >
        now.getTime(),
    )
    .sort((a, b) => a.round - b.round);
  return upcoming[0] ?? null;
}
