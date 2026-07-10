"use client";

import { useQuery } from "@tanstack/react-query";
import {
  deriveSessionStatus,
  getLatestSession,
  getSessionDrivers,
} from "@/lib/api/openf1";
import type { LiveDriver, LiveSession, SessionStatus } from "@/lib/models/live";

export type LiveSessionState = {
  session: LiveSession | null;
  status: SessionStatus;
  drivers: LiveDriver[];
  isLoading: boolean;
  isError: boolean;
};

/** Discovers the latest OpenF1 session and its entry list. */
export function useLiveSession(): LiveSessionState {
  const sessionQuery = useQuery({
    queryKey: ["openf1", "latest-session"],
    queryFn: async () => {
      const result = await getLatestSession();
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const session = sessionQuery.data ?? null;
  const status: SessionStatus = session
    ? deriveSessionStatus(session, new Date())
    : "none";

  const driversQuery = useQuery({
    queryKey: ["openf1", "drivers", session?.sessionKey],
    queryFn: async () => {
      const result = await getSessionDrivers(session!.sessionKey);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    enabled: session !== null,
    staleTime: 5 * 60_000,
  });

  return {
    session,
    status,
    drivers: driversQuery.data ?? [],
    isLoading: sessionQuery.isLoading || (session !== null && driversQuery.isLoading),
    isError: sessionQuery.isError,
  };
}
