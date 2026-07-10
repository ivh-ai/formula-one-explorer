import { describe, expect, it } from "vitest";
import { GLOSSARY, getGlossaryEntry } from "@/content/glossary/glossary";

describe("glossary", () => {
  it("has at least 100 entries with unique slugs", () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(100);
    const slugs = new Set(GLOSSARY.map((entry) => entry.slug));
    expect(slugs.size).toBe(GLOSSARY.length);
  });

  it("every related reference resolves to a real entry", () => {
    for (const entry of GLOSSARY) {
      for (const related of entry.related) {
        expect(getGlossaryEntry(related), `${entry.slug} → ${related}`).toBeDefined();
      }
    }
  });

  it("looks up by term or slug, case-insensitively", () => {
    expect(getGlossaryEntry("DRS")?.slug).toBe("drs");
    expect(getGlossaryEntry("dirty-air")?.term).toBe("Dirty air");
    expect(getGlossaryEntry("Dirty Air")?.slug).toBe("dirty-air");
    expect(getGlossaryEntry("nonexistent")).toBeUndefined();
  });

  it("every definition is substantial", () => {
    for (const entry of GLOSSARY) {
      expect(entry.definition.length, entry.slug).toBeGreaterThan(40);
    }
  });
});
