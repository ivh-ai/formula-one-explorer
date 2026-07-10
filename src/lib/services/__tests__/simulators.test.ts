import { describe, expect, it } from "vitest";
import {
  computeTireStrategy,
  scorePitStop,
  simulateChampionship,
} from "@/lib/services/simulators";

describe("simulateChampionship", () => {
  const standings = [
    { driverId: "nor", label: "Norris", points: 300 },
    { driverId: "ver", label: "Verstappen", points: 250 },
    { driverId: "lec", label: "Leclerc", points: 180 },
  ];

  it("marks mathematically alive contenders", () => {
    // 3 races + 1 sprint remaining = 83 max points.
    const chances = simulateChampionship(standings, 3, 1);
    expect(chances.find((entry) => entry.driverId === "ver")?.canWin).toBe(true);
    expect(chances.find((entry) => entry.driverId === "ver")?.maxPoints).toBe(333);
    expect(chances.find((entry) => entry.driverId === "lec")?.canWin).toBe(false);
  });

  it("declares the title clinched when nobody can catch the leader", () => {
    const chances = simulateChampionship(standings, 1, 0);
    const alive = chances.filter((entry) => entry.canWin);
    expect(alive.map((entry) => entry.driverId)).toEqual(["nor"]);
  });
});

describe("computeTireStrategy", () => {
  const compounds = {
    soft: { paceOffset: 0, degPerLap: 0.15 },
    medium: { paceOffset: 0.4, degPerLap: 0.08 },
    hard: { paceOffset: 0.8, degPerLap: 0.04 },
  };

  it("adds pit loss for every stop after the first stint", () => {
    const oneStop = computeTireStrategy(
      10,
      [
        { compound: "soft", laps: 5 },
        { compound: "hard", laps: 5 },
      ],
      compounds,
      90,
      20,
    );
    // Soft: 90.0+90.15+90.3+90.45+90.6 = 451.5; Hard: 90.8*5 + deg(0+.04+.08+.12+.16)=454.4
    expect(oneStop.stops).toBe(1);
    expect(oneStop.totalTime).toBeCloseTo(451.5 + 454.4 + 20, 3);
    expect(oneStop.valid).toBe(true);
    expect(oneStop.lapTimes).toHaveLength(10);
  });

  it("is invalid when stint laps don't sum to race laps", () => {
    const result = computeTireStrategy(
      10,
      [
        { compound: "soft", laps: 4 },
        { compound: "hard", laps: 5 },
      ],
      compounds,
      90,
      20,
    );
    expect(result.valid).toBe(false);
  });

  it("is invalid when only one compound is used", () => {
    const result = computeTireStrategy(
      10,
      [
        { compound: "soft", laps: 5 },
        { compound: "soft", laps: 5 },
      ],
      compounds,
      90,
      20,
    );
    expect(result.valid).toBe(false);
  });
});

describe("scorePitStop", () => {
  it("rates stops by total time", () => {
    expect(scorePitStop([100, 100, 100, 100]).rating).toBe("legendary");
    expect(scorePitStop([200, 200, 200, 200]).rating).toBe("great");
    expect(scorePitStop([350, 350, 350, 350]).rating).toBe("good");
    expect(scorePitStop([500, 500, 500, 500]).rating).toBe("slow");
  });

  it("sums baseline plus reactions and clamps negatives", () => {
    const score = scorePitStop([100, -50, 200, 100]);
    expect(score.total).toBe(1600 + 400);
  });
});
