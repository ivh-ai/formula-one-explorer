"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion } from "@/content/lessons/types";
import { cn } from "@/lib/utils";

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const reduced = useReducedMotion();

  const question = questions[index];
  const answered = selected !== null;

  const choose = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.answerIndex) setScore((value) => value + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="glass-panel rounded-xl p-6 text-center">
        <p className="text-4xl">{percent >= 80 ? "🏆" : percent >= 50 ? "🏁" : "🔧"}</p>
        <h3 className="mt-2 text-xl font-bold">
          {score} / {questions.length} correct
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {percent >= 80
            ? "Podium finish — you've mastered this topic."
            : percent >= 50
              ? "Solid points finish. One more read and you'll have it."
              : "Back to the garage — skim the lesson again and retry."}
        </p>
        <Button onClick={restart} variant="outline" className="mt-4">
          Retake quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="mb-4 flex items-center gap-3">
        <Progress value={(index / questions.length) * 100} className="h-1.5" />
        <span className="timing-mono shrink-0 text-xs text-muted-foreground">
          {index + 1}/{questions.length}
        </span>
      </div>
      <motion.div
        key={index}
        initial={reduced ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="font-semibold leading-snug">{question.question}</h3>
        <div className="mt-4 space-y-2" role="group" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === question.answerIndex;
            const isSelected = optionIndex === selected;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(optionIndex)}
                disabled={answered}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  !answered && "hover:border-primary hover:bg-accent",
                  answered && isCorrect && "border-green-500 bg-green-500/10",
                  answered && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                  answered && !isSelected && !isCorrect && "opacity-60",
                )}
              >
                <span>{option}</span>
                {answered && isCorrect ? (
                  <CheckCircle2 className="size-4 shrink-0 text-green-600" aria-label="Correct" />
                ) : answered && isSelected ? (
                  <XCircle className="size-4 shrink-0 text-red-500" aria-label="Incorrect" />
                ) : null}
              </button>
            );
          })}
        </div>
        {answered ? (
          <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium">
              {selected === question.answerIndex ? "Correct!" : "Not quite."}
            </p>
            <p className="mt-1 text-muted-foreground">{question.explanation}</p>
            <Button onClick={next} size="sm" className="mt-3">
              {index + 1 >= questions.length ? "See results" : "Next question"}
            </Button>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
