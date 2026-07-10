import { describe, expect, it } from "vitest";
import { buildLeaderboard, latestPerDriver } from "@/lib/services/live-timing";
import type {
  IntervalEntry,
  LapEntry,
  LiveDriver,
  PitEntry,
  PositionEntry,
  StintEntry,
} from "@/lib/models/live";

const DRIVERS: LiveDriver[] = [
  { driverNumber: 1, acronym: "VER", fullName: "Max Verstappen", teamName: "Red Bull Racing", teamColor: "3671C6" },
  { driverNumber: 4, acronym: "NOR", fullName: "Lando Norris", teamName: "McLaren", teamColor: "FF8000" },
  { driverNumber: 16, acronym: "LEC", fullName: "Charles Leclerc", teamName: "Ferrari", teamColor: "E8002D" },
];

const POSITIONS: PositionEntry[] = [
  { driverNumber: 1, position: 1, dateUtc: "2026-07-05T14:10:00Z" },
  { driverNumber: 4, position: 2, dateUtc: "2026-07-05T14:10:00Z" },
  { driverNumber: 16, position: 3, dateUtc: "2026-07-05T14:10:00Z" },
  // Later: Norris takes the lead — latest timestamp must win.
  { driverNumber: 4, position: 1, dateUtc: "2026-07-05T14:40:00Z" },
  { driverNumber: 1, position: 2, dateUtc: "2026-07-05T14:40:00Z" },
];

const INTERVALS: IntervalEntry[] = [
  { driverNumber: 4, gapToLeader: 0, interval: 0, dateUtc: "2026-07-05T14:41:00Z" },
  { driverNumber: 1, gapToLeader: 1.234, interval: 1.234, dateUtc: "2026-07-05T14:41:00Z" },
  { driverNumber: 16, gapToLeader: "+1 LAP", interval: 45.6, dateUtc: "2026-07-05T14:41:00Z" },
];

const LAPS: LapEntry[] = [
  { driverNumber: 4, lapNumber: 30, lapDuration: 88.4, sector1: 28.1, sector2: 30.2, sector3: 30.1, isPitOutLap: false },
  { driverNumber: 4, lapNumber: 31, lapDuration: 87.9, sector1: 28.0, sector2: 30.0, sector3: 29.9, isPitOutLap: false },
  { driverNumber: 1, lapNumber: 31, lapDuration: 88.2, sector1: 28.2, sector2: 30.0, sector3: 30.0, isPitOutLap: false },
  { driverNumber: 16, lapNumber: 30, lapDuration: null, sector1: null, sector2: null, sector3: null, isPitOutLap: true },
];

const STINTS: StintEntry[] = [
  { driverNumber: 4, stintNumber: 1, compound: "MEDIUM", lapStart: 1, lapEnd: 18, tyreAgeAtStart: 0 },
  { driverNumber: 4, stintNumber: 2, compound: "HARD", lapStart: 19, lapEnd: 31, tyreAgeAtStart: 0 },
  { driverNumber: 1, stintNumber: 1, compound: "SOFT", lapStart: 1, lapEnd: 31, tyreAgeAtStart: 2 },
];

const PITS: PitEntry[] = [
  { driverNumber: 4, lapNumber: 18, pitDuration: 22.1 },
];

describe("latestPerDriver", () => {
  it("keeps only the newest entry per driver", () => {
    const latest = latestPerDriver(POSITIONS, (entry) => entry.dateUtc);
    expect(latest.get(1)?.position).toBe(2);
    expect(latest.get(4)?.position).toBe(1);
    expect(latest.get(16)?.position).toBe(3);
  });
});

describe("buildLeaderboard", () => {
  const rows = buildLeaderboard(DRIVERS, POSITIONS, INTERVALS, LAPS, STINTS, PITS);

  it("orders rows by latest position", () => {
    expect(rows.map((row) => row.acronym)).toEqual(["NOR", "VER", "LEC"]);
    expect(rows[0].position).toBe(1);
  });

  it("formats gaps: leader, numeric, lapped", () => {
    expect(rows[0].gapToLeader).toBe("Leader");
    expect(rows[1].gapToLeader).toBe("+1.234");
    expect(rows[2].gapToLeader).toBe("+1 LAP");
  });

  it("computes last/best lap and current stint info", () => {
    expect(rows[0].lastLap).toBe("1:27.900");
    expect(rows[0].bestLap).toBe("1:27.900");
    expect(rows[0].compound).toBe("Hard");
    expect(rows[0].tyreAge).toBe(13);
    expect(rows[0].pitCount).toBe(1);
  });

  it("handles drivers with no lap data gracefully", () => {
    expect(rows[2].lastLap).toBe("—");
    expect(rows[2].compound).toBe("—");
    expect(rows[2].pitCount).toBe(0);
  });
});
