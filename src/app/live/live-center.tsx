"use client";

import Link from "next/link";
import { useLiveSession } from "@/lib/hooks/use-live-session";
import { useLiveTiming } from "@/lib/hooks/use-live-timing";
import { SessionStatusBanner } from "@/components/live/session-status-banner";
import { LiveLeaderboard } from "@/components/live/live-leaderboard";
import { RaceControlFeed } from "@/components/live/race-control-feed";
import { LiveWeather } from "@/components/live/live-weather";
import { TeamRadioPanel } from "@/components/live/team-radio-panel";
import { TableSkeleton } from "@/components/ui-kit/skeletons";
import { EmptyState } from "@/components/ui-kit/empty-state";
import { Button } from "@/components/ui/button";

export function LiveCenter() {
  const { session, status, drivers, isLoading, isError } = useLiveSession();
  const timing = useLiveTiming(
    session?.sessionKey ?? null,
    drivers,
    status === "live",
  );

  return (
    <div className="space-y-4">
      <SessionStatusBanner
        session={session}
        status={status}
        lastUpdated={timing.lastUpdated}
      />

      {isLoading ? (
        <TableSkeleton rows={12} />
      ) : isError ? (
        <EmptyState
          title="Timing data unavailable"
          message="OpenF1 isn't responding right now. The rest of the site still works — try again in a minute."
        />
      ) : session === null ? (
        <EmptyState
          title="No session found"
          message="When cars next take to the track, live timing will appear here automatically."
        />
      ) : (
        <>
          {status !== "live" ? (
            <p className="text-sm text-muted-foreground">
              You&apos;re viewing the final state of the most recent session. During
              live sessions this page updates every four seconds.{" "}
              <Button asChild variant="link" className="h-auto p-0 text-sm">
                <Link href="/calendar">See when the next one starts →</Link>
              </Button>
            </p>
          ) : null}

          {timing.isLoading ? (
            <TableSkeleton rows={12} />
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <LiveLeaderboard rows={timing.leaderboard} />
              </div>
              <div className="space-y-4">
                <LiveWeather weather={timing.weather} />
                <RaceControlFeed messages={timing.raceControl} />
                <TeamRadioPanel radio={timing.teamRadio} drivers={drivers} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
