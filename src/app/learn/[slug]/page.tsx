import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/content/lessons/registry";
import { CATEGORY_LABELS } from "@/content/lessons/types";
import { Section } from "@/components/ui-kit/section";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { LessonDiagram } from "@/components/learn/lesson-diagram";
import { Quiz } from "@/components/learn/quiz";
import { Flashcards } from "@/components/learn/flashcards";
import { MarkCompleteButton } from "@/components/learn/mark-complete-button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Lightbulb, TriangleAlert } from "lucide-react";

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson" };
  return { title: lesson.title, description: lesson.summary };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <p className="mb-2 text-sm text-muted-foreground">
        <Link href="/learn" className="hover:underline">
          Learn F1
        </Link>{" "}
        · {CATEGORY_LABELS[lesson.category]}
      </p>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-editorial text-4xl sm:text-5xl">{lesson.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{lesson.summary}</p>
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden /> {lesson.minutes} min read
            </span>
            <Badge variant="secondary">
              Difficulty {lesson.difficulty}/3
            </Badge>
          </p>
        </div>
        <MarkCompleteButton slug={lesson.slug} />
      </div>

      <article className="space-y-10">
        {lesson.sections.map((section) => (
          <FadeIn key={section.heading}>
            <section>
              <h2 className="heading-editorial mb-3 text-2xl">{section.heading}</h2>
              <div className="space-y-4 leading-relaxed">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              {section.diagram ? <LessonDiagram id={section.diagram} /> : null}
            </section>
          </FadeIn>
        ))}
      </article>

      <Section title="Key takeaways">
        <ul className="glass-panel space-y-2 rounded-xl p-5">
          {lesson.takeaways.map((takeaway) => (
            <li key={takeaway} className="flex gap-2 text-sm leading-relaxed">
              <span aria-hidden className="text-primary">▸</span>
              {takeaway}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Common misconceptions">
        <div className="space-y-3">
          {lesson.misconceptions.map((misconception) => (
            <div key={misconception.myth} className="glass-panel rounded-xl p-5">
              <p className="flex gap-2 text-sm font-medium">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
                Myth: {misconception.myth}
              </p>
              <p className="mt-2 pl-6 text-sm text-muted-foreground">
                Reality: {misconception.reality}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Interesting facts">
        <ul className="glass-panel carbon-texture space-y-2 rounded-xl p-5">
          {lesson.facts.map((fact) => (
            <li key={fact} className="flex gap-2 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
              {fact}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Check your understanding">
        <Quiz questions={lesson.quiz} />
      </Section>

      <Section title="Flashcards">
        <div className="mx-auto max-w-md">
          <Flashcards cards={lesson.flashcards} />
        </div>
      </Section>

      {lesson.next.length > 0 ? (
        <Section title="Keep going">
          <div className="grid gap-4 sm:grid-cols-2">
            {lesson.next.map((nextSlug) => {
              const nextLesson = getLesson(nextSlug);
              if (!nextLesson) return null;
              return (
                <Link
                  key={nextSlug}
                  href={`/learn/${nextSlug}`}
                  className="glass-panel group flex items-center justify-between gap-3 rounded-xl p-5 hover:shadow-md"
                >
                  <div>
                    <p className="font-bold group-hover:underline">{nextLesson.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{nextLesson.summary}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
                </Link>
              );
            })}
          </div>
        </Section>
      ) : null}
    </main>
  );
}
