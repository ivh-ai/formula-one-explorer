"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { F1_FACTS } from "@/content/facts";

export function FactStrip({ initialIndex }: { initialIndex: number }) {
  const [index, setIndex] = useState(initialIndex % F1_FACTS.length);
  const reduced = useReducedMotion();
  const fact = F1_FACTS[index];

  return (
    <div className="glass-panel flex items-start gap-4 rounded-xl p-5">
      <Lightbulb className="mt-1 size-5 shrink-0 text-amber-500" aria-hidden />
      <div className="min-h-16 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {fact.category}
            </p>
            <p className="mt-1 font-medium">{fact.fact}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Show another fact"
        onClick={() => setIndex((current) => (current + 1) % F1_FACTS.length)}
      >
        <RefreshCw className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
