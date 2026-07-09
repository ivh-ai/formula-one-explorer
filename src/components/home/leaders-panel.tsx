import Link from "next/link";
import { CountryFlag } from "@/components/ui-kit/country-flag";
import { TeamChip } from "@/components/ui-kit/team-chip";
import { getTeamColor } from "@/content/teams/team-meta";
import type { ConstructorStanding, DriverStanding } from "@/lib/models/f1";

export function LeadersPanel({
  drivers,
  constructors,
  year,
}: {
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
  year: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass-panel rounded-xl p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Drivers&apos; championship
          </h3>
          <Link
            href={`/standings/drivers?year=${year}`}
            className="text-xs font-medium text-primary hover:underline"
          >
            Full standings →
          </Link>
        </div>
        <ol className="space-y-3">
          {drivers.slice(0, 3).map((standing) => (
            <li key={standing.driver.driverId} className="flex items-center gap-3">
              <span className="timing-mono w-5 text-lg font-bold text-muted-foreground">
                {standing.position}
              </span>
              <span
                aria-hidden
                className="h-8 w-1 rounded-full"
                style={{
                  backgroundColor: getTeamColor(
                    standing.constructors[0]?.constructorId ?? "",
                  ),
                }}
              />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/drivers/${standing.driver.driverId}`}
                  className="flex items-center gap-2 font-semibold hover:underline"
                >
                  <CountryFlag nationality={standing.driver.nationality} />
                  <span className="truncate">{standing.driver.fullName}</span>
                </Link>
                <p className="truncate text-xs text-muted-foreground">
                  {standing.constructors[0]?.name}
                </p>
              </div>
              <span className="timing-mono font-bold">{standing.points}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="glass-panel rounded-xl p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Constructors&apos; championship
          </h3>
          <Link
            href={`/standings/constructors?year=${year}`}
            className="text-xs font-medium text-primary hover:underline"
          >
            Full standings →
          </Link>
        </div>
        <ol className="space-y-3">
          {constructors.slice(0, 3).map((standing) => (
            <li
              key={standing.constructor.constructorId}
              className="flex items-center gap-3"
            >
              <span className="timing-mono w-5 text-lg font-bold text-muted-foreground">
                {standing.position}
              </span>
              <div className="min-w-0 flex-1">
                <TeamChip
                  constructorId={standing.constructor.constructorId}
                  name={standing.constructor.name}
                  className="font-semibold"
                />
              </div>
              <span className="timing-mono font-bold">{standing.points}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
