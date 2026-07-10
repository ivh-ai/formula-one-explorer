"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type SeasonPoints = { year: number; points: number; color: string };

export function ResultsBySeasonChart({ data }: { data: SeasonPoints[] }) {
  if (data.length < 2) return null;
  const chartData = [...data].sort((a, b) => a.year - b.year);

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Points by season
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" width={40} />
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="points" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.year} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
