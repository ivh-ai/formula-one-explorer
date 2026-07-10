# Formula One Explorer

The definitive destination for learning, exploring and following Formula One —
an interactive course for newcomers and a live/historical data companion for
fans. Built with Next.js, running entirely on free, keyless public APIs:
clone it and `npm run dev`, no accounts or secrets required.

## Features

- **Learn Formula One** — an interactive 22-lesson course (foundations,
  machinery, race craft, rules, deep dives) with SVG diagrams, quizzes,
  flashcards, key takeaways and misconception-busting. Progress is saved
  locally.
- **Live Race Center** — live leaderboard with gaps, intervals, tires and pit
  stops, race-control flag feed, trackside weather and team radio. Polls every
  4 seconds during sessions and gracefully replays the latest completed
  session in between, with a clear LIVE / REPLAY status badge.
- **Season archive, 1950–present** — every championship: calendars, race /
  qualifying / sprint results, standings, and editorial notes on landmark
  seasons.
- **Drivers & teams** — profiles for the current grid and the legends: career
  statistics computed from full race history, bios, driving styles, rivalries
  and season-by-season breakdowns.
- **Circuits** — animated SVG track maps with DRS zones, corner-by-corner
  guides, strategy notes, live weather forecasts and past winners for the full
  current calendar.
- **Standings & statistics** — championship tables with cumulative points
  progression charts, all-time record boards, and the current season in
  numbers.
- **Interactive tools** — driver comparison with normalized radar charts, a
  championship permutation simulator, a two-strategy tire model, and a pit
  stop reaction game.
- **Global search** — ⌘K command palette across drivers, teams, circuits,
  lessons, glossary (100+ terms), rules and every season.
- **History** — the sport's ten eras as an editorial timeline with defining
  cars, drivers and moments.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Other commands:

```bash
npm run build     # production build
npm test          # unit tests (Vitest)
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
```

## Architecture

- **Framework** — Next.js (App Router, React Server Components), strict
  TypeScript, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion), Recharts.
- **Data layer** (`src/lib/api/`) — a resilient `fetchJson` wrapper (timeout,
  retry with backoff, typed `ApiResult` errors) beneath three clients:
  - [Jolpica](https://jolpi.ca) (Ergast successor): all seasons since 1950 —
    schedules, results, standings, drivers, constructors, circuits.
  - [OpenF1](https://openf1.org): live session data — positions, intervals,
    laps, stints, pits, race control, weather, radio.
  - [Open-Meteo](https://open-meteo.com): circuit weather forecasts.
- **Caching** — tiered Next.js fetch revalidation: completed seasons are
  cached indefinitely (immutable), current-season data revalidates hourly,
  schedules every 15 minutes, live data is polled client-side via TanStack
  Query. There is no database.
- **Domain models** (`src/lib/models/`) — raw API shapes never leave the API
  layer; pages consume typed domain models only.
- **Content** (`src/content/`) — all editorial material (lessons, glossary,
  circuit guides, track SVGs, team/driver enrichment, historical notes) ships
  as typed TypeScript modules, validated by unit tests.
- **Business logic** (`src/lib/services/`) — championship math, career
  aggregation, leaderboard building, simulators and search — all unit tested.

## Accessibility & performance

- Keyboard-navigable throughout, including the command palette and quizzes.
- All animation respects `prefers-reduced-motion` plus an in-app toggle.
- Skeleton loaders and inline degraded-state notices on every async surface;
  API failures never take down a whole page.
- Historical pages are statically generated or cached indefinitely.

## Data attribution

Data courtesy of the Jolpica F1, OpenF1 and Open-Meteo public APIs. Flags by
flagcdn. This is an unofficial fan project, not associated with Formula 1
companies. F1 and related marks are trademarks of Formula One Licensing B.V.
