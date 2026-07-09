import { describe, expect, it } from "vitest";
import { DRIVER_META, getDriverMeta } from "@/content/drivers/driver-meta";

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

describe("DRIVER_META", () => {
  it("keys match the embedded driverId", () => {
    for (const [key, meta] of Object.entries(DRIVER_META)) {
      expect(meta.driverId, key).toBe(key);
    }
  });

  it("every entry has complete editorial content", () => {
    for (const [key, meta] of Object.entries(DRIVER_META)) {
      expect(meta.bio.length, `${key} bio`).toBeGreaterThan(50);
      expect(meta.drivingStyle.length, `${key} drivingStyle`).toBeGreaterThan(20);
      expect(meta.funFacts.length, `${key} funFacts`).toBeGreaterThanOrEqual(2);
      expect(meta.highlights.length, `${key} highlights`).toBeGreaterThanOrEqual(2);
      expect(meta.helmetColors[0], `${key} helmet primary`).toMatch(HEX_COLOR);
      expect(meta.helmetColors[1], `${key} helmet secondary`).toMatch(HEX_COLOR);
    }
  });

  it("covers the full 2026 grid", () => {
    const grid2026 = [
      "norris",
      "piastri",
      "max_verstappen",
      "hadjar",
      "leclerc",
      "hamilton",
      "russell",
      "antonelli",
      "alonso",
      "stroll",
      "gasly",
      "colapinto",
      "lawson",
      "arvid_lindblad",
      "albon",
      "sainz",
      "bearman",
      "ocon",
      "hulkenberg",
      "bortoleto",
      "perez",
      "bottas",
    ];
    for (const id of grid2026) {
      expect(getDriverMeta(id), id).toBeDefined();
    }
  });

  it("returns undefined for unknown drivers", () => {
    expect(getDriverMeta("not_a_driver")).toBeUndefined();
  });
});
