"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up from 0 when scrolled into view; static under reduced motion. */
export function AnimatedNumber({
  value,
  decimals = 0,
  className,
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [value, decimals, reduced]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
    </span>
  );
}
