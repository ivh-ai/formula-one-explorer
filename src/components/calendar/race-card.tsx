import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { Countdown } from "@/components/calendar/countdown";
import { formatDate, formatDateTime } from "@/lib/utils/format";
import type { Race } from "@/lib/models/f1";
import { cn } from "@/lib/utils";

export function RaceCard({
  race,
  status,
  winnerName,
}: {
  race: Race;
  status: "completed" | "next" | "upcoming";
  winnerName?: string;
}) {
  const inner = (
    <div
      className={cn(
        "glass-panel h-full rounded-xl p-5 transition-shadow hover:shadow-md",
        status === "next" && "ring-2 ring-[var(--live)]/60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Round {race.round}
        </p>
        <span className="flex gap-1.5">
          {race.sprint ? <Badge variant="secondary">Sprint</Badge> : null}
          {status === "next" ? (
            <Badge className="bg-[var(--live)] text-white">Next race</Badge>
          ) : null}
        </span>
      </div>
      <h3 className="mt-1.5 flex items-center gap-2 text-lg font-bold leading-snug">
        <CountryFlag country={race.circuit.country} />
        {race.raceName}
      </h3>
      <p className="text-sm text-muted-foreground">
        {race.circuit.name} · {race.circuit.locality}
      </p>
      <div className="mt-4">
        {status === "next" && race.dateTimeUtc ? (
          <div className="space-y-2">
            <Countdown targetIso={race.dateTimeUtc} />
            <p className="text-xs text-muted-foreground">{formatDateTime(race.dateTimeUtc)}</p>
          </div>
        ) : status === "completed" ? (
          <div className="text-sm">
            <p className="text-muted-foreground">{formatDate(race.dateTimeUtc ?? race.date)}</p>
            {winnerName ? (
              <p className="mt-1 font-medium">🏆 {winnerName}</p>
            ) : (
              <p className="mt-1 font-medium text-primary">View results →</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {formatDateTime(race.dateTimeUtc ?? race.date)}
          </p>
        )}
      </div>
    </div>
  );

  if (status === "completed") {
    return (
      <Link href={`/seasons/${race.season}/${race.round}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
