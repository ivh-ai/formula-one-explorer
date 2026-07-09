import Link from "next/link";
import {
  getConstructorStandings,
  getDriverStandings,
  getSchedule,
} from "@/lib/api/jolpica";
import { getNextRace } from "@/lib/utils/countdown";
import { CURRENT_SEASON, FIRST_SEASON } from "@/lib/utils/season";
import { Hero } from "@/components/home/hero";
import { NextRacePanel } from "@/components/home/next-race-panel";
import { LeadersPanel } from "@/components/home/leaders-panel";
import { FactStrip } from "@/components/home/fact-strip";
import { Section } from "@/components/ui-kit/section";
import { StatCard } from "@/components/ui-kit/stat-card";
import { ErrorNote } from "@/components/ui-kit/error-note";
import { FadeIn } from "@/components/ui-kit/fade-in";
import { ArrowRight, BookOpen, Flag, Radio, Timer } from "lucide-react";

const FEATURED_LESSONS = [
  {
    slug: "intro-to-f1",
    title: "Introduction to Formula One",
    blurb: "What F1 is, how a season works, and why 20 cars matter to millions.",
    icon: BookOpen,
  },
  {
    slug: "race-weekend",
    title: "The Race Weekend",
    blurb: "Practice, qualifying, and the Grand Prix — how three days fit together.",
    icon: Timer,
  },
  {
    slug: "flags",
    title: "Flags & Race Control",
    blurb: "Yellow, red, blue and the Safety Car: how races are managed.",
    icon: Flag,
  },
  {
    slug: "race-strategy",
    title: "Race Strategy",
    blurb: "Tires, pit windows, undercuts — the chess game beneath the racing.",
    icon: Radio,
  },
];

export default async function HomePage() {
  const year = CURRENT_SEASON;
  const [schedule, driverStandings, constructorStandings] = await Promise.all([
    getSchedule(year),
    getDriverStandings(year),
    getConstructorStandings(year),
  ]);

  const nextRace = schedule.ok ? getNextRace(schedule.data, new Date()) : null;
  const racesThisSeason = schedule.ok ? schedule.data.length : 0;
  const factIndex = new Date().getUTCDate() % 24;

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Section title="Right now in Formula One">
          <div className="space-y-4">
            {nextRace ? (
              <FadeIn>
                <NextRacePanel race={nextRace} />
              </FadeIn>
            ) : schedule.ok ? null : (
              <ErrorNote context="the race schedule" error={schedule.error} />
            )}

            {driverStandings.ok && constructorStandings.ok ? (
              driverStandings.data.length > 0 ? (
                <FadeIn delay={0.1}>
                  <LeadersPanel
                    drivers={driverStandings.data}
                    constructors={constructorStandings.data}
                    year={year}
                  />
                </FadeIn>
              ) : null
            ) : (
              <ErrorNote context="championship standings" />
            )}
          </div>
        </Section>

        <Section
          title="The season in numbers"
          lead={`${year} at a glance — and three-quarters of a century of racing behind it.`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Races this season" value={racesThisSeason} accentColor="#E8002D" />
            <StatCard
              label="Championship seasons"
              value={CURRENT_SEASON - FIRST_SEASON + 1}
              accentColor="#FF8000"
            />
            <StatCard label="Teams on the grid" value={11} accentColor="#27F4D2" />
            <StatCard label="Drivers racing" value={22} accentColor="#3671C6" />
          </div>
        </Section>

        <Section
          title="New to Formula One?"
          lead="A structured, interactive course — start anywhere, no prior knowledge needed."
          href="/learn"
          hrefLabel="All lessons"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_LESSONS.map((lesson, index) => (
              <FadeIn key={lesson.slug} delay={index * 0.06}>
                <Link
                  href={`/learn/${lesson.slug}`}
                  className="glass-panel group flex h-full flex-col rounded-xl p-5 transition-shadow hover:shadow-md"
                >
                  <lesson.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-3 font-bold leading-snug group-hover:underline">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{lesson.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Start lesson <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Section>

        <Section title="Did you know?">
          <FactStrip initialIndex={factIndex} />
        </Section>

        <Section
          title="Go deeper"
          lead="Explore the archive, compare the greats, or watch the timing screens."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/seasons"
              className="glass-panel carbon-texture group rounded-xl p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold group-hover:underline">Season archive</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Every championship from {FIRST_SEASON} to today — results, standings and stories.
              </p>
            </Link>
            <Link
              href="/compare"
              className="glass-panel carbon-texture group rounded-xl p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold group-hover:underline">Compare drivers</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Senna vs. Prost, Hamilton vs. Verstappen — settle it with data.
              </p>
            </Link>
            <Link
              href="/live"
              className="glass-panel carbon-texture group rounded-xl p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold group-hover:underline">Live Race Center</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Leaderboards, tires, flags and pit stops — live when sessions run.
              </p>
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}
