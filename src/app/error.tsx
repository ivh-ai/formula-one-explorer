"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div aria-hidden className="mb-6 h-2 w-24 rounded-full bg-[#E8002D]" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8002D]">
        Red flag
      </p>
      <h1 className="heading-editorial mt-2 text-4xl">Session stopped</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Something went wrong rendering this page. The marshals are on it — try
        restarting, and if it keeps happening the data source may be briefly down.
      </p>
      <Button onClick={reset} className="mt-6">
        Restart session
      </Button>
    </main>
  );
}
