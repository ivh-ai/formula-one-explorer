import { describe, expect, it } from "vitest";
import {
  CHAMPION_DRIVER_IDS,
  WORLD_CHAMPIONS,
  getChampion,
  getDriverChampionshipCount,
} from "@/content/history/champions";

describe("WORLD_CHAMPIONS", () => {
  it("covers every season from 1950 through 2025 with no gaps", () => {
    for (let year = 1950; year <= 2025; year += 1) {
      const champion = getChampion(year);
      expect(champion, String(year)).toBeDefined();
      expect(champion!.driver.length).toBeGreaterThan(3);
      expect(champion!.team.length).toBeGreaterThan(2);
    }
    expect(Object.keys(WORLD_CHAMPIONS)).toHaveLength(76);
  });

  it("has no champion for the in-progress season", () => {
    expect(getChampion(2026)).toBeUndefined();
  });
});

describe("getDriverChampionshipCount", () => {
  it("returns exact title counts for known champions", () => {
    expect(getDriverChampionshipCount("hamilton")).toBe(7);
    expect(getDriverChampionshipCount("michael_schumacher")).toBe(7);
    expect(getDriverChampionshipCount("fangio")).toBe(5);
    expect(getDriverChampionshipCount("max_verstappen")).toBe(4);
    expect(getDriverChampionshipCount("vettel")).toBe(4);
    expect(getDriverChampionshipCount("prost")).toBe(4);
    expect(getDriverChampionshipCount("senna")).toBe(3);
    expect(getDriverChampionshipCount("norris")).toBe(1);
  });

  it("returns 0 for non-champions and unknown ids", () => {
    expect(getDriverChampionshipCount("leclerc")).toBe(0);
    expect(getDriverChampionshipCount("norm_nobody")).toBe(0);
  });

  it("keys the champions map by every season 1950–2025", () => {
    expect(Object.keys(CHAMPION_DRIVER_IDS)).toHaveLength(76);
    // Total titles across all drivers equals the number of seasons.
    const total = Object.keys(CHAMPION_DRIVER_IDS).length;
    const summed = [...new Set(Object.values(CHAMPION_DRIVER_IDS))].reduce(
      (acc, id) => acc + getDriverChampionshipCount(id),
      0,
    );
    expect(summed).toBe(total);
  });
});
