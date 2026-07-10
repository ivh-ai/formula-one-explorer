"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { DriverLink } from "@/components/ui-kit/driver-link";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { EmptyState } from "@/components/ui-kit/empty-state";
import type { QualifyingRow, RaceResultRow } from "@/lib/models/f1";

function resultColumns(showFastestLap: boolean): Column<RaceResultRow>[] {
  const columns: Column<RaceResultRow>[] = [
    { key: "pos", header: "Pos", align: "right", render: (row) => row.positionText },
    { key: "driver", header: "Driver", render: (row) => <DriverLink driver={row.driver} /> },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <TeamChip constructorId={row.constructor.constructorId} name={row.constructor.name} />
      ),
    },
    { key: "grid", header: "Grid", align: "right", render: (row) => row.grid || "—" },
    {
      key: "time",
      header: "Time / Status",
      align: "right",
      className: "timing-mono",
      render: (row) => row.timeText ?? row.status,
    },
    {
      key: "points",
      header: "Pts",
      align: "right",
      className: "timing-mono font-semibold",
      render: (row) => (row.points > 0 ? row.points : ""),
    },
  ];

  if (showFastestLap) {
    columns.splice(5, 0, {
      key: "fl",
      header: "Fastest lap",
      align: "right",
      className: "timing-mono",
      render: (row) =>
        row.fastestLap ? (
          <span>
            {row.fastestLap.time}
            {row.fastestLap.rank === 1 ? (
              <Badge className="ml-2 bg-purple-600 text-white">FL</Badge>
            ) : null}
          </span>
        ) : (
          ""
        ),
    });
  }

  return columns;
}

const qualifyingColumns: Column<QualifyingRow>[] = [
  { key: "pos", header: "Pos", align: "right", render: (row) => row.position },
  { key: "driver", header: "Driver", render: (row) => <DriverLink driver={row.driver} /> },
  {
    key: "team",
    header: "Team",
    render: (row) => (
      <TeamChip constructorId={row.constructor.constructorId} name={row.constructor.name} />
    ),
  },
  { key: "q1", header: "Q1", align: "right", className: "timing-mono", render: (row) => row.q1 ?? "—" },
  { key: "q2", header: "Q2", align: "right", className: "timing-mono", render: (row) => row.q2 ?? "—" },
  { key: "q3", header: "Q3", align: "right", className: "timing-mono", render: (row) => row.q3 ?? "—" },
];

export function RaceResultsTabs({
  results,
  qualifying,
  sprint,
}: {
  results: RaceResultRow[];
  qualifying: QualifyingRow[];
  sprint: RaceResultRow[];
}) {
  return (
    <Tabs defaultValue="race">
      <TabsList>
        <TabsTrigger value="race">Race</TabsTrigger>
        <TabsTrigger value="qualifying">Qualifying</TabsTrigger>
        {sprint.length > 0 ? <TabsTrigger value="sprint">Sprint</TabsTrigger> : null}
      </TabsList>
      <TabsContent value="race" className="mt-4">
        {results.length > 0 ? (
          <DataTable
            columns={resultColumns(true)}
            rows={results}
            rowKey={(row) => row.driver.driverId}
            caption="Race results"
          />
        ) : (
          <EmptyState title="No results" message="Race results aren't available yet." />
        )}
      </TabsContent>
      <TabsContent value="qualifying" className="mt-4">
        {qualifying.length > 0 ? (
          <DataTable
            columns={qualifyingColumns}
            rows={qualifying}
            rowKey={(row) => row.driver.driverId}
            caption="Qualifying results"
          />
        ) : (
          <EmptyState
            title="No qualifying data"
            message="Qualifying results aren't recorded for this event (common before 1994)."
          />
        )}
      </TabsContent>
      {sprint.length > 0 ? (
        <TabsContent value="sprint" className="mt-4">
          <DataTable
            columns={resultColumns(false)}
            rows={sprint}
            rowKey={(row) => row.driver.driverId}
            caption="Sprint results"
          />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
