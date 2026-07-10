"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  buildStaticIndex,
  searchDocs,
  type SearchDoc,
  type SearchDocType,
} from "@/lib/services/search-index";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Flag,
  MapPin,
  ScrollText,
  User,
  Users,
} from "lucide-react";

const TYPE_META: Record<SearchDocType, { label: string; icon: typeof User }> = {
  driver: { label: "Drivers", icon: User },
  team: { label: "Teams", icon: Users },
  circuit: { label: "Circuits", icon: MapPin },
  lesson: { label: "Lessons", icon: BookOpen },
  glossary: { label: "Glossary", icon: ScrollText },
  season: { label: "Seasons", icon: CalendarDays },
  rule: { label: "Rules", icon: FileText },
  page: { label: "Pages", icon: Flag },
};

const GROUP_ORDER: SearchDocType[] = [
  "driver",
  "team",
  "circuit",
  "lesson",
  "glossary",
  "season",
  "rule",
  "page",
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const staticIndex = useMemo(buildStaticIndex, []);

  const dynamicDocs = useQuery({
    queryKey: ["search-dynamic"],
    queryFn: async (): Promise<SearchDoc[]> => {
      const response = await fetch("/api/search-data");
      if (!response.ok) return [];
      return (await response.json()) as SearchDoc[];
    },
    enabled: open,
    staleTime: 30 * 60_000,
  });

  const index = useMemo(
    () => [...(dynamicDocs.data ?? []), ...staticIndex],
    [dynamicDocs.data, staticIndex],
  );

  const results = useMemo(() => searchDocs(index, query), [index, query]);

  const grouped = useMemo(() => {
    const byType = new Map<SearchDocType, SearchDoc[]>();
    for (const doc of results) {
      const list = byType.get(doc.type) ?? [];
      list.push(doc);
      byType.set(doc.type, list);
    }
    return GROUP_ORDER.filter((type) => byType.has(type)).map((type) => ({
      type,
      docs: byType.get(type)!,
    }));
  }, [results]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Global search"
      description="Search drivers, teams, circuits, lessons, glossary, seasons and rules"
    >
      <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search drivers, circuits, lessons, seasons..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {query ? "No results — try a different spelling." : "Start typing to search everything."}
        </CommandEmpty>
        {grouped.map(({ type, docs }) => {
          const meta = TYPE_META[type];
          return (
            <CommandGroup key={type} heading={meta.label}>
              {docs.map((doc) => (
                <CommandItem
                  key={doc.id}
                  value={doc.id}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(doc.href);
                  }}
                >
                  <meta.icon className="size-4 text-muted-foreground" aria-hidden />
                  <span className="font-medium">{doc.title}</span>
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    {doc.subtitle}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
      </Command>
    </CommandDialog>
  );
}
