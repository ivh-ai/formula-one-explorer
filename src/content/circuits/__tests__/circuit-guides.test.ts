import { describe, expect, it } from "vitest";
import {
  CIRCUIT_GUIDES,
  CURRENT_CIRCUIT_IDS,
  getCircuitGuide,
} from "@/content/circuits/circuit-guides";
import { TRACK_PATHS, getTrackPath } from "@/content/circuits/track-paths";

describe("circuit guides and track paths", () => {
  it("covers every current-calendar circuit with both a guide and a path", () => {
    for (const circuitId of CURRENT_CIRCUIT_IDS) {
      expect(getCircuitGuide(circuitId), `guide ${circuitId}`).toBeDefined();
      expect(getTrackPath(circuitId), `path ${circuitId}`).toBeDefined();
    }
  });

  it("every guide has complete data", () => {
    for (const [id, guide] of Object.entries(CIRCUIT_GUIDES)) {
      expect(guide.lengthKm, `${id} length`).toBeGreaterThan(3);
      expect(guide.laps, `${id} laps`).toBeGreaterThan(40);
      expect(guide.corners, `${id} corners`).toBeGreaterThanOrEqual(10);
      expect(guide.cornerGuide.length, `${id} cornerGuide`).toBeGreaterThanOrEqual(4);
      expect(guide.overtakingSpots.length, `${id} overtakingSpots`).toBeGreaterThanOrEqual(2);
      expect(guide.strategyNotes.length, `${id} strategyNotes`).toBeGreaterThanOrEqual(2);
      expect(guide.funFacts.length, `${id} funFacts`).toBeGreaterThanOrEqual(2);
      if (guide.lapRecord) {
        expect(guide.lapRecord.time, `${id} lapRecord time`).toMatch(/^\d:\d{2}\.\d{3}$/);
        expect(guide.lapRecord.year, `${id} lapRecord year`).toBeGreaterThan(1990);
      }
    }
  });

  it("every track path is a valid closed SVG path with a start/finish marker", () => {
    for (const [id, track] of Object.entries(TRACK_PATHS)) {
      expect(track.path.trim().startsWith("M"), `${id} starts with M`).toBe(true);
      expect(track.path.trim().endsWith("Z"), `${id} closed loop`).toBe(true);
      expect(track.drsZones.length, `${id} drs zones`).toBeGreaterThanOrEqual(1);
      for (const zone of track.drsZones) {
        expect(zone.path.trim().startsWith("M"), `${id} drs path`).toBe(true);
      }
      expect(track.startFinish.x).toBeGreaterThan(0);
      expect(track.startFinish.y).toBeGreaterThan(0);
    }
  });
});
