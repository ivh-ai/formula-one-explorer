import { describe, expect, it } from "vitest";
import { WORLD_CHAMPIONS, getChampion } from "@/content/history/champions";

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
