"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TrackPath } from "@/content/circuits/track-paths";

/**
 * Animated SVG track outline: the racing line draws itself in, DRS zones
 * highlight in green, and the start/finish is marked. Stylized, not to scale.
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
      aria-label="Stylized track map"
    >
      {/* Track base */}
      <path
        d={track.path}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeOpacity={0.25}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Racing line draw-in */}
      <motion.path
        d={track.path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {/* DRS zones */}
      {track.drsZones.map((zone, index) => (
        <motion.path
          key={index}
          d={zone.path}
          fill="none"
          stroke="#22C55E"
          strokeWidth={5}
          strokeOpacity={0.85}
          strokeLinecap="round"
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldAnimate ? 1.8 + index * 0.2 : 0, duration: 0.5 }}
        />
      ))}
      {/* Start/finish marker */}
      <g transform={`translate(${track.startFinish.x}, ${track.startFinish.y})`}>
        <rect x={-2.4} y={-2.4} width={4.8} height={4.8} rx={0.8} fill="var(--background)" stroke="currentColor" strokeWidth={0.8} />
        <path d="M -1.5 -1.5 h 1 v 1 h -1 Z M 0.5 -1.5 h 1 v 1 h -1 Z M -0.5 -0.5 h 1 v 1 h -1 Z M -1.5 0.5 h 1 v 1 h -1 Z M 0.5 0.5 h 1 v 1 h -1 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
