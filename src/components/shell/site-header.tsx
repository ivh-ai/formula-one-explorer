"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NAV_GROUP_LABELS,
  navLinksByGroup,
  type NavGroup,
} from "@/components/shell/nav-links";
import { MobileNav } from "@/components/shell/mobile-nav";
import { useSettings } from "@/lib/hooks/use-settings";
import { cn } from "@/lib/utils";

const GROUPS: NavGroup[] = ["explore", "learn", "data"];

function NavDropdown({ group, activePath }: { group: NavGroup; activePath: string }) {
  const links = navLinksByGroup(group);
  const groupActive = links.some((link) => activePath.startsWith(link.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-sm font-medium",
            groupActive && "text-primary underline decoration-2 underline-offset-8",
          )}
        >
          {NAV_GROUP_LABELS[group]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 glass-panel">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className="flex flex-col items-start gap-0.5 py-2">
              <span className="font-medium">{link.label}</span>
              {link.description ? (
                <span className="text-xs text-muted-foreground">{link.description}</span>
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const { settings, setTheme } = useSettings();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <MobileNav />
        <Link
          href="/"
          className="mr-4 flex items-baseline gap-1.5 text-lg font-bold tracking-tight"
        >
          <span aria-hidden className="inline-block h-3 w-6 skew-x-[-20deg] rounded-[2px] bg-[#E8002D]" />
          F1&nbsp;Explorer
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {GROUPS.map((group) => (
            <NavDropdown key={group} group={group} activePath={pathname} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-2 text-muted-foreground sm:flex"
            onClick={onSearchOpen}
            data-search-trigger
          >
            <Search className="size-3.5" aria-hidden />
            <span className="text-xs">Search</span>
            <kbd className="rounded border bg-muted px-1 text-[10px]">⌘K</kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={settings.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            <Sun className="size-4 dark:hidden" aria-hidden />
            <Moon className="hidden size-4 dark:block" aria-hidden />
          </Button>
        </div>
      </div>
    </header>
  );
}
