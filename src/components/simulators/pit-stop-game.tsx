"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scorePitStop, type PitStopScore } from "@/lib/services/simulators";
import { Button } from "@/components/ui/button";

const STAGES = ["Car stops", "Wheels off", "Wheels on", "Release!"] as const;

type Phase =
  | { kind: "idle" }
  | { kind: "waiting"; stage: number }
  | { kind: "go"; stage: number; shownAt: number }
  | { kind: "jumped"; stage: number }
  | { kind: "done"; score: PitStopScore };

const RATING_COPY: Record<PitStopScore["rating"], { emoji: string; text: string }> = {
  legendary: { emoji: "🏆", text: "Legendary — world-record pace! McLaren's 1.80s crew would be proud." },
  great: { emoji: "🔥", text: "Great stop — comfortably race-winning pit work." },
  good: { emoji: "👍", text: "Solid — no positions lost, but the wall wants more." },
  slow: { emoji: "🐢", text: "Slow — the strategist is rethinking your career." },
};

export function PitStopGame() {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const reactionsRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => clearTimer, []);

  const armStage = useCallback((stage: number) => {
    setPhase({ kind: "waiting", stage });
    const delay = 700 + Math.random() * 1800;
    clearTimer();
    timerRef.current = setTimeout(() => {
      setPhase({ kind: "go", stage, shownAt: performance.now() });
    }, delay);
  }, []);

  const start = () => {
    reactionsRef.current = [];
    armStage(0);
  };

  const handlePress = () => {
    if (phase.kind === "waiting") {
      clearTimer();
      setPhase({ kind: "jumped", stage: phase.stage });
      return;
    }
    if (phase.kind === "go") {
      const reaction = performance.now() - phase.shownAt;
      reactionsRef.current.push(reaction);
      if (phase.stage + 1 >= STAGES.length) {
        setPhase({ kind: "done", score: scorePitStop(reactionsRef.current) });
      } else {
        armStage(phase.stage + 1);
      }
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 text-center">
      <p className="text-sm text-muted-foreground">
        Four stages, four reactions. Tap the instant each light goes green — a real
        stop takes about two seconds all-in. Jump the gun and the car leaves with
        three wheels.
      </p>

      <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-4">
        {phase.kind === "idle" ? (
          <Button size="lg" onClick={start}>
            Car approaching — get ready
          </Button>
        ) : phase.kind === "jumped" ? (
          <>
            <p className="text-4xl">💥</p>
            <p className="font-bold">Jump start at &ldquo;{STAGES[phase.stage]}&rdquo;!</p>
            <p className="text-sm text-muted-foreground">
              Unsafe release — that&apos;s a 10-second penalty and a very quiet debrief.
            </p>
            <Button onClick={start} variant="outline">
              Try again
            </Button>
          </>
        ) : phase.kind === "done" ? (
          <>
            <p className="text-4xl">{RATING_COPY[phase.score.rating].emoji}</p>
            <p className="timing-mono text-5xl font-black">
              {(phase.score.total / 1000).toFixed(2)}s
            </p>
            <p className="text-sm text-muted-foreground">
              {RATING_COPY[phase.score.rating].text}
            </p>
            <Button onClick={start} variant="outline">
              Another stop
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Stage {phase.stage + 1} of {STAGES.length}: {STAGES[phase.stage]}
            </p>
            <button
              type="button"
              onClick={handlePress}
              className="flex size-40 items-center justify-center rounded-full border-8 text-lg font-black uppercase tracking-wide transition-colors"
              style={{
                backgroundColor: phase.kind === "go" ? "#22C55E" : "#7F1D1D",
                borderColor: phase.kind === "go" ? "#16A34A" : "#991B1B",
                color: "#fff",
              }}
            >
              {phase.kind === "go" ? "GO!" : "WAIT"}
            </button>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {phase.kind === "go" ? "NOW — tap!" : "Hold... hold..."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
