import { describe, expect, it } from "vitest";
import { buildStaticIndex, searchDocs, type SearchDoc } from "@/lib/services/search-index";

describe("buildStaticIndex", () => {
  const index = buildStaticIndex();

  it("indexes lessons, glossary, circuits, rules, seasons and pages", () => {
    const types = new Set(index.map((doc) => doc.type));
    for (const type of ["lesson", "glossary", "circuit", "rule", "season", "page"]) {
      expect(types.has(type as SearchDoc["type"]), type).toBe(true);
    }
    expect(index.length).toBeGreaterThan(200);
  });

  it("has unique ids", () => {
    const ids = new Set(index.map((doc) => doc.id));
    expect(ids.size).toBe(index.length);
  });
});

describe("searchDocs", () => {
  const index: SearchDoc[] = [
    { id: "1", type: "page", title: "Monaco", subtitle: "", href: "/a", keywords: [] },
    { id: "2", type: "page", title: "Autodromo Monza", subtitle: "", href: "/b", keywords: [] },
    { id: "3", type: "page", title: "Monza", subtitle: "", href: "/c", keywords: [] },
    { id: "4", type: "page", title: "Silverstone", subtitle: "British circuit", href: "/d", keywords: ["monza rival"] },
  ];

  it("ranks prefix matches above substring matches above keyword hits", () => {
    const results = searchDocs(index, "monza");
    expect(results.map((doc) => doc.id)).toEqual(["3", "2", "4"]);
  });

  it("returns empty for empty queries", () => {
    expect(searchDocs(index, "")).toEqual([]);
    expect(searchDocs(index, "   ")).toEqual([]);
  });

  it("caps results at 20", () => {
    const big = Array.from({ length: 40 }, (_, i) => ({
      id: String(i),
      type: "page" as const,
      title: `Race ${i}`,
      subtitle: "",
      href: "/",
      keywords: [],
    }));
    expect(searchDocs(big, "race")).toHaveLength(20);
  });
});
