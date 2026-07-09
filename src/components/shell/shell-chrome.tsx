"use client";

import { SiteHeader } from "@/components/shell/site-header";

/**
 * Client-side chrome: header plus globally-available overlays. The command
 * palette mounts here once global search lands.
 */
export function ShellChrome() {
  return <SiteHeader />;
}
