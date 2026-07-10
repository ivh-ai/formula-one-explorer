import { describe, expect, it } from "vitest";
import {
  accumulateConstructorProgression,
  accumulateDriverProgression,
} from "@/lib/services/standings";
import type { RaceResultRow } from "@/lib/models/f1";

function row(
  driverId: string,
  constructorId: string,
  points: number,
): RaceResultRow {
  return {
    position: 1,
    positionText: "1",
    driver: {
      driverId,
      code: null,
      permanentNumber: null,
      givenName: driverId,
      familyName: driverId,
      fullName: driverId,
      nationality: "",
      dateOfBirth: null,
      url: null,
    },
    constructor: { constructorId, name: constructorId, nationality: "" },
    grid: 1,
    laps: 50,
    status: "Finished",
    points,
    timeText: null,
    fastestLap: null,
  };
}

const raceByRound = new Map([
  [1, [row("ver", "red_bull", 25), row("nor", "mclaren", 18), row("pia", "mclaren", 15)]],
  [2, [row("nor", "mclaren", 25), row("ver", "red_bull", 18), row("pia", "mclaren", 15)]],
]);

const sprintByRound = new Map([[2, [row("pia", "mclaren", 8), row("ver", "red_bull", 7)]]]);

describe("accumulateDriverProgression", () => {
  it("accumulates race and sprint points cumulatively per round", () => {
    const series = accumulateDriverProgression(raceByRound, sprintByRound);
    const ver = series.find((entry) => entry.id === "ver")!;
    const nor = series.find((entry) => entry.id === "nor")!;
    const pia = series.find((entry) => entry.id === "pia")!;

    expect(ver.points).toEqual([
      { round: 1, total: 25 },
      { round: 2, total: 50 },
    ]);
    expect(nor.points).toEqual([
      { round: 1, total: 18 },
      { round: 2, total: 43 },
    ]);
    expect(pia.points).toEqual([
      { round: 1, total: 15 },
      { round: 2, total: 38 },
    ]);
  });

  it("sorts series by final total descending", () => {
    const series = accumulateDriverProgression(raceByRound, sprintByRound);
    expect(series.map((entry) => entry.id)).toEqual(["ver", "nor", "pia"]);
  });
});

describe("accumulateConstructorProgression", () => {
  it("sums both drivers' points per constructor", () => {
    const series = accumulateConstructorProgression(raceByRound, sprintByRound);
    const mclaren = series.find((entry) => entry.id === "mclaren")!;
    expect(mclaren.points).toEqual([
      { round: 1, total: 33 },
      { round: 2, total: 81 },
    ]);
    expect(series[0].id).toBe("mclaren");
  });
});
