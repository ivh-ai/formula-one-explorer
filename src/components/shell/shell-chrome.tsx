"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/shell/site-header";
import { CommandPalette } from "@/components/search/command-palette";

/** Client-side chrome: header plus the global ⌘K command palette. */
export function ShellChrome() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <SiteHeader onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
