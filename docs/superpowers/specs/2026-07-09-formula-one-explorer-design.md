# Formula One Explorer — Design Spec

**Date:** 2026-07-09
**Status:** Approved by user

## Vision

A production-ready web application that serves as both an interactive learning
platform for Formula One newcomers and a live/historical data companion for
experienced fans. Premium neutral aesthetic (Apple × F1.com × Bloomberg
Terminal), rich data visualization, and a structured educational course — all
running locally with zero account setup.

## Approved Decisions

1. **Keyless public APIs, no database.** Jolpica (historical + current data),
   OpenF1 (live sessions), Open-Meteo (weather). Next.js server-side fetch
   caching replaces Supabase/PostgreSQL/Prisma. Custom SVG track maps replace
   Mapbox. Rationale: the app runs immediately with `npm run dev`; no secrets
   to provision. Supabase can be added later if user accounts are needed.
2. **Full PRD scope, built in phases** (see Build Phases).

## Stack

- Next.js 15 (App Router, React Server Components), TypeScript strict
- Tailwind CSS v4, shadcn/ui, Framer Motion (`motion` package)
- TanStack Query — client-side polling for live data only
- Recharts for charts; hand-built SVG for track maps and diagrams
- Vitest for unit tests

## Architecture

### Data layer (`src/lib/api/`)

A shared `fetchJson` wrapper provides timeout, retry with exponential backoff,
and typed error results (`ApiResult<T> = { ok: true, data } | { ok: false,
error }`). Three clients sit on top:

- **`jolpica.ts`** — seasons 1950–present, race/qualifying/sprint results,
  driver & constructor standings, drivers, constructors, circuits, schedules.
  Rate limit ~500 req/hr ⇒ tiered Next.js cache revalidation:
  - historical seasons (year < current): `revalidate: false` (immutable)
  - current season lists/standings: 1 hour
  - next-race / schedule data: 15 minutes
- **`openf1.ts`** — live session data: driver positions, intervals, laps, pit
  stops, tire stints, race control (flags, SC/VSC, red flag), session weather,
  team radio. Polled client-side (TanStack Query, ~4s interval) only while a
  session is live. No live session ⇒ Live Race Center replays/summarizes the
  most recent completed session with a clearly labeled data-status badge
  (LIVE / REPLAY / CACHED / UNAVAILABLE).
- **`weather.ts`** — Open-Meteo forecast by circuit lat/lng for circuit pages
  and upcoming race weekends.

Mappers convert raw API shapes into domain models (`src/lib/models/`); all
downstream code consumes domain models only.

### Static content (`src/content/`)

Typed TypeScript data modules:

- **Lessons** — 22 learning modules (intro, race weekend, cars, aero, power
  units, ERS, DRS, tires, pit stops, flags, qualifying, sprint, points,
  strategy, weather, safety, engineering, tech regs, sporting regs, stewards,
  history, future). Each: ordered sections with prose + SVG diagrams, quiz
  (4–6 questions), flashcards, key takeaways, misconceptions, fun facts,
  suggested next lessons.
- **Glossary** — ~100 terms; glossary tooltips usable inline anywhere.
- **Rules** — sporting/technical/points explainers.
- **Circuit guides** — for every current-calendar circuit: SVG track path,
  corner-by-corner notes, DRS zones, elevation notes, overtaking spots,
  strategy/tire notes, lap record, past winners context.
- **Team & driver enrichment** — bios, facts, rivalries, team colors, keyed by
  Jolpica IDs; merged with API data at render time. Unknown IDs degrade
  gracefully (API data only).
- **Historical moments** — notable-moment blurbs per era/season for the
  History section.

### Routing (`src/app/`)

| Route | Purpose |
|---|---|
| `/` | Animated hero, next-race countdown, championship leaders, featured content |
| `/learn`, `/learn/[slug]` | Course hub + lesson pages with quizzes/flashcards |
| `/seasons`, `/seasons/[year]`, `/seasons/[year]/[round]` | Archive 1950–present; current season is just the current year |
| `/standings/drivers`, `/standings/constructors` | Standings with year selector + progression charts |
| `/drivers`, `/drivers/[id]` | Grid + profile (career stats, results, bio) |
| `/teams`, `/teams/[id]` | Grid + team page (history, drivers, titles) |
| `/circuits`, `/circuits/[id]` | Grid + circuit page (SVG map, guide, weather, winners) |
| `/calendar` | Season calendar with countdowns and status |
| `/live` | Live Race Center |
| `/history` | Era timeline, champions by decade, notable moments |
| `/rules`, `/glossary` | Reference sections |
| `/compare` | Driver vs driver, team vs team comparison |
| `/simulators` | Championship points simulator, tire strategy visualizer, pit stop simulator |
| `/stats` | Statistics explorer (all-time leaders, records) |
| `/settings` | Theme, reduced motion, data preferences (localStorage) |

Global search: Cmd+K command palette over a client-side index (drivers, teams,
circuits, lessons, glossary, seasons, rules).

### Design system

- Neutral premium palette: white/light-gray light mode, carbon dark mode;
  glass panels (backdrop-blur), subtle carbon-fiber texture accents, rounded
  corners, soft shadows.
- One accent token per team (Ferrari red, McLaren papaya, Mercedes teal, Red
  Bull blue, Aston green, Alpine pink, Williams blue…) used for chart series,
  team surfaces, highlights — sparingly.
- Typography: Geist Sans / Geist Mono (timing data), large editorial headings.
- Motion: Framer Motion page/element transitions, counters, shimmer skeletons;
  all gated behind `prefers-reduced-motion` + settings toggle.
- Every async surface has a skeleton loader and an empty/error state.

### Error handling

- All API calls return `ApiResult<T>`; pages render partial data with inline
  degraded-state notices rather than failing whole-page.
- Route-level `error.tsx` and `loading.tsx` throughout.
- Live Center: status badge + automatic fallback chain (live → last session →
  static message).

### Testing & verification

Vitest unit tests for business logic: API mappers, points/championship math,
search index, simulator engines, countdown/time utilities. Verification gate
per phase: `tsc --noEmit`, ESLint, `next build`, tests green.

## Build Phases

1. Scaffold (Next.js + Tailwind + shadcn/ui + fonts) + design tokens + nav
   shell + settings + theme
2. Data layer: fetch wrapper, Jolpica/OpenF1/weather clients, domain models,
   mappers + tests
3. Core pages: home, calendar, standings, drivers, teams, circuits, seasons
4. Historical archive depth + stats explorer
5. Learning platform: 22 lessons, quizzes, flashcards, glossary, rules
6. Live Race Center
7. Interactive tools: compare, simulators, global search
8. Polish: accessibility (WCAG AA), performance, responsive audit, animations

## Out of Scope

- User accounts, auth, or any persisted user data beyond localStorage
- Mapbox/Three.js 3D circuit visualization (SVG maps instead; 3D noted as a
  future enhancement)
- Team radio audio playback (OpenF1 radio listed as links/summaries only)
- Photo galleries requiring licensed imagery (use SVG illustration + flags
  from flagcdn instead)
