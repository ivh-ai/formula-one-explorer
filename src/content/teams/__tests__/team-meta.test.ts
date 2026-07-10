import { describe, expect, it } from "vitest";
import {
  TEAM_META,
  getCurrentTeams,
  getTeamColor,
  getTeamMeta,
} from "@/content/teams/team-meta";

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

describe("TEAM_META", () => {
  it("has valid hex colors and non-empty editorial fields for every team", () => {
    for (const [key, meta] of Object.entries(TEAM_META)) {
      expect(meta.color, `${key} color`).toMatch(HEX_COLOR);
      expect(meta.secondaryColor, `${key} secondaryColor`).toMatch(HEX_COLOR);
      expect(meta.base.length, `${key} base`).toBeGreaterThan(0);
      expect(meta.principal.length, `${key} principal`).toBeGreaterThan(0);
      expect(meta.powerUnit.length, `${key} powerUnit`).toBeGreaterThan(0);
      expect(meta.funFacts.length, `${key} funFacts`).toBeGreaterThanOrEqual(3);
      expect(meta.firstEntry, `${key} firstEntry`).toBeGreaterThanOrEqual(1950);
    }
  });

  it("contains all 11 current teams", () => {
    expect(getCurrentTeams()).toHaveLength(11);
    for (const id of [
      "mclaren",
      "ferrari",
      "red_bull",
      "mercedes",
      "aston_martin",
      "alpine",
      "williams",
      "rb",
      "audi",
      "haas",
      "cadillac",
    ]) {
      expect(getTeamMeta(id)?.current, id).toBe(true);
    }
  });

  it("falls back to a neutral color for unknown constructors", () => {
    expect(getTeamColor("unknown_team")).toBe("#9CA3AF");
    expect(getTeamColor("ferrari")).toBe("#E8002D");
  });
});
