import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { Countdown } from "@/components/calendar/countdown";
import { formatDateTime } from "@/lib/utils/format";
import type { Race } from "@/lib/models/f1";

export function NextRacePanel({ race }: { race: Race }) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-xl p-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#E8002D] via-[#FF8000] to-[#3671C6]"
      />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Next race · Round {race.round} {race.sprint ? "· Sprint weekend" : ""}
          </p>
          <h3 className="mt-1 flex items-center gap-2 text-2xl font-bold">
            <CountryFlag country={race.circuit.country} />
            {race.raceName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {race.circuit.name} · {race.circuit.locality}, {race.circuit.country}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {race.sessions.map((session) => (
              <Badge key={session.name} variant="outline" className="font-normal">
                {session.name}: {formatDateTime(session.dateTimeUtc)}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          {race.dateTimeUtc ? <Countdown targetIso={race.dateTimeUtc} /> : null}
          <Link
            href={`/circuits/${race.circuit.circuitId}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Circuit guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
