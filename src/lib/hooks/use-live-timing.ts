"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getIntervals,
  getLaps,
  getPits,
  getPositions,
  getRaceControl,
  getSessionWeather,
  getStints,
  getTeamRadio,
} from "@/lib/api/openf1";
import { buildLeaderboard, type LeaderboardRow } from "@/lib/services/live-timing";
import type {
  LiveDriver,
  RaceControlMessage,
  SessionWeather,
  TeamRadioEntry,
} from "@/lib/models/live";
import type { ApiResult } from "@/lib/api/fetch-json";

function unwrap<T>(result: ApiResult<T>, fallback: T): T {
  return result.ok ? result.data : fallback;
}

export type LiveTimingState = {
  leaderboard: LeaderboardRow[];
  raceControl: RaceControlMessage[];
  weather: SessionWeather | null;
  teamRadio: TeamRadioEntry[];
  lastUpdated: Date | null;
  isPolling: boolean;
  isLoading: boolean;
};

/**
 * Polls all OpenF1 timing streams for a session. Poll rate: 4s when live,
 * one-shot when replaying a finished session.
 */
export function useLiveTiming(
  sessionKey: number | null,
  drivers: LiveDriver[],
  live: boolean,
): LiveTimingState {
  const query = useQuery({
    queryKey: ["openf1", "timing", sessionKey],
    queryFn: async () => {
      const key = sessionKey!;
      const [positions, intervals, laps, stints, pits, raceControl, weather, radio] =
        await Promise.all([
          getPositions(key),
          getIntervals(key),
          getLaps(key),
          getStints(key),
          getPits(key),
          getRaceControl(key),
          getSessionWeather(key),
          getTeamRadio(key),
        ]);

      return {
        positions: unwrap(positions, []),
        intervals: unwrap(intervals, []),
        laps: unwrap(laps, []),
        stints: unwrap(stints, []),
        pits: unwrap(pits, []),
        raceControl: unwrap(raceControl, []),
        weather: unwrap(weather, null),
        teamRadio: unwrap(radio, []),
        fetchedAt: new Date(),
      };
    },
    enabled: sessionKey !== null && drivers.length > 0,
    refetchInterval: live ? 4000 : false,
    staleTime: live ? 2000 : Number.POSITIVE_INFINITY,
  });

  const data = query.data;
  const leaderboard = data
    ? buildLeaderboard(drivers, data.positions, data.intervals, data.laps, data.stints, data.pits)
    : [];

  return {
    leaderboard,
    raceControl: data?.raceControl ?? [],
    weather: data?.weather ?? null,
    teamRadio: data?.teamRadio ?? [],
    lastUpdated: data?.fetchedAt ?? null,
    isPolling: live && query.isFetching,
    isLoading: query.isLoading,
  };
}
