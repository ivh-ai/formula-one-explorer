import { describe, expect, it } from "vitest";
import { getCountdownParts, getNextRace } from "@/lib/utils/countdown";
import type { Race } from "@/lib/models/f1";

describe("getCountdownParts", () => {
  it("splits the remaining time into parts", () => {
    const target = new Date("2026-07-12T14:00:00Z");
    const now = new Date("2026-07-09T10:30:20Z");
    expect(getCountdownParts(target, now)).toEqual({
      days: 3,
      hours: 3,
      minutes: 29,
      seconds: 40,
      isPast: false,
    });
  });

  it("flags past targets", () => {
    const target = new Date("2026-07-05T14:00:00Z");
    const now = new Date("2026-07-09T10:00:00Z");
    expect(getCountdownParts(target, now).isPast).toBe(true);
  });
});

function race(round: number, iso: string | null): Race {
  return {
    season: 2026,
    round,
    raceName: `Race ${round}`,
    circuit: {
      circuitId: "c",
      name: "C",
      locality: "",
      country: "",
      lat: 0,
      lng: 0,
      url: null,
    },
    dateTimeUtc: iso,
    date: iso?.slice(0, 10) ?? "",
    sprint: false,
    sessions: [],
    url: null,
  };
}

describe("getNextRace", () => {
  const races = [
    race(1, "2026-03-08T04:00:00Z"),
    race(2, "2026-07-05T14:00:00Z"),
    race(3, "2026-07-26T13:00:00Z"),
  ];

  it("returns the first race that hasn't started (with 3h grace)", () => {
    expect(getNextRace(races, new Date("2026-07-09T00:00:00Z"))?.round).toBe(3);
    expect(getNextRace(races, new Date("2026-01-01T00:00:00Z"))?.round).toBe(1);
  });

  it("keeps a race 'next' while it is plausibly running", () => {
    expect(getNextRace(races, new Date("2026-07-05T15:30:00Z"))?.round).toBe(2);
  });

  it("returns null after the finale", () => {
    expect(getNextRace(races, new Date("2026-12-01T00:00:00Z"))).toBeNull();
  });
});
