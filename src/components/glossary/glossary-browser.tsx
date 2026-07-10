"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GLOSSARY, type GlossaryCategory } from "@/content/glossary/glossary";
import { EmptyState } from "@/components/ui-kit/empty-state";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: GlossaryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "racing", label: "Racing" },
  { id: "technical", label: "Technical" },
  { id: "strategy", label: "Strategy" },
  { id: "rules", label: "Rules" },
  { id: "culture", label: "Culture" },
];

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return GLOSSARY.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false;
      if (!lower) return true;
      return (
        entry.term.toLowerCase().includes(lower) ||
        entry.definition.toLowerCase().includes(lower)
      );
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  const grouped = useMemo(() => {
    const byLetter = new Map<string, typeof filtered>();
    for (const entry of filtered) {
      const letter = entry.term[0].toUpperCase();
      const list = byLetter.get(letter) ?? [];
      list.push(entry);
      byLetter.set(letter, list);
    }
    return [...byLetter.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${GLOSSARY.length} terms...`}
            className="pl-9"
            aria-label="Search glossary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setCategory(entry.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                category === entry.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-accent",
              )}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <EmptyState
          title="No matching terms"
          message="Try a different spelling or clear the category filter."
        />
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, entries]) => (
            <section key={letter} aria-labelledby={`letter-${letter}`}>
              <h2
                id={`letter-${letter}`}
                className="heading-editorial mb-3 text-2xl text-muted-foreground"
              >
                {letter}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {entries.map((entry) => (
                  <div key={entry.slug} id={entry.slug} className="glass-panel rounded-xl p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold">{entry.term}</h3>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {entry.category}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {entry.definition}
                    </p>
                    {entry.related.length > 0 ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        See also:{" "}
                        {entry.related.map((related, index) => (
                          <span key={related}>
                            {index > 0 ? ", " : ""}
                            <a href={`#${related}`} className="underline hover:text-foreground">
                              {related.replaceAll("-", " ")}
                            </a>
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
