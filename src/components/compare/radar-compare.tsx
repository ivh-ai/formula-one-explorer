"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { RadarDatum } from "@/lib/services/compare";

export function RadarCompare({
  data,
  nameA,
  nameB,
  colorA,
  colorB,
}: {
  data: RadarDatum[];
  nameA: string;
  nameB: string;
  colorA: string;
  colorB: string;
}) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Head to head (normalized)
      </h2>
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius="75%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
            <Radar name={nameA} dataKey="a" stroke={colorA} fill={colorA} fillOpacity={0.25} />
            <Radar name={nameB} dataKey="b" stroke={colorB} fill={colorB} fillOpacity={0.25} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Each axis scaled to the stronger driver&apos;s value; &quot;win rate&quot; is wins per start.
      </p>
    </div>
  );
}
