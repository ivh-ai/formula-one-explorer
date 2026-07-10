/** The season currently in progress (or about to start). */
export const CURRENT_SEASON = new Date().getUTCFullYear();

export const FIRST_SEASON = 1950;

/**
 * Cache tier by season: completed seasons never change, the current season
 * changes after every session.
 */
export function revalidateFor(year: number): number | false {
  return year < CURRENT_SEASON ? false : 3600;
}

/** Faster-moving data: schedules and "next race" info. */
export const SCHEDULE_REVALIDATE = 900;
