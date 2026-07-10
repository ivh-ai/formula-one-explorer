import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS, lessonsByCategory, BEGINNER_PATH, getLesson } from "@/content/lessons/registry";
import { CATEGORY_LABELS, type LessonCategory } from "@/content/lessons/types";
import { PageHeader } from "@/components/ui-kit/page-header";
import { Section } from "@/components/ui-kit/section";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { LessonCard } from "@/components/learn/lesson-card";

export const metadata: Metadata = {
  title: "Learn Formula One",
  description:
    "An interactive Formula One course: 22 lessons with diagrams, quizzes and flashcards — from your first race to technical mastery.",
};

const CATEGORY_ORDER: LessonCategory[] = [
  "foundations",
  "machinery",
  "race-craft",
  "rules",
  "deep-dives",
];

export default function LearnPage() {
  const totalMinutes = LESSONS.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Learn Formula One"
        lead={`An interactive course of ${LESSONS.length} lessons — about ${Math.round(totalMinutes / 60)} hours of diagrams, quizzes and flashcards. Start from zero or jump to any topic.`}
      />

      <Section
        title="The beginner's path"
        lead="Never watched a race? Take these in order and you'll understand everything by Sunday."
      >
        <ol className="flex flex-wrap items-center gap-2">
          {BEGINNER_PATH.map((slug, index) => {
            const lesson = getLesson(slug);
            if (!lesson) return null;
            return (
              <li key={slug} className="flex items-center gap-2">
                <Link
                  href={`/learn/${slug}`}
                  className="glass-panel rounded-full px-4 py-1.5 text-sm font-medium hover:shadow-md"
                >
                  <span className="timing-mono mr-1.5 text-muted-foreground">{index + 1}</span>
                  {lesson.title}
                </Link>
                {index < BEGINNER_PATH.length - 1 ? (
                  <span aria-hidden className="text-muted-foreground">→</span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </Section>

      {CATEGORY_ORDER.map((category, categoryIndex) => (
        <Section key={category} title={CATEGORY_LABELS[category]}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessonsByCategory(category).map((lesson, index) => (
              <FadeIn key={lesson.slug} delay={Math.min(index * 0.04 + categoryIndex * 0.02, 0.3)}>
                <LessonCard lesson={lesson} />
              </FadeIn>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}
