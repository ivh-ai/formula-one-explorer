"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getTeamColor } from "@/content/teams/team-meta";

export type TeamWins = { constructorId: string; name: string; wins: number };

export function WinsByTeamChart({ data }: { data: TeamWins[] }) {
  if (data.length === 0) return null;

  return (
    <div className="glass-panel rounded-xl p-4">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Wins by team
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="wins"
              nameKey="name"
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.constructorId} fill={getTeamColor(entry.constructorId)} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {data.map((entry) => (
          <li key={entry.constructorId} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2.5 rounded-full"
              style={{ backgroundColor: getTeamColor(entry.constructorId) }}
            />
            {entry.name} ({entry.wins})
          </li>
        ))}
      </ul>
    </div>
  );
}
