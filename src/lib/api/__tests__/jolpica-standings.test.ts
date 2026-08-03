import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getConstructorSeasonsStandings,
  getDriverSeasonsStandings,
} from "@/lib/api/jolpica";

/**
 * Jolpica retired the unscoped `/drivers/{id}/driverstandings.json` and
 * `/constructors/{id}/constructorstandings.json` endpoints (they now 400).
 * These functions must fan out across the driver's/constructor's seasons using
 * the per-season scoped endpoints instead. We mock fetch by URL to prove it.
 */

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function seasonsResponse(seasons: number[]) {
  return {
    MRData: {
      total: String(seasons.length),
      limit: "100",
      offset: "0",
      SeasonTable: {
        Seasons: seasons.map((year) => ({ season: String(year), url: null })),
      },
    },
  };
}

function driverStandingResponse(season: number, position: number, points: number, wins: number) {
  return {
    MRData: {
      total: "1",
      limit: "30",
      offset: "0",
      StandingsTable: {
        StandingsLists: [
          {
            season: String(season),
            round: "22",
            DriverStandings: [
              {
                position: String(position),
                points: String(points),
                wins: String(wins),
                Driver: {
                  driverId: "hamilton",
                  givenName: "Lewis",
                  familyName: "Hamilton",
                  nationality: "British",
                },
                Constructors: [
                  { constructorId: "mercedes", name: "Mercedes", nationality: "German" },
                ],
              },
            ],
          },
        ],
      },
    },
  };
}

function constructorStandingResponse(season: number, position: number, points: number, wins: number) {
  return {
    MRData: {
      total: "1",
      StandingsTable: {
        StandingsLists: [
          {
            season: String(season),
            round: "22",
            ConstructorStandings: [
              {
                position: String(position),
                points: String(points),
                wins: String(wins),
                Constructor: { constructorId: "ferrari", name: "Ferrari", nationality: "Italian" },
              },
            ],
          },
        ],
      },
    },
  };
}

afterEach(() => vi.restoreAllMocks());

describe("getDriverSeasonsStandings", () => {
  it("fans out across seasons and returns each season's final standing", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = String(input);
      if (url.includes("/drivers/hamilton/seasons.json")) {
        return Promise.resolve(json(seasonsResponse([2019, 2020])));
      }
      if (url.includes("/2019/drivers/hamilton/driverstandings.json")) {
        return Promise.resolve(json(driverStandingResponse(2019, 1, 413, 11)));
      }
      if (url.includes("/2020/drivers/hamilton/driverstandings.json")) {
        return Promise.resolve(json(driverStandingResponse(2020, 1, 347, 11)));
      }
      throw new Error(`Unexpected URL: ${url}`);
    });

    const result = await getDriverSeasonsStandings("hamilton");
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data).toHaveLength(2);
    const bySeason = new Map(result.data.map((s) => [s.season, s]));
    expect(bySeason.get(2019)).toMatchObject({ position: 1, points: 413, wins: 11 });
    expect(bySeason.get(2020)?.constructors[0]?.constructorId).toBe("mercedes");
    // Both are title-winning seasons.
    expect(result.data.filter((s) => s.position === 1)).toHaveLength(2);
  });
});

describe("getConstructorSeasonsStandings", () => {
  it("fans out across seasons and returns each season's final standing", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
      const url = String(input);
      if (url.includes("/constructors/ferrari/seasons.json")) {
        return Promise.resolve(json(seasonsResponse([2007, 2008])));
      }
      if (url.includes("/2007/constructors/ferrari/constructorstandings.json")) {
        return Promise.resolve(json(constructorStandingResponse(2007, 1, 204, 9)));
      }
      if (url.includes("/2008/constructors/ferrari/constructorstandings.json")) {
        return Promise.resolve(json(constructorStandingResponse(2008, 1, 172, 8)));
      }
      throw new Error(`Unexpected URL: ${url}`);
    });

    const result = await getConstructorSeasonsStandings("ferrari");
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.data).toHaveLength(2);
    const champs = result.data.filter((entry) => entry.standing.position === 1);
    expect(champs).toHaveLength(2);
    expect(result.data.find((e) => e.season === 2007)?.standing.points).toBe(204);
  });
});
