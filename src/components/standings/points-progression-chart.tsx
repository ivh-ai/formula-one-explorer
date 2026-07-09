"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProgressionSeries } from "@/lib/services/standings";

/** Cumulative points per round for the top championship contenders. */
export function PointsProgressionChart({
  series,
  maxSeries = 10,
}: {
  series: ProgressionSeries[];
  maxSeries?: number;
}) {
  const top = series.slice(0, maxSeries);
  if (top.length === 0 || top[0].points.length < 2) return null;

  const rounds = top[0].points.map((point) => point.round);
  const data = rounds.map((round, index) => {
    const entry: Record<string, number> = { round };
    for (const singleSeries of top) {
      entry[singleSeries.label] = singleSeries.points[index]?.total ?? 0;
    }
    return entry;
  });

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Championship progression
      </h2>
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="round"
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              label={{ value: "Round", position: "insideBottomRight", offset: -2, fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" width={40} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={(round) => `Round ${round}`}
            />
            {top.map((singleSeries) => (
              <Line
                key={singleSeries.id}
                type="monotone"
                dataKey={singleSeries.label}
                stroke={singleSeries.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
