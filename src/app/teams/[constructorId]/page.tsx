import type { Metadata } from "next";
import Link from "next/link";
import {
  getConstructorResults,
  getConstructorSeasonsStandings,
  getDriverStandings,
} from "@/lib/api/jolpica";
import { buildTeamSummary } from "@/lib/services/team-summary";
import { getTeamMeta, getTeamColor } from "@/content/teams/team-meta";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { ordinal } from "@/lib/utils/format";
import { PageHeader } from "@/components/ui-kit/page-header";
import { StatCard } from "@/components/ui-kit/stat-card";
import { Section } from "@/components/ui-kit/section";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { DriverLink } from "@/components/ui-kit/driver-link";
import { Badge } from "@/components/ui/badge";
import type { TeamSummary } from "@/lib/services/team-summary";

type SeasonRow = TeamSummary["seasonBreakdown"][number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ constructorId: string }>;
}): Promise<Metadata> {
  const { constructorId } = await params;
  const meta = getTeamMeta(constructorId);
  const name = meta?.name ?? constructorId;
  return { title: name, description: `${name} — Formula One team profile and history.` };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ constructorId: string }>;
}) {
  const { constructorId } = await params;
  const [results, standings, currentDrivers] = await Promise.all([
    getConstructorResults(constructorId),
    getConstructorSeasonsStandings(constructorId),
    getDriverStandings(CURRENT_SEASON),
  ]);

  const meta = getTeamMeta(constructorId);
  const color = getTeamColor(constructorId);

  const apiName =
    results.ok && results.data.length > 0
      ? results.data[0].result.constructor.name
      : null;
  const teamName = meta?.name ?? apiName ?? constructorId;

  const summary = buildTeamSummary(
    results.ok ? results.data : [],
    standings.ok ? standings.data : [],
  );

  const drivers = currentDrivers.ok
    ? currentDrivers.data.filter((standing) =>
        standing.constructors.some(
          (constructor) => constructor.constructorId === constructorId,
        ),
      )
    : [];

  const columns: Column<SeasonRow>[] = [
    {
      key: "year",
      header: "Season",
      render: (row) => (
        <Link href={`/seasons/${row.year}`} className="font-medium hover:underline">
          {row.year}
        </Link>
      ),
    },
    {
      key: "position",
      header: "Championship",
      align: "right",
      render: (row) =>
        row.position === 1 ? (
          <span className="font-semibold text-amber-600">Champions 🏆</span>
        ) : row.position > 0 ? (
          ordinal(row.position)
        ) : (
          "—"
        ),
    },
    {
      key: "points",
      header: "Points",
      align: "right",
      className: "timing-mono",
      render: (row) => row.points,
    },
    { key: "wins", header: "Wins", align: "right", render: (row) => row.wins },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="mb-6 h-2 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
      <PageHeader
        title={teamName}
        lead={
          meta
            ? `${meta.base} · Principal: ${meta.principal} · Power unit: ${meta.powerUnit} · First entry: ${meta.firstEntry}`
            : "Formula One constructor"
        }
      >
        {meta && !meta.current ? <Badge variant="secondary">Historical team</Badge> : null}
      </PageHeader>

      {!results.ok ? (
        <ErrorNote context="team results" error={results.error} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Race entries" value={summary.entries} />
          <StatCard label="Wins" value={summary.wins} accentColor={color} />
          <StatCard label="Podiums" value={summary.podiums} accentColor={color} />
          <StatCard label="Poles" value={summary.poles} accentColor={color} />
          <StatCard label="Points" value={summary.points} accentColor={color} />
          <StatCard
            label="Titles"
            value={summary.championshipSeasons.length}
            accentColor="#FDD900"
            sub={
              summary.championshipSeasons.length > 0
                ? summary.championshipSeasons.join(", ")
                : undefined
            }
          />
        </div>
      )}

      {drivers.length > 0 ? (
        <Section title={`${CURRENT_SEASON} drivers`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {drivers.map((standing) => (
              <div
                key={standing.driver.driverId}
                className="glass-panel flex items-center justify-between rounded-xl p-5"
              >
                <div>
                  <DriverLink driver={standing.driver} />
                  <p className="mt-1 text-sm text-muted-foreground">
                    P{standing.position} · {standing.points} pts · {standing.wins} wins
                  </p>
                </div>
                <span className="timing-mono text-3xl font-black text-muted-foreground/40">
                  {standing.driver.permanentNumber ?? ""}
                </span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {meta ? (
        <Section title="About">
          <div className="glass-panel carbon-texture rounded-xl p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {meta.funFacts.map((fact) => (
                <li key={fact} className="flex gap-2 text-sm leading-relaxed">
                  <span aria-hidden style={{ color }}>▸</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {summary.seasonBreakdown.length > 0 ? (
        <Section title="Season by season">
          <DataTable
            columns={columns}
            rows={summary.seasonBreakdown}
            rowKey={(row) => String(row.year)}
            caption={`${teamName} constructor standings by season`}
          />
        </Section>
      ) : null}
    </main>
  );
}
