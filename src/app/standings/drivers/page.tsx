import type { Metadata } from "next";
import Link from "next/link";
import { getDriverStandings } from "@/lib/api/jolpica";
import { getStandingsProgression } from "@/lib/services/standings";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { PageHeader } from "@/components/ui-kit/page-header";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { DriverLink } from "@/components/ui-kit/driver-link";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { EmptyState } from "@/components/ui-kit/empty-state";
import { YearSelector } from "@/components/standings/year-selector";
import { PointsProgressionChart } from "@/components/standings/points-progression-chart";
import type { DriverStanding } from "@/lib/models/f1";

export const metadata: Metadata = {
  title: "Driver Standings",
  description: "Formula One World Championship driver standings for every season since 1950.",
};

function parseYear(raw: string | undefined): number {
  const year = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(year)) return CURRENT_SEASON;
  return Math.min(Math.max(year, FIRST_SEASON), CURRENT_SEASON);
}

export default async function DriverStandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const year = parseYear((await searchParams).year);
  const [standings, progression] = await Promise.all([
    getDriverStandings(year),
    getStandingsProgression(year, "drivers"),
  ]);

  const leaderPoints = standings.ok ? (standings.data[0]?.points ?? 0) : 0;

  const columns: Column<DriverStanding>[] = [
    { key: "pos", header: "Pos", align: "right", render: (row) => row.position },
    { key: "driver", header: "Driver", render: (row) => <DriverLink driver={row.driver} /> },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          {row.constructors.map((constructor) => (
            <TeamChip
              key={constructor.constructorId}
              constructorId={constructor.constructorId}
              name={constructor.name}
            />
          ))}
        </span>
      ),
    },
    {
      key: "points",
      header: "Points",
      align: "right",
      className: "timing-mono font-semibold",
      render: (row) => row.points,
    },
    { key: "wins", header: "Wins", align: "right", render: (row) => row.wins },
    {
      key: "gap",
      header: "Gap",
      align: "right",
      className: "timing-mono text-muted-foreground",
      render: (row) =>
        row.position === 1 ? "—" : `-${(leaderPoints - row.points).toFixed(0)}`,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={`${year} Driver Standings`}
        lead="The FIA Formula One World Drivers' Championship."
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/standings/constructors?year=${year}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Constructors →
          </Link>
          <YearSelector year={year} />
        </div>
      </PageHeader>

      {!standings.ok ? (
        <ErrorNote context="driver standings" error={standings.error} />
      ) : standings.data.length === 0 ? (
        <EmptyState
          title="No standings yet"
          message={`The ${year} championship hasn't recorded any results yet. Check back after the first race weekend.`}
        />
      ) : (
        <div className="space-y-8">
          <DataTable
            columns={columns}
            rows={standings.data}
            rowKey={(row) => row.driver.driverId}
            caption={`${year} driver standings`}
          />
          {progression.ok && progression.data.length > 0 ? (
            <PointsProgressionChart series={progression.data} />
          ) : null}
        </div>
      )}
    </main>
  );
}
