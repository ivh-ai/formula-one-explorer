"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLessonProgress } from "@/lib/hooks/lesson-progress";

export function MarkCompleteButton({ slug }: { slug: string }) {
  const { completed, toggleComplete } = useLessonProgress();
  const isDone = completed.has(slug);

  return (
    <Button
      variant={isDone ? "default" : "outline"}
      onClick={() => toggleComplete(slug)}
      className="gap-2"
    >
      {isDone ? (
        <>
          <CheckCircle2 className="size-4" aria-hidden /> Completed
        </>
      ) : (
        <>
          <Circle className="size-4" aria-hidden /> Mark as complete
        </>
      )}
    </Button>
  );
}
