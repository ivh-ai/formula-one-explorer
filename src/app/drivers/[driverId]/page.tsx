import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDriver,
  getDriverResults,
  getDriverSeasonsStandings,
} from "@/lib/api/jolpica";
import { buildCareerSummary } from "@/lib/services/driver-career";
import { getDriverMeta } from "@/content/drivers/driver-meta";
import { getTeamColor } from "@/content/teams/team-meta";
import { formatDate, ordinal } from "@/lib/utils/format";
import { PageHeader } from "@/components/ui-kit/page-header";
import { StatCard } from "@/components/ui-kit/stat-card";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { DataTable, type Column } from "@/components/ui-kit/data-table";
import { Section } from "@/components/ui-kit/section";
import { TeamChip } from "@/components/ui-kit/team-chip";
import {
  ResultsBySeasonChart,
  type SeasonPoints,
} from "@/components/drivers/results-by-season-chart";
import type { CareerSummary } from "@/lib/services/driver-career";

type SeasonRow = CareerSummary["seasonBreakdown"][number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ driverId: string }>;
}): Promise<Metadata> {
  const { driverId } = await params;
  const driver = await getDriver(driverId);
  const name = driver.ok && driver.data ? driver.data.fullName : "Driver";
  return {
    title: name,
    description: `${name} — career statistics, results and profile.`,
  };
}

export default async function DriverPage({
  params,
}: {
  params: Promise<{ driverId: string }>;
}) {
  const { driverId } = await params;
  const [driver, results, standings] = await Promise.all([
    getDriver(driverId),
    getDriverResults(driverId),
    getDriverSeasonsStandings(driverId),
  ]);

  if (driver.ok && driver.data === null) notFound();

  if (!driver.ok || !driver.data) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <ErrorNote context="this driver profile" error={driver.ok ? undefined : driver.error} />
      </main>
    );
  }

  const profile = driver.data;
  const meta = getDriverMeta(driverId);
  const summary = buildCareerSummary(
    results.ok ? results.data : [],
    standings.ok ? standings.data : [],
  );

  const chartData: SeasonPoints[] = summary.seasonBreakdown.map((season) => ({
    year: season.year,
    points: season.points,
    color: getTeamColor(season.constructorId),
  }));

  const columns: Column<SeasonRow>[] = [
    { key: "year", header: "Season", render: (row) => (
      <Link href={`/seasons/${row.year}`} className="font-medium hover:underline">
        {row.year}
      </Link>
    ) },
    {
      key: "team",
      header: "Team",
      render: (row) => (
        <TeamChip constructorId={row.constructorId} name={row.team} />
      ),
    },
    {
      key: "position",
      header: "Championship",
      align: "right",
      render: (row) => (row.position > 0 ? ordinal(row.position) : "—"),
    },
    {
      key: "points",
      header: "Points",
      align: "right",
      className: "timing-mono",
      render: (row) => row.points,
    },
    { key: "wins", header: "Wins", align: "right", render: (row) => row.wins },
    { key: "podiums", header: "Podiums", align: "right", render: (row) => row.podiums },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title={profile.fullName}
        lead={[
          profile.nationality,
          profile.dateOfBirth ? `born ${formatDate(profile.dateOfBirth)}` : null,
          summary.firstRace
            ? `F1 career ${summary.firstRace.year}–${summary.lastRace?.year ?? ""}`
            : null,
        ]
          .filter(Boolean)
          .join(" · ")}
      >
        <div className="flex items-center gap-3">
          {meta ? (
            <span
              aria-hidden
              className="size-10 rounded-full border-4"
              style={{
                backgroundColor: meta.helmetColors[0],
                borderColor: meta.helmetColors[1],
              }}
              title="Helmet colors"
            />
          ) : null}
          <span className="timing-mono text-5xl font-black text-muted-foreground/40">
            {profile.permanentNumber ?? ""}
          </span>
          <CountryFlag nationality={profile.nationality} className="h-6" />
        </div>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Starts" value={summary.starts} />
        <StatCard label="Wins" value={summary.wins} accentColor="#E8002D" />
        <StatCard label="Podiums" value={summary.podiums} accentColor="#FF8000" />
        <StatCard label="Poles" value={summary.poles} accentColor="#3671C6" />
        <StatCard label="Points" value={summary.points} decimals={0} accentColor="#27F4D2" />
        <StatCard
          label="Championships"
          value={summary.championships}
          accentColor="#FDD900"
        />
      </div>

      {meta ? (
        <Section title="Profile">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="glass-panel rounded-xl p-5 lg:col-span-2">
              <p className="leading-relaxed">{meta.bio}</p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Driving style
              </h3>
              <p className="mt-1 text-sm leading-relaxed">{meta.drivingStyle}</p>
              {meta.rivalries.length > 0 ? (
                <>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Defining rivalries
                  </h3>
                  <p className="mt-1 text-sm">{meta.rivalries.join(" · ")}</p>
                </>
              ) : null}
            </div>
            <div className="space-y-4">
              <div className="glass-panel rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Career highlights
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {meta.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden className="text-primary">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel carbon-texture rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Interesting facts
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {meta.funFacts.map((fact) => (
                    <li key={fact} className="flex gap-2">
                      <span aria-hidden>💡</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {!results.ok ? (
        <div className="mt-8">
          <ErrorNote context="career results" error={results.error} />
        </div>
      ) : null}

      {summary.teams.length > 0 ? (
        <Section title="Teams">
          <div className="flex flex-wrap gap-3">
            {summary.teams.map((team) => (
              <Link
                key={team.constructorId}
                href={`/teams/${team.constructorId}`}
                className="glass-panel rounded-lg px-4 py-2 text-sm hover:shadow-md"
              >
                <TeamChip constructorId={team.constructorId} name={team.name} link={false} />
                <span className="ml-2 text-muted-foreground">{team.years}</span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {summary.seasonBreakdown.length > 0 ? (
        <Section title="Season by season">
          <div className="space-y-6">
            <DataTable
              columns={columns}
              rows={summary.seasonBreakdown}
              rowKey={(row) => String(row.year)}
              caption={`${profile.fullName} season results`}
            />
            <ResultsBySeasonChart data={chartData} />
          </div>
        </Section>
      ) : null}
    </main>
  );
}
