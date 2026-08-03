"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TrackPath } from "@/content/circuits/track-paths";

/**
 * Animated SVG track outline: the racing line draws itself in and the
 * start/finish is marked. Geometry is to true proportions (see track-paths.ts).
 */
export function TrackMap({
  track,
  className,
  animate = true,
}: {
  track: TrackPath;
  className?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      viewBox={track.viewBox}
      className={className}
      role="img"
      aria-label="Circuit track map"
    >
      {/* Track base (asphalt) */}
      <path
        d={track.path}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeOpacity={0.28}
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Racing line draw-in */}
      <motion.path
        d={track.path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      {/* Start/finish marker */}
      <g transform={`translate(${track.startFinish.x}, ${track.startFinish.y})`}>
        <rect x={-2.4} y={-2.4} width={4.8} height={4.8} rx={0.8} fill="var(--background)" stroke="currentColor" strokeWidth={0.8} />
        <path d="M -1.5 -1.5 h 1 v 1 h -1 Z M 0.5 -1.5 h 1 v 1 h -1 Z M -0.5 -0.5 h 1 v 1 h -1 Z M -1.5 0.5 h 1 v 1 h -1 Z M 0.5 0.5 h 1 v 1 h -1 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
