import { TrendingDown, TrendingUp } from "lucide-react";
import type { RaceResultRow } from "@/lib/models/f1";

/** Biggest grid → finish movers of the race. */
export function PositionChanges({ results }: { results: RaceResultRow[] }) {
  const classified = results.filter((row) => row.grid > 0 && row.position > 0);
  const withDelta = classified
    .map((row) => ({ row, delta: row.grid - row.position }))
    .sort((a, b) => b.delta - a.delta);

  const gainers = withDelta.filter((entry) => entry.delta > 0).slice(0, 3);
  const losers = withDelta
    .filter((entry) => entry.delta < 0)
    .slice(-3)
    .reverse();

  if (gainers.length === 0 && losers.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="glass-panel rounded-xl p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <TrendingUp className="size-4 text-green-600" aria-hidden /> Biggest gainers
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {gainers.map(({ row, delta }) => (
            <li key={row.driver.driverId} className="flex justify-between">
              <span>{row.driver.fullName}</span>
              <span className="timing-mono text-green-600">
                +{delta} (P{row.grid}→P{row.position})
              </span>
            </li>
          ))}
          {gainers.length === 0 ? (
            <li className="text-muted-foreground">Nobody gained positions.</li>
          ) : null}
        </ul>
      </div>
      <div className="glass-panel rounded-xl p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <TrendingDown className="size-4 text-red-500" aria-hidden /> Toughest afternoons
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {losers.map(({ row, delta }) => (
            <li key={row.driver.driverId} className="flex justify-between">
              <span>{row.driver.fullName}</span>
              <span className="timing-mono text-red-500">
                {delta} (P{row.grid}→{row.positionText === "R" ? "DNF" : `P${row.position}`})
              </span>
            </li>
          ))}
          {losers.length === 0 ? (
            <li className="text-muted-foreground">Nobody lost positions.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
