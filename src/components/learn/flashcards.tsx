"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();

  const card = cards[index];
  const go = (delta: number) => {
    setFlipped(false);
    setIndex((value) => (value + delta + cards.length) % cards.length);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className="block w-full [perspective:1200px]"
        aria-label={flipped ? "Show term" : "Show definition"}
      >
        <motion.div
          className="relative h-44 w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.45, ease: "easeInOut" }}
        >
          <div className="glass-panel absolute inset-0 flex items-center justify-center rounded-xl p-6 [backface-visibility:hidden]">
            <p className="text-center text-lg font-bold">{card.front}</p>
          </div>
          <div className="glass-panel carbon-texture absolute inset-0 flex items-center justify-center rounded-xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-center text-sm leading-relaxed">{card.back}</p>
          </div>
        </motion.div>
      </button>
      <div className="mt-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => go(-1)} aria-label="Previous card">
          <ChevronLeft className="size-4" aria-hidden />
        </Button>
        <p className="text-xs text-muted-foreground">
          Card {index + 1} of {cards.length} — tap to flip
        </p>
        <Button variant="ghost" size="icon" onClick={() => go(1)} aria-label="Next card">
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
