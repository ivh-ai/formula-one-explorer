import { describe, expect, it } from "vitest";
import { buildCareerSummary } from "@/lib/services/driver-career";
import type { DriverRaceResult, SeasonStanding } from "@/lib/api/jolpica";
import type { RaceResultRow } from "@/lib/models/f1";

const MCLAREN = {
  constructorId: "mclaren",
  name: "McLaren",
  nationality: "British",
};

function result(overrides: Partial<RaceResultRow>): RaceResultRow {
  return {
    position: 10,
    positionText: "10",
    driver: {
      driverId: "test",
      code: "TST",
      permanentNumber: 99,
      givenName: "Test",
      familyName: "Driver",
      fullName: "Test Driver",
      nationality: "British",
      dateOfBirth: null,
      url: null,
    },
    constructor: { constructorId: "mclaren", name: "McLaren", nationality: "British" },
    grid: 10,
    laps: 50,
    status: "Finished",
    points: 0,
    timeText: null,
    fastestLap: null,
    ...overrides,
  };
}

const results: DriverRaceResult[] = [
  {
    season: 2023,
    round: 1,
    raceName: "Bahrain Grand Prix",
    circuitId: "bahrain",
    result: result({
      position: 1,
      points: 25,
      grid: 1,
      fastestLap: { rank: 1, lap: 40, time: "1:30.000" },
      constructor: MCLAREN,
    }),
  },
  {
    season: 2023,
    round: 2,
    raceName: "Saudi Arabian Grand Prix",
    circuitId: "jeddah",
    result: result({ position: 3, points: 15, grid: 4, constructor: MCLAREN }),
  },
  {
    season: 2024,
    round: 1,
    raceName: "Bahrain Grand Prix",
    circuitId: "bahrain",
    result: result({
      position: 18,
      positionText: "R",
      points: 0,
      grid: 2,
      status: "Collision",
      constructor: { constructorId: "ferrari", name: "Ferrari", nationality: "Italian" },
    }),
  },
];

const standings: SeasonStanding[] = [
  {
    season: 2023,
    position: 2,
    points: 40,
    wins: 1,
    constructors: [{ constructorId: "mclaren", name: "McLaren", nationality: "British" }],
  },
  {
    season: 2024,
    position: 1,
    points: 0,
    wins: 0,
    constructors: [{ constructorId: "ferrari", name: "Ferrari", nationality: "Italian" }],
  },
];

describe("buildCareerSummary", () => {
  const summary = buildCareerSummary(results, standings);

  it("counts starts, wins, podiums, poles, fastest laps and points", () => {
    expect(summary.starts).toBe(3);
    expect(summary.wins).toBe(1);
    expect(summary.podiums).toBe(2);
    expect(summary.poles).toBe(1);
    expect(summary.fastestLaps).toBe(1);
    expect(summary.points).toBe(40);
  });

  it("counts championships from standings position 1", () => {
    expect(summary.championships).toBe(1);
  });

  it("identifies first and last races", () => {
    expect(summary.firstRace).toEqual({ year: 2023, raceName: "Bahrain Grand Prix" });
    expect(summary.lastRace).toEqual({ year: 2024, raceName: "Bahrain Grand Prix" });
  });

  it("lists teams with year ranges", () => {
    expect(summary.teams).toEqual([
      { constructorId: "mclaren", name: "McLaren", years: "2023" },
      { constructorId: "ferrari", name: "Ferrari", years: "2024" },
    ]);
  });

  it("builds a season-by-season breakdown", () => {
    expect(summary.seasonBreakdown).toEqual([
      {
        year: 2024,
        team: "Ferrari",
        constructorId: "ferrari",
        points: 0,
        position: 1,
        wins: 0,
        podiums: 0,
      },
      {
        year: 2023,
        team: "McLaren",
        constructorId: "mclaren",
        points: 40,
        position: 2,
        wins: 1,
        podiums: 2,
      },
    ]);
  });
});
