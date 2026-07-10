"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getGlossaryEntry } from "@/content/glossary/glossary";

/** Inline glossary term with a hoverable/focusable definition. */
export function GlossaryTooltip({
  term,
  children,
}: {
  term: string;
  children?: React.ReactNode;
}) {
  const entry = getGlossaryEntry(term);
  if (!entry) return <>{children ?? term}</>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="cursor-help underline decoration-dotted underline-offset-4"
        >
          {children ?? term}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-72 text-sm">{entry.definition}</TooltipContent>
    </Tooltip>
  );
}
