"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { applyTheme, useReducedMotionPreference } from "@/lib/hooks/use-settings";

/** Applies the stored theme before interactive settings load. */
function ThemeBoot() {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("f1x-settings");
      const theme =
        raw && (JSON.parse(raw) as { theme?: string }).theme;
      applyTheme(theme === "light" || theme === "dark" ? theme : "system");
    } catch {
      applyTheme("system");
    }
  }, []);
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const reducedMotion = useReducedMotionPreference();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
        <ThemeBoot />
        {children}
      </MotionConfig>
    </QueryClientProvider>
  );
}
