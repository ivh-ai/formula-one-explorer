import { describe, expect, it } from "vitest";
import { LESSONS, getLesson } from "@/content/lessons/registry";

describe("lesson registry integrity", () => {
  it("contains 22 lessons with unique slugs", () => {
    expect(LESSONS.length).toBe(22);
    const slugs = new Set(LESSONS.map((lesson) => lesson.slug));
    expect(slugs.size).toBe(LESSONS.length);
  });

  it("every lesson meets the content bar", () => {
    for (const lesson of LESSONS) {
      const label = lesson.slug;
      expect(lesson.sections.length, `${label} sections`).toBeGreaterThanOrEqual(3);
      for (const section of lesson.sections) {
        expect(section.body.length, `${label} section body`).toBeGreaterThanOrEqual(1);
      }
      expect(lesson.quiz.length, `${label} quiz`).toBeGreaterThanOrEqual(4);
      for (const question of lesson.quiz) {
        expect(question.options.length, `${label} quiz options`).toBeGreaterThanOrEqual(3);
        expect(question.answerIndex, `${label} answerIndex`).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex, `${label} answerIndex`).toBeLessThan(
          question.options.length,
        );
        expect(question.explanation.length, `${label} explanation`).toBeGreaterThan(10);
      }
      expect(lesson.flashcards.length, `${label} flashcards`).toBeGreaterThanOrEqual(4);
      expect(lesson.takeaways.length, `${label} takeaways`).toBeGreaterThanOrEqual(3);
      expect(lesson.misconceptions.length, `${label} misconceptions`).toBeGreaterThanOrEqual(1);
      expect(lesson.facts.length, `${label} facts`).toBeGreaterThanOrEqual(2);
      expect(lesson.minutes, `${label} minutes`).toBeGreaterThanOrEqual(3);
    }
  });

  it("every next[] reference resolves to a real lesson", () => {
    for (const lesson of LESSONS) {
      for (const nextSlug of lesson.next) {
        expect(getLesson(nextSlug), `${lesson.slug} → ${nextSlug}`).toBeDefined();
      }
    }
  });
});
