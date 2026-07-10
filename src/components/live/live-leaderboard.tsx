"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { LeaderboardRow } from "@/lib/services/live-timing";
import { cn } from "@/lib/utils";

const COMPOUND_COLORS: Record<string, string> = {
  Soft: "#E8002D",
  Medium: "#FDD900",
  Hard: "#E5E7EB",
  Inter: "#22C55E",
  Wet: "#3671C6",
};

function CompoundChip({ compound, age }: { compound: string; age: number | null }) {
  const color = COMPOUND_COLORS[compound];
  if (!color) return <span className="text-muted-foreground">—</span>;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="inline-block size-3 rounded-full border-2"
        style={{ borderColor: color }}
      />
      <span>{compound}</span>
      {age !== null ? (
        <span className="text-xs text-muted-foreground">({age}L)</span>
      ) : null}
    </span>
  );
}

export function LiveLeaderboard({ rows }: { rows: LeaderboardRow[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="glass-panel overflow-x-auto rounded-xl">
      <table className="w-full min-w-[640px] text-sm">
        <caption className="sr-only">Live leaderboard</caption>
        <thead>
          <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="px-3 py-2.5 text-right">P</th>
            <th scope="col" className="px-3 py-2.5">Driver</th>
            <th scope="col" className="px-3 py-2.5 text-right">Gap</th>
            <th scope="col" className="px-3 py-2.5 text-right">Int</th>
            <th scope="col" className="px-3 py-2.5 text-right">Last lap</th>
            <th scope="col" className="px-3 py-2.5 text-right">Best</th>
            <th scope="col" className="px-3 py-2.5">Tire</th>
            <th scope="col" className="px-3 py-2.5 text-right">Stops</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {rows.map((row) => (
              <motion.tr
                key={row.driverNumber}
                layout={reduced ? false : "position"}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={cn("border-b last:border-0", row.position <= 3 && "bg-accent/40")}
              >
                <td className="timing-mono px-3 py-2 text-right font-bold">{row.position}</td>
                <td className="px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-4 w-1 rounded-full"
                      style={{ backgroundColor: row.teamColor }}
                    />
                    <span className="timing-mono font-bold">{row.acronym}</span>
                    <span className="hidden text-muted-foreground lg:inline">
                      {row.teamName}
                    </span>
                  </span>
                </td>
                <td className="timing-mono px-3 py-2 text-right">{row.gapToLeader}</td>
                <td className="timing-mono px-3 py-2 text-right text-muted-foreground">
                  {row.interval}
                </td>
                <td className="timing-mono px-3 py-2 text-right">{row.lastLap}</td>
                <td className="timing-mono px-3 py-2 text-right text-muted-foreground">
                  {row.bestLap}
                </td>
                <td className="px-3 py-2">
                  <CompoundChip compound={row.compound} age={row.tyreAge} />
                </td>
                <td className="timing-mono px-3 py-2 text-right">{row.pitCount}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
