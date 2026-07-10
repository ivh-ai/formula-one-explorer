import type { Lesson, LessonCategory } from "@/content/lessons/types";
import { FOUNDATIONS_LESSONS } from "@/content/lessons/foundations";
import { RACE_CRAFT_LESSONS } from "@/content/lessons/race-craft";
import { MACHINERY_LESSONS } from "@/content/lessons/machinery";
import { RULES_LESSONS } from "@/content/lessons/rules";
import { DEEP_DIVE_LESSONS } from "@/content/lessons/deep-dives";

export const LESSONS: Lesson[] = [
  ...FOUNDATIONS_LESSONS,
  ...RACE_CRAFT_LESSONS,
  ...MACHINERY_LESSONS,
  ...RULES_LESSONS,
  ...DEEP_DIVE_LESSONS,
];

const BY_SLUG = new Map(LESSONS.map((lesson) => [lesson.slug, lesson]));

export function getLesson(slug: string): Lesson | undefined {
  return BY_SLUG.get(slug);
}

export function lessonsByCategory(category: LessonCategory): Lesson[] {
  return LESSONS.filter((lesson) => lesson.category === category);
}

/** The recommended order for beginners: foundations first, then outward. */
export const BEGINNER_PATH: string[] = [
  "intro-to-f1",
  "race-weekend",
  "qualifying",
  "championship-points",
  "flags",
  "cars",
  "tires",
  "pit-stops",
  "race-strategy",
];
