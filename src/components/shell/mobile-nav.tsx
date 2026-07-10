"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NAV_GROUP_LABELS,
  navLinksByGroup,
  type NavGroup,
} from "@/components/shell/nav-links";

const GROUPS: NavGroup[] = ["explore", "learn", "data"];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-baseline gap-1.5">
            <span aria-hidden className="inline-block h-3 w-6 skew-x-[-20deg] rounded-[2px] bg-[#E8002D]" />
            F1 Explorer
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-5 px-4 pb-8">
          {GROUPS.map((group) => (
            <div key={group}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {NAV_GROUP_LABELS[group]}
              </p>
              <div className="flex flex-col">
                {navLinksByGroup(group).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
          >
            <Settings className="size-4" aria-hidden /> Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
