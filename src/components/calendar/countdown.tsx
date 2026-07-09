"use client";

import { useEffect, useState } from "react";
import { getCountdownParts, type CountdownParts } from "@/lib/utils/countdown";
import { useReducedMotionPreference } from "@/lib/hooks/use-settings";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="timing-mono text-2xl font-bold sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/**
 * Live countdown to an ISO timestamp. Ticks every second, or every 30s under
 * reduced motion to avoid constant visual churn.
 */
export function Countdown({ targetIso }: { targetIso: string }) {
  const reduced = useReducedMotionPreference();
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const target = new Date(targetIso);
    const tick = () => setParts(getCountdownParts(target, new Date()));
    tick();
    const interval = setInterval(tick, reduced ? 30_000 : 1000);
    return () => clearInterval(interval);
  }, [targetIso, reduced]);

  // Server-render placeholder to avoid hydration mismatch.
  if (!parts) {
    return (
      <div className="flex items-center gap-4" aria-hidden>
        <Unit value={0} label="days" />
        <Unit value={0} label="hrs" />
        <Unit value={0} label="min" />
        <Unit value={0} label="sec" />
      </div>
    );
  }

  if (parts.isPast) {
    return <p className="text-sm font-semibold text-[var(--live)]">Underway or completed</p>;
  }

  return (
    <div
      className="flex items-center gap-4"
      role="timer"
      aria-label={`${parts.days} days ${parts.hours} hours ${parts.minutes} minutes until the race`}
    >
      <Unit value={parts.days} label="days" />
      <Unit value={parts.hours} label="hrs" />
      <Unit value={parts.minutes} label="min" />
      <Unit value={parts.seconds} label="sec" />
    </div>
  );
}
