"use client";

import { useMemo, useState } from "react";
import {
  computeTireStrategy,
  type StintPlan,
  type TireCompound,
} from "@/lib/services/simulators";
import { formatLapSeconds } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RACE_LAPS = 57;
const BASE_PACE = 90;
const PIT_LOSS = 21;

const COMPOUND_DATA: Record<TireCompound, { paceOffset: number; degPerLap: number }> = {
  soft: { paceOffset: 0, degPerLap: 0.14 },
  medium: { paceOffset: 0.45, degPerLap: 0.08 },
  hard: { paceOffset: 0.9, degPerLap: 0.045 },
};

const COMPOUND_COLORS: Record<TireCompound, string> = {
  soft: "#E8002D",
  medium: "#FDD900",
  hard: "#9CA3AF",
};

function StintEditor({
  stints,
  setStints,
  label,
}: {
  stints: StintPlan[];
  setStints: (next: StintPlan[]) => void;
  label: string;
}) {
  const update = (index: number, patch: Partial<StintPlan>) => {
    setStints(stints.map((stint, i) => (i === index ? { ...stint, ...patch } : stint)));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      {stints.map((stint, index) => (
        <div key={index} className="flex items-center gap-2">
          <Select
            value={stint.compound}
            onValueChange={(value) => update(index, { compound: value as TireCompound })}
          >
            <SelectTrigger className="w-28" aria-label={`Stint ${index + 1} compound`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soft">Soft</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="range"
            min={1}
            max={RACE_LAPS}
            value={stint.laps}
            onChange={(event) => update(index, { laps: Number(event.target.value) })}
            className="flex-1 accent-current"
            aria-label={`Stint ${index + 1} laps`}
            style={{ color: COMPOUND_COLORS[stint.compound] }}
          />
          <span className="timing-mono w-10 text-right text-sm">{stint.laps}L</span>
          {stints.length > 1 ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label={`Remove stint ${index + 1}`}
              onClick={() => setStints(stints.filter((_, i) => i !== index))}
            >
              ×
            </Button>
          ) : null}
        </div>
      ))}
      {stints.length < 4 ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStints([...stints, { compound: "medium", laps: 10 }])}
        >
          + Add stint
        </Button>
      ) : null}
    </div>
  );
}

function StintBar({ stints }: { stints: StintPlan[] }) {
  const total = stints.reduce((sum, stint) => sum + stint.laps, 0);
  return (
    <div className="flex h-4 w-full overflow-hidden rounded-full" aria-hidden>
      {stints.map((stint, index) => (
        <div
          key={index}
          style={{
            width: `${(stint.laps / Math.max(total, 1)) * 100}%`,
            backgroundColor: COMPOUND_COLORS[stint.compound],
          }}
        />
      ))}
    </div>
  );
}

export function TireStrategyViz() {
  const [strategyA, setStrategyA] = useState<StintPlan[]>([
    { compound: "medium", laps: 28 },
    { compound: "hard", laps: 29 },
  ]);
  const [strategyB, setStrategyB] = useState<StintPlan[]>([
    { compound: "soft", laps: 18 },
    { compound: "medium", laps: 20 },
    { compound: "soft", laps: 19 },
  ]);

  const resultA = useMemo(
    () => computeTireStrategy(RACE_LAPS, strategyA, COMPOUND_DATA, BASE_PACE, PIT_LOSS),
    [strategyA],
  );
  const resultB = useMemo(
    () => computeTireStrategy(RACE_LAPS, strategyB, COMPOUND_DATA, BASE_PACE, PIT_LOSS),
    [strategyB],
  );

  const delta = resultA.totalTime - resultB.totalTime;
  const bothValid = resultA.valid && resultB.valid;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        A {RACE_LAPS}-lap race with a {PIT_LOSS}s pit loss. Softer tires are faster
        but degrade quicker (linear model). Build two strategies — stint laps must
        total {RACE_LAPS} and use at least two compounds.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Strategy A", stints: strategyA, set: setStrategyA, result: resultA },
          { label: "Strategy B", stints: strategyB, set: setStrategyB, result: resultB },
        ].map(({ label, stints, set, result }) => {
          const lapsTotal = stints.reduce((sum, stint) => sum + stint.laps, 0);
          return (
            <div key={label} className="glass-panel space-y-3 rounded-xl p-5">
              <StintEditor stints={stints} setStints={set} label={label} />
              <StintBar stints={stints} />
              <p className="text-sm">
                <span className="timing-mono font-bold">
                  {result.valid
                    ? `${Math.floor(result.totalTime / 60)}m ${(result.totalTime % 60).toFixed(1)}s`
                    : "—"}
                </span>{" "}
                <span className="text-muted-foreground">
                  · {result.stops} stop{result.stops === 1 ? "" : "s"} · {lapsTotal}/
                  {RACE_LAPS} laps
                  {!result.valid
                    ? lapsTotal !== RACE_LAPS
                      ? " — adjust laps to total exactly"
                      : " — use at least two compounds"
                    : ""}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      {bothValid ? (
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="font-bold">
            {Math.abs(delta) < 0.05
              ? "Dead heat — the strategies are equal."
              : delta < 0
                ? `Strategy A wins by ${formatLapSeconds(Math.abs(delta))}`
                : `Strategy B wins by ${formatLapSeconds(Math.abs(delta))}`}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Real strategists add traffic, safety-car probability and tire warm-up —
            but the core trade-off works exactly like this.
          </p>
        </div>
      ) : null}
    </div>
  );
}
