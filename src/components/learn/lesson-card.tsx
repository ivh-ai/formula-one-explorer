"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import type { Lesson } from "@/content/lessons/types";
import { useLessonProgress } from "@/lib/hooks/lesson-progress";
import { cn } from "@/lib/utils";

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            dot <= level ? "bg-primary" : "bg-muted-foreground/30",
          )}
        />
      ))}
    </span>
  );
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { completed } = useLessonProgress();
  const isDone = completed.has(lesson.slug);

  return (
    <Link
      href={`/learn/${lesson.slug}`}
      className="glass-panel group flex h-full flex-col rounded-xl p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <DifficultyDots level={lesson.difficulty} />
        {isDone ? (
          <CheckCircle2 className="size-4 text-green-600" aria-label="Completed" />
        ) : null}
      </div>
      <h3 className="mt-2 font-bold leading-snug group-hover:underline">{lesson.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{lesson.summary}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3" aria-hidden /> {lesson.minutes} min ·{" "}
        {lesson.quiz.length}-question quiz
      </p>
    </Link>
  );
}
