import { NextResponse } from "next/server";
import { getConstructorStandings, getDriverStandings } from "@/lib/api/jolpica";
import { CURRENT_SEASON } from "@/lib/utils/season";
import type { SearchDoc } from "@/lib/services/search-index";

export const revalidate = 3600;

/** Dynamic search docs: the current grid, fetched lazily by the palette. */
export async function GET() {
  const [drivers, constructors] = await Promise.all([
    getDriverStandings(CURRENT_SEASON),
    getConstructorStandings(CURRENT_SEASON),
  ]);

  const docs: SearchDoc[] = [];

  if (drivers.ok) {
    for (const standing of drivers.data) {
      docs.push({
        id: `driver-${standing.driver.driverId}`,
        type: "driver",
        title: standing.driver.fullName,
        subtitle: `P${standing.position} · ${standing.constructors[0]?.name ?? ""}`,
        href: `/drivers/${standing.driver.driverId}`,
        keywords: ["driver", standing.driver.code ?? "", standing.driver.nationality],
      });
    }
  }

  if (constructors.ok) {
    for (const standing of constructors.data) {
      docs.push({
        id: `team-${standing.constructor.constructorId}`,
        type: "team",
        title: standing.constructor.name,
        subtitle: `P${standing.position} in the constructors' championship`,
        href: `/teams/${standing.constructor.constructorId}`,
        keywords: ["team", "constructor", standing.constructor.nationality],
      });
    }
  }

  return NextResponse.json(docs);
}
