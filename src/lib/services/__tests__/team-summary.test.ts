import { describe, expect, it } from "vitest";
import { buildTeamSummary } from "@/lib/services/team-summary";
import type { DriverRaceResult } from "@/lib/api/jolpica";
import type { ConstructorStanding, RaceResultRow } from "@/lib/models/f1";

const TEAM = { constructorId: "test", name: "Test", nationality: "British" };

function row(position: number, grid: number, points: number): RaceResultRow {
  return {
    position,
    positionText: String(position),
    driver: {
      driverId: "a",
      code: null,
      permanentNumber: null,
      givenName: "A",
      familyName: "A",
      fullName: "A A",
      nationality: "",
      dateOfBirth: null,
      url: null,
    },
    constructor: TEAM,
    grid,
    laps: 50,
    status: "Finished",
    points,
    timeText: null,
    fastestLap: null,
  };
}

function entry(season: number, round: number, resultRow: RaceResultRow): DriverRaceResult {
  return { season, round, raceName: `R${round}`, circuitId: "c", result: resultRow };
}

function standing(position: number, points: number, wins: number): ConstructorStanding {
  return { position, points, wins, constructor: TEAM };
}

describe("buildTeamSummary", () => {
  const results = [
    entry(2023, 1, row(1, 1, 25)),
    entry(2023, 1, row(2, 3, 18)),
    entry(2024, 1, row(4, 2, 12)),
  ];
  const standings = [
    { season: 2023, standing: standing(1, 300, 5) },
    { season: 2024, standing: standing(3, 120, 0) },
  ];

  const summary = buildTeamSummary(results, standings);

  it("aggregates wins, podiums, poles and points across both cars", () => {
    expect(summary.wins).toBe(1);
    expect(summary.podiums).toBe(2);
    expect(summary.poles).toBe(1);
    expect(summary.points).toBe(55);
    expect(summary.entries).toBe(3);
    expect(summary.seasons).toBe(2);
  });

  it("lists championship-winning seasons", () => {
    expect(summary.championshipSeasons).toEqual([2023]);
  });

  it("tracks the best finish and its frequency", () => {
    expect(summary.bestFinish).toEqual({ position: 1, count: 1 });
  });

  it("orders the season breakdown newest first", () => {
    expect(summary.seasonBreakdown.map((season) => season.year)).toEqual([2024, 2023]);
  });
});
