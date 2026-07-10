/** The lesson content model for the Learn platform. */

export type DiagramId =
  | "downforce"
  | "drs"
  | "ers-flow"
  | "tire-compounds"
  | "race-weekend"
  | "pit-stop"
  | "flags"
  | "points-table"
  | "qualifying-format"
  | "circuit-anatomy";

export type LessonCategory =
  | "foundations"
  | "machinery"
  | "race-craft"
  | "rules"
  | "deep-dives";

export type LessonSection = {
  heading: string;
  /** Paragraphs of body prose. */
  body: string[];
  diagram?: DiagramId;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Lesson = {
  slug: string;
  title: string;
  category: LessonCategory;
  difficulty: 1 | 2 | 3;
  minutes: number;
  summary: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  flashcards: { front: string; back: string }[];
  takeaways: string[];
  misconceptions: { myth: string; reality: string }[];
  facts: string[];
  /** Slugs of suggested next lessons. */
  next: string[];
};

export const CATEGORY_LABELS: Record<LessonCategory, string> = {
  foundations: "Foundations",
  machinery: "The Machinery",
  "race-craft": "Race Craft",
  rules: "Rules & Governance",
  "deep-dives": "Deep Dives",
};
