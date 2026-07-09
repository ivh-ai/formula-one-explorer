import { describe, expect, it } from "vitest";
import {
  deriveSessionStatus,
  mapLiveDriver,
  mapSession,
  mapStint,
} from "@/lib/api/openf1";
import type { LiveSession } from "@/lib/models/live";

const SESSION: LiveSession = {
  sessionKey: 11326,
  meetingKey: 1289,
  name: "Race",
  type: "Race",
  circuitShortName: "Silverstone",
  countryName: "United Kingdom",
  dateStartUtc: "2026-07-05T14:00:00+00:00",
  dateEndUtc: "2026-07-05T16:00:00+00:00",
  year: 2026,
};

describe("mapSession / mapLiveDriver / mapStint", () => {
  it("converts snake_case session fields", () => {
    const mapped = mapSession({
      session_key: 11326,
      meeting_key: 1289,
      session_name: "Race",
      session_type: "Race",
      circuit_short_name: "Silverstone",
      country_name: "United Kingdom",
      date_start: "2026-07-05T14:00:00+00:00",
      date_end: "2026-07-05T16:00:00+00:00",
      year: 2026,
    });
    expect(mapped).toEqual(SESSION);
  });

  it("defaults missing driver fields safely", () => {
    const mapped = mapLiveDriver({ driver_number: 27 });
    expect(mapped.acronym).toBe("27");
    expect(mapped.fullName).toBe("#27");
    expect(mapped.teamName).toBe("");
  });

  it("defaults null stint fields", () => {
    const mapped = mapStint({
      driver_number: 1,
      stint_number: 2,
      compound: null,
      lap_start: 14,
      lap_end: null,
      tyre_age_at_start: null,
    });
    expect(mapped.compound).toBe("UNKNOWN");
    expect(mapped.lapEnd).toBe(14);
    expect(mapped.tyreAgeAtStart).toBe(0);
  });
});

describe("deriveSessionStatus", () => {
  it("is live shortly before the start (formation lap window)", () => {
    expect(deriveSessionStatus(SESSION, new Date("2026-07-05T13:52:00Z"))).toBe("live");
  });

  it("is live during and up to 30 minutes after the end", () => {
    expect(deriveSessionStatus(SESSION, new Date("2026-07-05T15:00:00Z"))).toBe("live");
    expect(deriveSessionStatus(SESSION, new Date("2026-07-05T16:29:00Z"))).toBe("live");
  });

  it("is recent within 14 days of the end", () => {
    expect(deriveSessionStatus(SESSION, new Date("2026-07-09T12:00:00Z"))).toBe("recent");
  });

  it("is none long after and well before", () => {
    expect(deriveSessionStatus(SESSION, new Date("2026-08-05T12:00:00Z"))).toBe("none");
    expect(deriveSessionStatus(SESSION, new Date("2026-07-01T12:00:00Z"))).toBe("none");
  });
});
