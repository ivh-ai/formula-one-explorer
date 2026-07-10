import { Radio } from "lucide-react";
import type { LiveDriver, TeamRadioEntry } from "@/lib/models/live";

export function TeamRadioPanel({
  radio,
  drivers,
}: {
  radio: TeamRadioEntry[];
  drivers: LiveDriver[];
}) {
  const byNumber = new Map(drivers.map((driver) => [driver.driverNumber, driver]));
  const recent = [...radio].reverse().slice(0, 8);

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        <Radio className="size-4" aria-hidden /> Team radio
      </h2>
      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground">No radio clips for this session.</p>
      ) : (
        <ol className="space-y-2">
          {recent.map((entry, index) => {
            const driver = byNumber.get(entry.driverNumber);
            return (
              <li key={`${entry.dateUtc}-${index}`} className="text-sm">
                <a
                  href={entry.recordingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 rounded-md bg-muted/40 px-3 py-2 hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-4 w-1 rounded-full"
                      style={{
                        backgroundColor: driver?.teamColor ? `#${driver.teamColor}` : "#9CA3AF",
                      }}
                    />
                    <span className="timing-mono font-bold">
                      {driver?.acronym ?? `#${entry.driverNumber}`}
                    </span>
                    <span className="text-muted-foreground">radio clip ↗</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.dateUtc).toLocaleTimeString()}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
