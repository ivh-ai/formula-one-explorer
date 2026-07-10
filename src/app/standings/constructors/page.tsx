import type { Metadata } from "next";
import Link from "next/link";
import { getConstructorStandings } from "@/lib/api/jolpica";
import { getStandingsProgression } from "@/lib/services/standings";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { PageHeader } from "@/components/ui-kit/page-header";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { EmptyState } from "@/components/ui-kit/empty-state";
import { YearSelector } from "@/components/standings/year-selector";
import { PointsProgressionChart } from "@/components/standings/points-progression-chart";
import type { ConstructorStanding } from "@/lib/models/f1";

export const metadata: Metadata = {
  title: "Constructors Championship",
  description:
    "Formula One World Constructors' Championship standings for every season since 1958.",
};

function parseYear(raw: string | undefined): number {
  const year = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(year)) return CURRENT_SEASON;
  return Math.min(Math.max(year, FIRST_SEASON), CURRENT_SEASON);
}

export default async function ConstructorStandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const year = parseYear((await searchParams).year);
  const [standings, progression] = await Promise.all([
    getConstructorStandings(year),
    getStandingsProgression(year, "constructors"),
  ]);

  const leaderPoints = standings.ok ? (standings.data[0]?.points ?? 0) : 0;

  const columns: Column<ConstructorStanding>[] = [
    { key: "pos", header: "Pos", align: "right", render: (row) => row.position },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <TeamChip
          constructorId={row.constructor.constructorId}
          name={row.constructor.name}
          className="font-medium"
        />
      ),
    },
    {
      key: "nationality",
      header: "Nationality",
      className: "text-muted-foreground",
      render: (row) => row.constructor.nationality,
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
        title={`${year} Constructors Championship`}
        lead="The FIA Formula One World Constructors' Championship, first awarded in 1958."
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/standings/drivers?year=${year}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Drivers →
          </Link>
          <YearSelector year={year} />
        </div>
      </PageHeader>

      {!standings.ok ? (
        <ErrorNote context="constructor standings" error={standings.error} />
      ) : standings.data.length === 0 ? (
        <EmptyState
          title="No standings available"
          message={
            year < 1958
              ? "The constructors' championship was first awarded in 1958."
              : `The ${year} championship hasn't recorded any results yet.`
          }
        />
      ) : (
        <div className="space-y-8">
          <DataTable
            columns={columns}
            rows={standings.data}
            rowKey={(row) => row.constructor.constructorId}
            caption={`${year} constructor standings`}
          />
          {progression.ok && progression.data.length > 0 ? (
            <PointsProgressionChart series={progression.data} />
          ) : null}
        </div>
      )}
    </main>
  );
}
