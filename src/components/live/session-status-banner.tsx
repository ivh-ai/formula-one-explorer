import { Badge } from "@/components/ui/badge";
import type { LiveSession, SessionStatus } from "@/lib/models/live";
import { formatDateTime } from "@/lib/utils/format";

export function SessionStatusBanner({
  session,
  status,
  lastUpdated,
}: {
  session: LiveSession | null;
  status: SessionStatus;
  lastUpdated: Date | null;
}) {
  return (
    <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
      <div className="flex items-center gap-3">
        {status === "live" ? (
          <Badge className="bg-[var(--live)] text-white">
            <span aria-hidden className="mr-1.5 inline-block size-2 animate-live-pulse rounded-full bg-white" />
            LIVE
          </Badge>
        ) : status === "recent" ? (
          <Badge variant="secondary">SESSION REPLAY</Badge>
        ) : (
          <Badge variant="outline">NO ACTIVE SESSION</Badge>
        )}
        {session ? (
          <div>
            <p className="font-bold leading-tight">
              {session.name} — {session.circuitShortName}
            </p>
            <p className="text-xs text-muted-foreground">
              {session.countryName} · {formatDateTime(session.dateStartUtc)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Timing data will appear here when the next session begins.
          </p>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {status === "live"
          ? `Updating every 4s${lastUpdated ? ` · last ${lastUpdated.toLocaleTimeString()}` : ""}`
          : status === "recent"
            ? "Showing the most recent completed session"
            : "Data: OpenF1"}
      </p>
    </div>
  );
}
