"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

/** Animated speed lines drawn once on load; static under reduced motion. */
function SpeedLines() {
  const reduced = useReducedMotion();
  const lines = [
    { y: 30, delay: 0, width: 62, color: "#E8002D" },
    { y: 44, delay: 0.15, width: 78, color: "#FF8000" },
    { y: 58, delay: 0.3, width: 50, color: "#27F4D2" },
    { y: 72, delay: 0.45, width: 68, color: "#3671C6" },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 opacity-40 md:block"
      aria-hidden
      preserveAspectRatio="none"
    >
      {lines.map((line) => (
        <motion.rect
          key={line.y}
          x={100 - line.width}
          y={line.y}
          height={1.5}
          rx={0.75}
          fill={line.color}
          initial={reduced ? { width: line.width } : { width: 0, x: 100 }}
          animate={{ width: line.width, x: 100 - line.width }}
          transition={{ duration: 0.9, delay: line.delay, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b carbon-texture">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,0,45,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(54,113,198,0.08),transparent_55%)]"
      />
      <SpeedLines />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            The Formula One companion
          </p>
          <h1 className="heading-editorial text-5xl sm:text-6xl lg:text-7xl">
            Understand every second of Formula One.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Learn the sport from zero, follow races live, and explore every
            season since 1950 — drivers, teams, circuits, strategy and the
            stories behind them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/learn">Start learning</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/live">Live Race Center</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
