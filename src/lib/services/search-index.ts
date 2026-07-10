/** Client-side global search index over static content + current grid. */
import { LESSONS } from "@/content/lessons/registry";
import { GLOSSARY } from "@/content/glossary/glossary";
import { CIRCUIT_GUIDES } from "@/content/circuits/circuit-guides";
import { RULE_SECTIONS } from "@/content/rules/rules";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { getChampion } from "@/content/history/champions";

export type SearchDocType =
  | "driver"
  | "team"
  | "circuit"
  | "lesson"
  | "glossary"
  | "season"
  | "rule"
  | "page";

export type SearchDoc = {
  id: string;
  type: SearchDocType;
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
};

const STATIC_PAGES: SearchDoc[] = [
  { id: "page-live", type: "page", title: "Live Race Center", subtitle: "Live timing and flags", href: "/live", keywords: ["timing", "leaderboard", "live"] },
  { id: "page-standings-d", type: "page", title: "Driver Standings", subtitle: "The championship table", href: "/standings/drivers", keywords: ["championship", "points"] },
  { id: "page-standings-c", type: "page", title: "Constructors Championship", subtitle: "The team standings", href: "/standings/constructors", keywords: ["teams", "points"] },
  { id: "page-calendar", type: "page", title: "Race Calendar", subtitle: "Every race weekend", href: "/calendar", keywords: ["schedule", "countdown"] },
  { id: "page-history", type: "page", title: "History", subtitle: "Eras and champions", href: "/history", keywords: ["eras", "timeline"] },
  { id: "page-compare", type: "page", title: "Compare Drivers", subtitle: "Head-to-head analysis", href: "/compare", keywords: ["versus", "vs", "comparison"] },
  { id: "page-simulators", type: "page", title: "Simulators", subtitle: "Championship, strategy, pit stops", href: "/simulators", keywords: ["game", "strategy", "simulator"] },
  { id: "page-stats", type: "page", title: "Statistics", subtitle: "Records and numbers", href: "/stats", keywords: ["records", "all-time"] },
  { id: "page-settings", type: "page", title: "Settings", subtitle: "Theme and preferences", href: "/settings", keywords: ["theme", "dark mode", "motion"] },
];

/** Static portion of the index (content that ships with the app). */
export function buildStaticIndex(): SearchDoc[] {
  const lessons: SearchDoc[] = LESSONS.map((lesson) => ({
    id: `lesson-${lesson.slug}`,
    type: "lesson",
    title: lesson.title,
    subtitle: lesson.summary,
    href: `/learn/${lesson.slug}`,
    keywords: [lesson.category, "lesson", "learn"],
  }));

  const glossary: SearchDoc[] = GLOSSARY.map((entry) => ({
    id: `glossary-${entry.slug}`,
    type: "glossary",
    title: entry.term,
    subtitle: entry.definition.slice(0, 90),
    href: `/glossary#${entry.slug}`,
    keywords: [entry.category, "glossary", "term"],
  }));

  const circuits: SearchDoc[] = Object.values(CIRCUIT_GUIDES).map((guide) => ({
    id: `circuit-${guide.circuitId}`,
    type: "circuit",
    title: guide.circuitId
      .split("_")
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(" "),
    subtitle: `${guide.lengthKm} km · ${guide.corners} corners`,
    href: `/circuits/${guide.circuitId}`,
    keywords: ["circuit", "track"],
  }));

  const rules: SearchDoc[] = RULE_SECTIONS.map((section) => ({
    id: `rule-${section.id}`,
    type: "rule",
    title: section.title,
    subtitle: section.summary,
    href: `/rules#rules-${section.id}`,
    keywords: ["rules", "regulations"],
  }));

  const seasons: SearchDoc[] = [];
  for (let year = CURRENT_SEASON; year >= FIRST_SEASON; year -= 1) {
    const champion = getChampion(year);
    seasons.push({
      id: `season-${year}`,
      type: "season",
      title: `${year} Season`,
      subtitle: champion ? `Champion: ${champion.driver}` : "In progress",
      href: `/seasons/${year}`,
      keywords: ["season", "archive", champion?.driver ?? ""],
    });
  }

  return [...STATIC_PAGES, ...lessons, ...glossary, ...circuits, ...rules, ...seasons];
}

/**
 * Ranked substring search: exact-prefix title matches first, then title
 * substrings, then subtitle/keyword hits. Max 20 results.
 */
export function searchDocs(index: SearchDoc[], query: string): SearchDoc[] {
  const lower = query.trim().toLowerCase();
  if (!lower) return [];

  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of index) {
    const title = doc.title.toLowerCase();
    let score = 0;
    if (title.startsWith(lower)) {
      score = 3;
    } else if (title.includes(lower)) {
      score = 2;
    } else if (
      doc.subtitle.toLowerCase().includes(lower) ||
      doc.keywords.some((keyword) => keyword.toLowerCase().includes(lower))
    ) {
      score = 1;
    }
    if (score > 0) scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, 20)
    .map((entry) => entry.doc);
}
