import { describe, expect, it } from "vitest";
import { normalizeForRadar } from "@/lib/services/compare";
import type { CareerSummary } from "@/lib/services/driver-career";

function summary(overrides: Partial<CareerSummary>): CareerSummary {
  return {
    starts: 100,
    wins: 0,
    podiums: 0,
    poles: 0,
    fastestLaps: 0,
    points: 0,
    championships: 0,
    firstRace: null,
    lastRace: null,
    teams: [],
    seasonBreakdown: [],
    ...overrides,
  };
}

describe("normalizeForRadar", () => {
  it("scales each axis to 100 for the pair's maximum", () => {
    const a = summary({ wins: 50, podiums: 100, points: 2000, championships: 4 });
    const b = summary({ wins: 25, podiums: 50, points: 1000, championships: 2 });
    const radar = normalizeForRadar(a, b);

    const wins = radar.find((datum) => datum.axis === "Wins")!;
    expect(wins.a).toBe(100);
    expect(wins.b).toBe(50);

    const titles = radar.find((datum) => datum.axis === "Titles")!;
    expect(titles.a).toBe(100);
    expect(titles.b).toBe(50);
  });

  it("uses per-start win rate so short careers compare fairly", () => {
    const shortCareer = summary({ starts: 50, wins: 25 });
    const longCareer = summary({ starts: 300, wins: 50 });
    const radar = normalizeForRadar(shortCareer, longCareer);

    const winRate = radar.find((datum) => datum.axis === "Win rate")!;
    expect(winRate.a).toBe(100);
    expect(winRate.b).toBe(33);

    const wins = radar.find((datum) => datum.axis === "Wins")!;
    expect(wins.a).toBe(50);
    expect(wins.b).toBe(100);
  });

  it("returns zeros when both careers are empty on an axis", () => {
    const radar = normalizeForRadar(summary({}), summary({}));
    for (const datum of radar) {
      expect(datum.a).toBe(0);
      expect(datum.b).toBe(0);
    }
  });
});
