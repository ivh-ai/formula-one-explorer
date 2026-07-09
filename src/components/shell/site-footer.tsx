import Link from "next/link";
import {
  NAV_GROUP_LABELS,
  navLinksByGroup,
  type NavGroup,
} from "@/components/shell/nav-links";

const GROUPS: NavGroup[] = ["explore", "learn", "data"];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t carbon-texture">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="flex items-baseline gap-1.5 text-lg font-bold tracking-tight">
            <span aria-hidden className="inline-block h-3 w-6 skew-x-[-20deg] rounded-[2px] bg-[#E8002D]" />
            F1 Explorer
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Learn, explore and follow Formula One — from your first race to the
            deepest telemetry.
          </p>
        </div>
        {GROUPS.map((group) => (
          <nav key={group} aria-label={`Footer ${NAV_GROUP_LABELS[group]}`}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {NAV_GROUP_LABELS[group]}
            </p>
            <ul className="space-y-1.5">
              {navLinksByGroup(group).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Data:{" "}
            <a href="https://jolpi.ca" className="underline hover:text-foreground">
              Jolpica F1
            </a>
            ,{" "}
            <a href="https://openf1.org" className="underline hover:text-foreground">
              OpenF1
            </a>
            ,{" "}
            <a href="https://open-meteo.com" className="underline hover:text-foreground">
              Open-Meteo
            </a>
            . Unofficial fan project — not associated with Formula 1 companies.
          </p>
          <Link href="/settings" className="underline hover:text-foreground">
            Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
