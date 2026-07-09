import { describe, expect, it } from "vitest";
import { computeSeasonStats } from "@/lib/services/season-stats";
import type { RaceResultRow } from "@/lib/models/f1";

function row(
  driverId: string,
  constructorId: string,
  position: number,
  status: string,
): RaceResultRow {
  return {
    position,
    positionText: String(position),
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
    grid: position,
    laps: 50,
    status,
    points: 0,
    timeText: null,
    fastestLap: null,
  };
}

describe("computeSeasonStats", () => {
  const byRound = new Map([
    [
      1,
      [
        row("ver", "red_bull", 1, "Finished"),
        row("nor", "mclaren", 2, "Finished"),
        row("ham", "ferrari", 3, "+1 Lap"),
        row("alo", "aston_martin", 18, "Collision"),
      ],
    ],
    [
      2,
      [
        row("nor", "mclaren", 1, "Finished"),
        row("ver", "red_bull", 2, "Finished"),
        row("pia", "mclaren", 3, "Finished"),
        row("ham", "ferrari", 17, "Engine"),
      ],
    ],
  ]);

  const stats = computeSeasonStats(byRound);

  it("counts races, winners and podium visitors", () => {
    expect(stats.races).toBe(2);
    expect(stats.differentWinners).toBe(2);
    expect(stats.differentPodiumFinishers).toBe(4);
  });

  it("aggregates wins by team, sorted", () => {
    expect(stats.winsByTeam).toEqual([
      { constructorId: "red_bull", name: "red_bull", wins: 1 },
      { constructorId: "mclaren", name: "mclaren", wins: 1 },
    ]);
  });

  it("classifies DNFs vs finishers (lapped cars count as finishers)", () => {
    expect(stats.dnfCount).toBe(2);
    expect(stats.avgFinishers).toBe(3);
  });
});
