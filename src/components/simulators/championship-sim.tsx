"use client";

import { useMemo, useState } from "react";
import { simulateChampionship } from "@/lib/services/simulators";
import { getTeamColor } from "@/content/teams/team-meta";
import type { DriverStanding } from "@/lib/models/f1";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ChampionshipSim({
  standings,
  remainingRaces,
  remainingSprints,
}: {
  standings: DriverStanding[];
  remainingRaces: number;
  remainingSprints: number;
}) {
  const [races, setRaces] = useState(remainingRaces);
  const [sprints, setSprints] = useState(remainingSprints);

  const chances = useMemo(
    () =>
      simulateChampionship(
        standings.slice(0, 10).map((standing) => ({
          driverId: standing.driver.driverId,
          label: standing.driver.fullName,
          points: standing.points,
        })),
        races,
        sprints,
      ),
    [standings, races, sprints],
  );

  const aliveCount = chances.filter((chance) => chance.canWin).length;
  const maxPossible = Math.max(...chances.map((chance) => chance.maxPoints), 1);

  const counter = (
    label: string,
    value: number,
    setValue: (next: number) => void,
    max: number,
  ) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <Button
        variant="outline"
        size="icon"
        className="size-7"
        aria-label={`Fewer ${label}`}
        onClick={() => setValue(Math.max(value - 1, 0))}
      >
        −
      </Button>
      <span className="timing-mono w-6 text-center font-bold">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="size-7"
        aria-label={`More ${label}`}
        onClick={() => setValue(Math.min(value + 1, max))}
      >
        +
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
        <div className="flex flex-wrap gap-6">
          {counter("Races left", races, setRaces, 24)}
          {counter("Sprints left", sprints, setSprints, 6)}
        </div>
        <p className="text-sm text-muted-foreground">
          {aliveCount === 1
            ? "🏆 The title is mathematically decided."
            : `${aliveCount} drivers can still win the championship.`}
        </p>
      </div>

      <div className="glass-panel space-y-3 rounded-xl p-5">
        {chances.map((chance) => {
          const standing = standings.find(
            (entry) => entry.driver.driverId === chance.driverId,
          );
          const color = getTeamColor(standing?.constructors[0]?.constructorId ?? "");
          return (
            <div key={chance.driverId}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <span
                    aria-hidden
                    className="inline-block h-3.5 w-1 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {chance.label}
                  {!chance.canWin ? (
                    <Badge variant="outline" className="text-[10px]">
                      Eliminated
                    </Badge>
                  ) : null}
                </span>
                <span className="timing-mono text-xs text-muted-foreground">
                  {chance.currentPoints} → max {chance.maxPoints}
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 rounded-full opacity-30"
                  style={{
                    width: `${(chance.maxPoints / maxPossible) * 100}%`,
                    backgroundColor: color,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${(chance.currentPoints / maxPossible) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
        <p className="pt-1 text-xs text-muted-foreground">
          Solid bar: current points. Faded bar: maximum if they win every remaining
          race and sprint.
        </p>
      </div>
    </div>
  );
}
