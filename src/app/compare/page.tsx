import type { Metadata } from "next";
import {
  getDriver,
  getDriverResults,
  getDriverSeasonsStandings,
  getDriverStandings,
} from "@/lib/api/jolpica";
import { buildCareerSummary, type CareerSummary } from "@/lib/services/driver-career";
import { normalizeForRadar } from "@/lib/services/compare";
import { CURRENT_SEASON } from "@/lib/utils/season";
import { PageHeader } from "@/components/ui-kit/page-header";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { ComparePicker, type PickerOption } from "@/components/compare/compare-picker";
import { RadarCompare } from "@/components/compare/radar-compare";
import { HeadToHeadBars } from "@/components/compare/head-to-head-bars";
import type { DriverRef } from "@/lib/models/f1";

export const metadata: Metadata = {
  title: "Compare Drivers",
  description:
    "Head-to-head driver comparison across eras — wins, poles, podiums, points and titles, normalized fairly.",
};

const COLOR_A = "#E8002D";
const COLOR_B = "#3671C6";

/** Legends selectable alongside the current grid. */
const LEGENDS: Record<string, string> = {
  senna: "Ayrton Senna",
  prost: "Alain Prost",
  michael_schumacher: "Michael Schumacher",
  fangio: "Juan Manuel Fangio",
  clark: "Jim Clark",
  lauda: "Niki Lauda",
  stewart: "Jackie Stewart",
  mansell: "Nigel Mansell",
  hakkinen: "Mika Häkkinen",
  vettel: "Sebastian Vettel",
  raikkonen: "Kimi Räikkönen",
  button: "Jenson Button",
  damon_hill: "Damon Hill",
  moss: "Stirling Moss",
  piquet: "Nelson Piquet",
  ascari: "Alberto Ascari",
};

async function loadCareer(
  driverId: string,
): Promise<{ driver: DriverRef; summary: CareerSummary } | null> {
  const [driver, results, standings] = await Promise.all([
    getDriver(driverId),
    getDriverResults(driverId),
    getDriverSeasonsStandings(driverId),
  ]);
  if (!driver.ok || !driver.data) return null;
  return {
    driver: driver.data,
    summary: buildCareerSummary(
      results.ok ? results.data : [],
      standings.ok ? standings.data : [],
    ),
  };
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const params = await searchParams;
  const idA = params.a ?? "max_verstappen";
  const idB = params.b ?? "hamilton";

  const [gridStandings, careerA, careerB] = await Promise.all([
    getDriverStandings(CURRENT_SEASON),
    loadCareer(idA),
    loadCareer(idB),
  ]);

  const options: PickerOption[] = [
    ...(gridStandings.ok
      ? gridStandings.data.map((standing) => ({
          id: standing.driver.driverId,
          label: standing.driver.fullName,
          group: `${CURRENT_SEASON} grid`,
        }))
      : []),
    ...Object.entries(LEGENDS).map(([id, label]) => ({
      id,
      label,
      group: "Legends",
    })),
  ];

  const radar =
    careerA && careerB ? normalizeForRadar(careerA.summary, careerB.summary) : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Compare Drivers"
        lead="Any two drivers in history, head to head. Absolute numbers and per-start rates — because eras had different season lengths."
      />

      <div className="glass-panel mb-6 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <ComparePicker param="a" value={idA} options={options} ariaLabel="First driver" />
        <span className="text-center text-sm font-bold text-muted-foreground">VS</span>
        <ComparePicker param="b" value={idB} options={options} ariaLabel="Second driver" />
      </div>

      {!careerA || !careerB ? (
        <ErrorNote context="one of the selected drivers" />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { career: careerA, color: COLOR_A },
              { career: careerB, color: COLOR_B },
            ].map(({ career, color }) => (
              <div key={career.driver.driverId} className="glass-panel rounded-xl p-5">
                <div className="mb-2 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <h2 className="text-xl font-bold">{career.driver.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {career.driver.nationality} ·{" "}
                  {career.summary.firstRace
                    ? `${career.summary.firstRace.year}–${career.summary.lastRace?.year ?? ""}`
                    : "No race data"}{" "}
                  · {career.summary.starts} starts
                </p>
                <p className="mt-2 text-sm">
                  Teams:{" "}
                  <span className="text-muted-foreground">
                    {career.summary.teams.map((team) => team.name).join(", ") || "—"}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RadarCompare
              data={radar}
              nameA={careerA.driver.familyName}
              nameB={careerB.driver.familyName}
              colorA={COLOR_A}
              colorB={COLOR_B}
            />
            <HeadToHeadBars
              colorA={COLOR_A}
              colorB={COLOR_B}
              rows={[
                { label: "Wins", a: careerA.summary.wins, b: careerB.summary.wins },
                { label: "Podiums", a: careerA.summary.podiums, b: careerB.summary.podiums },
                { label: "Poles", a: careerA.summary.poles, b: careerB.summary.poles },
                {
                  label: "Championships",
                  a: careerA.summary.championships,
                  b: careerB.summary.championships,
                },
                {
                  label: "Career points",
                  a: careerA.summary.points,
                  b: careerB.summary.points,
                  format: (value) => value.toFixed(0),
                },
                {
                  label: "Win rate %",
                  a:
                    careerA.summary.starts > 0
                      ? (careerA.summary.wins / careerA.summary.starts) * 100
                      : 0,
                  b:
                    careerB.summary.starts > 0
                      ? (careerB.summary.wins / careerB.summary.starts) * 100
                      : 0,
                  format: (value) => `${value.toFixed(1)}%`,
                },
              ]}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Points across eras aren&apos;t directly comparable — scoring systems changed
            repeatedly (a win paid 8 points in 1950, 10 in 2000, 25 today).
          </p>
        </div>
      )}
    </main>
  );
}
