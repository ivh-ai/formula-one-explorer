import { describe, expect, it } from "vitest";
import {
  mapDriverStanding,
  mapQualifying,
  mapRace,
  mapResult,
} from "@/lib/api/jolpica-mappers";
import type {
  RawDriverStanding,
  RawQualifyingResult,
  RawRace,
  RawResult,
} from "@/lib/api/jolpica-types";

const DRIVER = {
  driverId: "max_verstappen",
  permanentNumber: "3",
  code: "VER",
  url: "http://en.wikipedia.org/wiki/Max_Verstappen",
  givenName: "Max",
  familyName: "Verstappen",
  dateOfBirth: "1997-09-30",
  nationality: "Dutch",
};

const CONSTRUCTOR = {
  constructorId: "red_bull",
  url: "https://en.wikipedia.org/wiki/Red_Bull_Racing",
  name: "Red Bull",
  nationality: "Austrian",
};

describe("mapRace", () => {
  const sprintRace: RawRace = {
    season: "2024",
    round: "5",
    url: "https://en.wikipedia.org/wiki/2024_Chinese_Grand_Prix",
    raceName: "Chinese Grand Prix",
    Circuit: {
      circuitId: "shanghai",
      circuitName: "Shanghai International Circuit",
      Location: { lat: "31.3389", long: "121.22", locality: "Shanghai", country: "China" },
    },
    date: "2024-04-21",
    time: "07:00:00Z",
    FirstPractice: { date: "2024-04-19", time: "03:30:00Z" },
    SprintQualifying: { date: "2024-04-19", time: "07:30:00Z" },
    Sprint: { date: "2024-04-20", time: "03:00:00Z" },
    Qualifying: { date: "2024-04-20", time: "07:00:00Z" },
  };

  it("maps a sprint weekend with ordered sessions and coordinates", () => {
    const race = mapRace(sprintRace);
    expect(race.season).toBe(2024);
    expect(race.round).toBe(5);
    expect(race.sprint).toBe(true);
    expect(race.dateTimeUtc).toBe("2024-04-21T07:00:00Z");
    expect(race.circuit.lat).toBeCloseTo(31.3389);
    expect(race.circuit.lng).toBeCloseTo(121.22);
    expect(race.sessions.map((session) => session.name)).toEqual([
      "Practice 1",
      "Sprint Qualifying",
      "Sprint",
      "Qualifying",
      "Race",
    ]);
  });

  it("handles early seasons with no session times", () => {
    const race = mapRace({
      season: "1950",
      round: "1",
      raceName: "British Grand Prix",
      Circuit: { circuitId: "silverstone", circuitName: "Silverstone" },
      date: "1950-05-13",
    });
    expect(race.sprint).toBe(false);
    expect(race.dateTimeUtc).toBe("1950-05-13T00:00:00Z");
    expect(race.circuit.locality).toBe("");
  });
});

describe("mapResult", () => {
  it("maps a winner with fastest lap", () => {
    const raw: RawResult = {
      number: "1",
      position: "1",
      positionText: "1",
      points: "25",
      Driver: DRIVER,
      Constructor: CONSTRUCTOR,
      grid: "1",
      laps: "56",
      status: "Finished",
      Time: { millis: "6052554", time: "1:40:52.554" },
      FastestLap: { rank: "2", lap: "33", Time: { time: "1:38.406" } },
    };
    const row = mapResult(raw);
    expect(row.position).toBe(1);
    expect(row.points).toBe(25);
    expect(row.driver.fullName).toBe("Max Verstappen");
    expect(row.constructor.constructorId).toBe("red_bull");
    expect(row.timeText).toBe("1:40:52.554");
    expect(row.fastestLap).toEqual({ rank: 2, lap: 33, time: "1:38.406" });
  });

  it("maps a DNF with no time and no fastest lap", () => {
    const raw: RawResult = {
      position: "18",
      positionText: "R",
      points: "0",
      Driver: DRIVER,
      Constructor: CONSTRUCTOR,
      grid: "3",
      laps: "12",
      status: "Collision",
    };
    const row = mapResult(raw);
    expect(row.positionText).toBe("R");
    expect(row.timeText).toBeNull();
    expect(row.fastestLap).toBeNull();
    expect(row.status).toBe("Collision");
  });

  it("keeps fractional points (half-points races)", () => {
    const raw: RawResult = {
      position: "1",
      positionText: "1",
      points: "12.5",
      Driver: DRIVER,
      Constructor: CONSTRUCTOR,
    };
    expect(mapResult(raw).points).toBe(12.5);
  });
});

describe("mapQualifying", () => {
  it("maps missing Q2/Q3 to null", () => {
    const raw: RawQualifyingResult = {
      position: "16",
      Driver: DRIVER,
      Constructor: CONSTRUCTOR,
      Q1: "1:35.457",
    };
    const row = mapQualifying(raw);
    expect(row.q1).toBe("1:35.457");
    expect(row.q2).toBeNull();
    expect(row.q3).toBeNull();
  });
});

describe("mapDriverStanding", () => {
  it("maps a driver who raced for multiple constructors", () => {
    const raw: RawDriverStanding = {
      position: "3",
      points: "150.5",
      wins: "2",
      Driver: DRIVER,
      Constructors: [
        CONSTRUCTOR,
        { constructorId: "rb", name: "RB F1 Team", nationality: "Italian" },
      ],
    };
    const standing = mapDriverStanding(raw);
    expect(standing.position).toBe(3);
    expect(standing.points).toBe(150.5);
    expect(standing.constructors).toHaveLength(2);
    expect(standing.constructors[1].constructorId).toBe("rb");
  });

  it("falls back to positionText when position is absent (ties)", () => {
    const raw: RawDriverStanding = {
      positionText: "5",
      points: "10",
      Driver: DRIVER,
      Constructors: [CONSTRUCTOR],
    };
    expect(mapDriverStanding(raw).position).toBe(5);
  });
});
