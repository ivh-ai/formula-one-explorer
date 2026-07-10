# Formula One Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full Formula One Explorer app per the approved spec (docs/superpowers/specs/2026-07-09-formula-one-explorer-design.md): learning platform + live race center + 1950–present archive + teams/drivers/circuits + interactive tools, running keyless with `npm run dev`.

**Architecture:** Next.js App Router with RSC-first data fetching against Jolpica (tiered cache), client-side TanStack Query polling against OpenF1 for live data, and typed static content modules for all educational material. No database.

**Tech Stack:** Next.js 15+, TypeScript strict, Tailwind CSS v4, shadcn/ui, `motion` (Framer Motion), @tanstack/react-query v5, Recharts, Vitest.

## Global Constraints

- TypeScript `strict: true`; no `any` in committed code (use `unknown` + narrowing).
- All external fetches go through `fetchJson` (`src/lib/api/fetch-json.ts`) — never raw `fetch` in pages/components.
- All API data crosses into UI as domain models from `src/lib/models/` — raw API shapes never leave `src/lib/api/`.
- Cache tiers (Next fetch `revalidate`): historical (`year < CURRENT_SEASON`) → `false` (immutable); current-season → `3600`; schedule/next-race → `900`.
- Jolpica base: `https://api.jolpi.ca/ergast/f1`. OpenF1 base: `https://api.openf1.org/v1`. Open-Meteo base: `https://api.open-meteo.com/v1/forecast`.
- Every async page has `loading.tsx` (skeleton) and inherits root `error.tsx`.
- All motion respects `prefers-reduced-motion` and the settings toggle.
- Team accent colors come only from `src/content/teams/team-meta.ts`.
- Verification gate per task: `npx tsc --noEmit && npm run lint && npx vitest run` (plus `npm run build` at phase ends). Commit after each task.
- Path alias `@/*` → `src/*`.

---

## Phase 1 — Scaffold, design system, shell

### Task 1: Scaffold project + tooling

**Files:**
- Create: Next.js app in repo root via create-next-app (src dir, App Router, Tailwind, ESLint, TS)
- Create: `vitest.config.ts`, `src/lib/utils/__tests__/smoke.test.ts`
- Modify: `package.json` (add `test` script), `tsconfig.json` (verify strict)

**Interfaces:**
- Produces: working `npm run dev`, `npm run build`, `npx vitest run`.

- [x] Step 1: `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack` (accept existing dir; move conflicting files if needed)
- [x] Step 2: Install deps: `npm i motion @tanstack/react-query recharts lucide-react clsx tailwind-merge class-variance-authority && npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react`
- [x] Step 3: `npx shadcn@latest init` (neutral base) then `npx shadcn@latest add button card badge tabs table select dialog command tooltip separator skeleton switch accordion progress`
- [x] Step 4: Add `vitest.config.ts` (react plugin, jsdom, alias `@` → `./src`) and a passing smoke test; add `"test": "vitest run"` script
- [x] Step 5: Verify gate: `npx tsc --noEmit && npm run lint && npx vitest run && npm run build` → all pass
- [x] Step 6: Commit `chore: scaffold Next.js app with tooling`

### Task 2: Design tokens + global styles

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/content/teams/team-meta.ts`, `src/lib/utils/cn.ts` (if shadcn didn't)

**Interfaces:**
- Produces: CSS vars `--background`, `--foreground`, `--glass`, `--carbon` etc.; utility classes `.glass-panel`, `.carbon-texture`; `TEAM_META: Record<string, TeamMeta>` where `TeamMeta = { constructorId: string; name: string; shortName: string; color: string; secondaryColor: string; base: string; principal: string; powerUnit: string; firstEntry: number; championships: number; funFacts: string[] }` keyed by Jolpica constructorId (`red_bull`, `ferrari`, `mercedes`, `mclaren`, `aston_martin`, `alpine`, `williams`, `rb`, `sauber`, `haas`, + historical: `lotus`, `brabham`, `tyrrell`, `benetton`, `renault`, `brawn`, `cooper`, `matra`, `bmw_sauber`, `jordan`).
- Produces: `getTeamMeta(constructorId: string): TeamMeta | undefined`, `getTeamColor(constructorId: string): string` (falls back to neutral gray).

- [x] Step 1: Define light/dark token sets in `globals.css` (neutral premium palette per spec), `.glass-panel` (backdrop-blur + translucent bg + border), `.carbon-texture` (subtle repeating-linear-gradient), editorial heading utilities
- [x] Step 2: Write `team-meta.ts` with all 10 current teams + ~10 historical, real 2026 data (principal, PU, base)
- [x] Step 3: Test `src/content/teams/__tests__/team-meta.test.ts`: every meta has valid hex color; `getTeamColor('unknown_team')` returns fallback
- [x] Step 4: Verify gate; commit `feat: design tokens and team metadata`

### Task 3: App shell — nav, footer, providers, settings

**Files:**
- Create: `src/components/shell/site-header.tsx`, `site-footer.tsx`, `nav-links.ts`, `mobile-nav.tsx`
- Create: `src/components/providers/app-providers.tsx` (QueryClientProvider + ThemeProvider + MotionConfig)
- Create: `src/lib/hooks/use-settings.ts` (localStorage: theme `system|light|dark`, reducedMotion boolean)
- Create: `src/app/settings/page.tsx`
- Modify: `src/app/layout.tsx` (fonts Geist/Geist Mono, metadata, providers, header/footer)

**Interfaces:**
- Produces: `NAV_LINKS: { label: string; href: string; group: 'explore'|'learn'|'data' }[]`; `useSettings(): { settings, setTheme, setReducedMotion }`.

- [x] Step 1: Build sticky glass header: logo wordmark "F1 Explorer", grouped dropdown nav (Explore: Seasons/Teams/Drivers/Circuits/Calendar/History; Learn: Learn/Rules/Glossary; Data: Standings/Live/Stats/Compare/Simulators), search trigger button (wired in Task 30), theme toggle
- [x] Step 2: Mobile sheet nav; footer with section links + data attribution (Jolpica/OpenF1/Open-Meteo)
- [x] Step 3: Settings page: theme select, reduced-motion switch, data-source attribution, localStorage persisted
- [x] Step 4: Verify gate + `npm run build`; commit `feat: app shell with navigation, providers, settings`

---

## Phase 2 — Data layer

### Task 4: fetchJson wrapper

**Files:**
- Create: `src/lib/api/fetch-json.ts`, `src/lib/api/__tests__/fetch-json.test.ts`

**Interfaces:**
- Produces:
  ```ts
  type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };
  type ApiError = { kind: 'http' | 'network' | 'timeout' | 'parse'; status?: number; message: string };
  function fetchJson<T>(url: string, opts?: { revalidate?: number | false; timeoutMs?: number; retries?: number; tags?: string[] }): Promise<ApiResult<T>>
  ```
- Behavior: default timeoutMs 10000, retries 2 with exponential backoff (300ms base, only on network/timeout/5xx), passes `next: { revalidate, tags }` to fetch.

- [x] Step 1: Write failing tests (mock global fetch): success returns ok:true; 404 → kind 'http' status 404, no retry; 500 retried then fails; network error retried; invalid JSON → 'parse'; timeout aborts → 'timeout'
- [x] Step 2: Run tests → fail (module missing)
- [x] Step 3: Implement `fetchJson`
- [x] Step 4: Tests pass; verify gate; commit `feat: resilient fetchJson wrapper`

### Task 5: Jolpica client + domain models + mappers

**Files:**
- Create: `src/lib/models/f1.ts` (all domain types)
- Create: `src/lib/api/jolpica-types.ts` (raw Ergast/Jolpica response shapes)
- Create: `src/lib/api/jolpica.ts` (client fns), `src/lib/api/jolpica-mappers.ts`
- Create: `src/lib/api/__tests__/jolpica-mappers.test.ts`
- Create: `src/lib/utils/season.ts` (`CURRENT_SEASON` = new Date's year, `revalidateFor(year)`)

**Interfaces:**
- Produces domain models: `Race { season, round, raceName, circuit: CircuitRef, dateTimeUtc: string | null, sprint: boolean, sessions: SessionSchedule[] }`, `RaceResultRow { position, driver: DriverRef, constructor: ConstructorRef, grid, laps, status, points, timeText, fastestLap? }`, `QualifyingRow`, `DriverStanding { position, points, wins, driver, constructors }`, `ConstructorStanding`, `DriverRef { driverId, code?, permanentNumber?, givenName, familyName, fullName, nationality, dateOfBirth?, url? }`, `ConstructorRef { constructorId, name, nationality }`, `CircuitRef { circuitId, name, locality, country, lat, lng }`, `SeasonSummary { year, url }`.
- Produces client fns (all return `ApiResult<...>`, all take year and apply `revalidateFor(year)`):
  `getSeasons()`, `getSchedule(year)`, `getRaceResults(year, round)`, `getQualifying(year, round)`, `getSprintResults(year, round)`, `getDriverStandings(year, round?)`, `getConstructorStandings(year, round?)`, `getDrivers(year)`, `getConstructors(year)`, `getDriver(driverId)`, `getDriverResults(driverId, opts?)` (paginated, limit 100), `getDriverSeasonsStandings(driverId)`, `getConstructorResults(constructorId)`, `getCircuits(year?)`, `getCircuitResults(circuitId, limit)`.

- [x] Step 1: Write mapper tests with realistic captured Jolpica JSON fixtures (schedule w/ sprint weekend, race results w/ fastest lap + DNF status, standings w/ multi-constructor driver, qualifying w/ missing Q3)
- [x] Step 2: Run → fail
- [x] Step 3: Implement types, mappers (defensive: missing fields → null/defaults), client fns building URLs like `${BASE}/${year}/${round}/results.json?limit=100`
- [x] Step 4: Tests pass; verify gate; commit `feat: Jolpica client, domain models, mappers`

### Task 6: OpenF1 client

**Files:**
- Create: `src/lib/api/openf1.ts`, `src/lib/models/live.ts`, `src/lib/api/__tests__/openf1.test.ts`

**Interfaces:**
- Produces models: `LiveSession { sessionKey, meetingKey, name, type, circuitShortName, countryName, dateStartUtc, dateEndUtc, year }`, `LiveDriver { driverNumber, acronym, fullName, teamName, teamColor }`, `PositionEntry { driverNumber, position, dateUtc }`, `IntervalEntry { driverNumber, gapToLeader: number|null, interval: number|null, dateUtc }`, `LapEntry { driverNumber, lapNumber, lapDuration: number|null, sector1|2|3: number|null, isPitOutLap }`, `PitEntry { driverNumber, lapNumber, pitDuration: number|null }`, `StintEntry { driverNumber, stintNumber, compound, lapStart, lapEnd, tyreAgeAtStart }`, `RaceControlMessage { dateUtc, category, flag: string|null, message, scope }`, `SessionWeather { airTemp, trackTemp, humidity, rainfall, windSpeed, dateUtc }`, `TeamRadioEntry { driverNumber, dateUtc, recordingUrl }`.
- Produces fns: `getLatestSession()`, `getSessionsForYear(year)`, `getSessionDrivers(sessionKey)`, `getPositions(sessionKey, sinceIso?)`, `getIntervals(sessionKey, sinceIso?)`, `getLaps(sessionKey, sinceLap?)`, `getPits(sessionKey)`, `getStints(sessionKey)`, `getRaceControl(sessionKey)`, `getSessionWeather(sessionKey)`, `getTeamRadio(sessionKey)`. All keyless GETs like `${BASE}/sessions?session_key=latest`; live fns use `revalidate: 0`.
- Produces `deriveSessionStatus(session: LiveSession, nowUtc: Date): 'live' | 'recent' | 'none'` — live if now within [start-10min, end+30min]; recent if ended within 14 days.

- [x] Step 1: Failing tests for mappers (snake_case→camel, nulls) and `deriveSessionStatus` boundaries
- [x] Step 2: Run → fail
- [x] Step 3: Implement
- [x] Step 4: Pass; verify gate; commit `feat: OpenF1 live data client`

### Task 7: Weather client

**Files:**
- Create: `src/lib/api/weather.ts`, `src/lib/api/__tests__/weather.test.ts`

**Interfaces:**
- Produces: `getCircuitWeather(lat: number, lng: number): Promise<ApiResult<CircuitWeather>>` where `CircuitWeather = { currentTempC: number; precipitationMm: number; windSpeedKmh: number; weatherCode: number; daily: { date: string; maxTempC: number; minTempC: number; precipProbability: number; weatherCode: number }[] }`; `weatherCodeToLabel(code): { label: string; icon: 'sun'|'cloud'|'rain'|'storm'|'snow'|'fog' }`. Revalidate 1800.

- [x] Step 1: Failing tests (mapper from Open-Meteo fixture; weatherCode buckets)
- [x] Step 2: Implement; pass; verify gate; commit `feat: Open-Meteo weather client`

### Task 8: Driver enrichment content

**Files:**
- Create: `src/content/drivers/driver-meta.ts`, `src/content/drivers/__tests__/driver-meta.test.ts`

**Interfaces:**
- Produces: `DriverMeta = { driverId: string; bio: string; drivingStyle: string; helmetColors: [string, string]; rivalries: string[]; highlights: string[]; funFacts: string[] }`; `DRIVER_META` for all 2026 grid drivers + ~15 legends (senna, prost, schumacher, michael_schumacher id etc. — use Jolpica ids); `getDriverMeta(driverId)`.

- [x] Step 1: Write content (real, accurate); test: every entry has non-empty bio, ≥2 funFacts, valid hex helmet colors
- [x] Step 2: Verify gate; commit `feat: driver enrichment content`

---

## Phase 3 — Core pages

### Task 9: Shared UI kit

**Files:**
- Create in `src/components/ui-kit/`: `page-header.tsx`, `stat-card.tsx` (animated counter), `data-table.tsx` (generic typed columns), `section.tsx`, `country-flag.tsx` (flagcdn img by nationality→ISO map in `src/lib/utils/countries.ts`), `team-chip.tsx`, `driver-link.tsx`, `error-note.tsx`, `empty-state.tsx`, `skeletons.tsx` (TableSkeleton, CardGridSkeleton, HeroSkeleton), `animated-number.tsx`, `fade-in.tsx` (motion wrapper honoring reduced motion)
- Create: `src/lib/utils/format.ts` (`formatDate`, `formatLapTime(seconds|string)`, `formatGap`, `ordinal(n)`) + tests

**Interfaces:**
- Produces: `DataTable<T>({ columns: { key, header, align?, render }[], rows: T[], rowKey })`; `StatCard({ label, value, sub?, accentColor? })`; `CountryFlag({ nationality, size? })`; `ErrorNote({ error, context })`; `EmptyState({ title, message, icon? })`.
- Consumes: `getTeamColor` (Task 2).

- [x] Step 1: Failing tests for `format.ts` + `countries.ts` (nationality "Dutch"→"nl", "Monegasque"→"mc", unknown→null) 
- [x] Step 2: Implement utils; pass
- [x] Step 3: Build components
- [x] Step 4: Verify gate; commit `feat: shared UI kit`

### Task 10: Standings pages

**Files:**
- Create: `src/app/standings/drivers/page.tsx` + `loading.tsx`, `src/app/standings/constructors/page.tsx` + `loading.tsx`
- Create: `src/components/standings/standings-table.tsx`, `year-selector.tsx` (client, router push `?year=`), `points-progression-chart.tsx` (client, Recharts line chart of cumulative points by round, team colors)
- Create: `src/lib/services/standings.ts` (`getStandingsProgression(year): ApiResult<ProgressionSeries[]>` — fetch each round's standings? NO: compute from race+sprint results per round via `getRaceResults`... too many calls. Implementation: use Jolpica `/{year}/driverstandings.json` final + per-race results for top 5 only? Simplify: fetch all race results for season in one paginated call `/{year}/results.json?limit=100&offset=...` and all sprint results `/{year}/sprint.json?limit=100`, sum cumulative points per driver/constructor per round locally) + tests for accumulation math

**Interfaces:**
- Produces: `ProgressionSeries { id, label, color, points: { round: number; total: number }[] }`; `getSeasonResultsBulk(year): ApiResult<RaceResultRow[][]>` added to jolpica.ts (paginated fetch-all).
- Consumes: DataTable, YearSelector; standings fns (Task 5).

- [x] Step 1: Failing test for progression accumulation (fixture: 2 rounds + sprint; verifies cumulative totals and constructor sum of both drivers)
- [x] Step 2: Implement service; pass
- [x] Step 3: Build pages: standings table (position, driver/team chip w/ color bar, points, wins, gap to leader), year selector 1950–current, progression chart (top 10 series), constructor page analogous
- [x] Step 4: Verify gate + build; commit `feat: standings pages with progression charts`

### Task 11: Calendar page + countdown

**Files:**
- Create: `src/app/calendar/page.tsx` + `loading.tsx`, `src/components/calendar/race-card.tsx`, `countdown.tsx` (client, ticks 1s, honors reduced motion by updating minute-level)
- Create: `src/lib/utils/countdown.ts` (`getCountdownParts(target: Date, now: Date): { days, hours, minutes, seconds, isPast }`, `getNextRace(races: Race[], now: Date): Race | null`) + tests

**Interfaces:**
- Produces: `Countdown({ targetIso })`, `getNextRace` reused by home page.

- [x] Step 1: Failing tests countdown math + getNextRace (skips past races, returns null after finale)
- [x] Step 2: Implement; pass
- [x] Step 3: Calendar page: year selector reuse, grid of race cards (round, name, circuit, country flag, date, sprint badge, status: completed w/ winner? upcoming w/ countdown for next), past races link to `/seasons/[year]/[round]`
- [x] Step 4: Verify gate; commit `feat: race calendar with countdowns`

### Task 12: Home page

**Files:**
- Modify: `src/app/page.tsx`; Create: `src/app/loading.tsx`, `src/components/home/hero.tsx`, `next-race-panel.tsx`, `leaders-panel.tsx`, `featured-lessons.tsx`, `fact-strip.tsx`
- Create: `src/content/facts.ts` (`F1_FACTS: { fact: string; category: string }[]` ≥ 20 real facts)

**Interfaces:**
- Consumes: `getSchedule`, `getDriverStandings`, `getConstructorStandings`, `getNextRace`, `Countdown`, `StatCard`, `FadeIn`.

- [x] Step 1: Hero: animated gradient + checkered/carbon motif, editorial headline ("Understand every second of Formula One"), CTAs → /learn and /live, animated speed-lines (CSS, reduced-motion-safe)
- [x] Step 2: Next race panel (countdown, circuit, weekend session times), championship leaders (top 3 drivers + top 3 constructors with team colors), animated stat strip (races this season, drivers, circuits, seasons since 1950), rotating fact card, featured lessons grid (static picks), section CTAs
- [x] Step 3: Every data panel handles `ok:false` with ErrorNote inline
- [x] Step 4: Verify gate + build; commit `feat: home page`

### Task 13: Drivers index + profile

**Files:**
- Create: `src/app/drivers/page.tsx` + `loading.tsx`, `src/app/drivers/[driverId]/page.tsx` + `loading.tsx`
- Create: `src/components/drivers/driver-card.tsx`, `career-stats.tsx`, `results-by-season-chart.tsx` (client Recharts: points or avg finish per season), `career-timeline.tsx`
- Create: `src/lib/services/driver-career.ts` (`buildCareerSummary(results: DriverRaceResult[], standings: SeasonStanding[]): CareerSummary`) + tests

**Interfaces:**
- Produces: `CareerSummary { starts, wins, podiums, poles, fastestLaps, points, championships, firstRace: { year, raceName }, lastRace: {...}, teams: { constructorId, name, years: string }[], seasonBreakdown: { year, team, points, position, wins, podiums }[] }`.
- Consumes: `getDrivers(CURRENT_SEASON)`, `getDriver`, `getDriverResults`, `getDriverSeasonsStandings`, `getDriverMeta`.

- [x] Step 1: Failing tests for `buildCareerSummary` (fixture with win, podium, pole-from-grid-1, DNF, multi-team)
- [x] Step 2: Implement; pass
- [x] Step 3: Index: current-grid cards (number, name, flag, team color accent, helmet-color stripe) + note that any historical driver page is reachable via search/season pages
- [x] Step 4: Profile: header (name, number, flag, team), StatCard row (wins/podiums/poles/points/championships), bio + driving style + rivalries + highlights (from meta, hidden if absent), season-by-season table + chart, career timeline
- [x] Step 5: Verify gate; commit `feat: driver pages`

### Task 14: Teams index + profile

**Files:**
- Create: `src/app/teams/page.tsx` + `loading.tsx`, `src/app/teams/[constructorId]/page.tsx` + `loading.tsx`
- Create: `src/components/teams/team-card.tsx`, `team-history-timeline.tsx`
- Create: `src/lib/services/team-summary.ts` (`buildTeamSummary(results, standingsBySeason)` → wins, podiums, poles, points, seasons, bestFinish, championship seasons list) + tests

**Interfaces:**
- Consumes: `getConstructors(CURRENT_SEASON)`, `getConstructorResults`, TEAM_META, `getConstructorStandings`.

- [x] Step 1: Failing test `buildTeamSummary`; implement; pass
- [x] Step 2: Index: current teams grid, carbon-texture cards with team color top-bar, principal/base/PU from meta
- [x] Step 3: Team page: header w/ color gradient, overview (meta), current drivers (from season driver standings filtered by constructor), stats row, championships list, season results table, timeline of eras + funFacts
- [x] Step 4: Verify gate; commit `feat: team pages`

### Task 15: Circuit content (SVG maps + guides)

**Files:**
- Create: `src/content/circuits/circuit-guides.ts`, `src/content/circuits/track-paths.ts`, `src/content/circuits/__tests__/circuit-guides.test.ts`

**Interfaces:**
- Produces: `TrackPath = { circuitId: string; viewBox: string; path: string; drsZones: { path: string }[]; startFinish: { x, y }; sectors?: never }` — stylized (not survey-accurate) but recognizable SVG paths for all 24 current circuits.
- Produces: `CircuitGuide = { circuitId, lengthKm, laps, corners: number, drsZoneCount, lapRecord: { time, driver, year }, elevationNote, overtakingSpots: string[], cornerGuide: { corner: number|string; name?: string; note: string }[] (≥5 key corners), strategyNotes: string[], tireStress: 'low'|'medium'|'high', funFacts: string[] }` for all 24; `getCircuitGuide(circuitId)`, `getTrackPath(circuitId)`.
- circuitIds use Jolpica ids: `bahrain, jeddah, albert_park, suzuka, shanghai, miami, imola, monaco, villeneuve, catalunya, red_bull_ring, silverstone, spa, hungaroring, zandvoort, monza, baku, marina_bay, americas, rodriguez, interlagos, vegas, losail, yas_marina`.

- [x] Step 1: Test: every current circuitId has guide + path; every path is non-empty valid `d` string starting with `M`; lapRecord fields present
- [x] Step 2: Author content (accurate data) + hand-drawn stylized SVG paths
- [x] Step 3: Verify gate; commit `feat: circuit guides and track map content`

### Task 16: Circuits index + circuit page

**Files:**
- Create: `src/app/circuits/page.tsx` + `loading.tsx`, `src/app/circuits/[circuitId]/page.tsx` + `loading.tsx`
- Create: `src/components/circuits/track-map.tsx` (client: SVG path draw-in animation via motion, DRS zones highlighted, hover corner markers), `circuit-weather.tsx`, `past-winners.tsx`

**Interfaces:**
- Consumes: `getCircuits(CURRENT_SEASON)`, `getCircuitResults(circuitId, 10)` (winners), `getCircuitWeather`, guides/paths (Task 15).

- [x] Step 1: Index: card grid with mini track map, country flag, corners/length
- [x] Step 2: Circuit page: hero w/ animated TrackMap + DRS zones legend, stat row (length, laps, corners, lap record), corner-by-corner accordion, strategy + tire notes, current weather + 3-day forecast, past winners table, fun facts
- [x] Step 3: Circuits not in guides (historical) render API-only fallback layout
- [x] Step 4: Verify gate + build; commit `feat: circuit pages with animated track maps`

### Task 17: Seasons archive + race pages

**Files:**
- Create: `src/app/seasons/page.tsx`, `src/app/seasons/[year]/page.tsx` + `loading.tsx`, `src/app/seasons/[year]/[round]/page.tsx` + `loading.tsx`
- Create: `src/components/seasons/season-header.tsx`, `race-results-tabs.tsx` (Race/Qualifying/Sprint tabs), `position-changes.tsx` (grid→finish delta viz)
- Create: `src/content/history/season-notes.ts` (`SEASON_NOTES: Record<number, { headline: string; notes: string[] }>` for ≥25 landmark seasons: 1950, 1958, 1961, 1968, 1976, 1988, 1994, 2000, 2008, 2010, 2016, 2021, 2024, etc.)

**Interfaces:**
- Consumes: `getSeasons`, `getSchedule(year)`, `getDriverStandings(year)`, `getConstructorStandings(year)`, `getRaceResults`, `getQualifying`, `getSprintResults`, SEASON_NOTES.

- [x] Step 1: Seasons index: decade-grouped year grid with champion name (from standings, lazy per-decade acceptable: use static champions list in `src/content/history/champions.ts` `WORLD_CHAMPIONS: Record<number, { driver: string; team: string }>` 1950–2025 to avoid API storm) — add champions.ts with test (76 entries)
- [x] Step 2: Season page: header (year, champion callouts), full calendar table w/ winners links, final standings (both), season notes if landmark
- [x] Step 3: Race page: header (race, circuit link, date), tabs: race results (pos, driver, team, grid, time/status, points, fastest lap badge), qualifying (Q1/Q2/Q3), sprint if exists; position-changes strip (top gainers/losers)
- [x] Step 4: Verify gate + build; commit `feat: seasons archive and race detail pages`

---

## Phase 4 — History + stats

### Task 18: History section

**Files:**
- Create: `src/app/history/page.tsx`, `src/content/history/eras.ts`, `src/components/history/era-timeline.tsx`, `champions-by-decade.tsx`

**Interfaces:**
- Produces: `ERAS: { id, name, years: string, summary: string, keyCars: string[], keyDrivers: string[], moments: { year: number; title: string; description: string }[] }[]` — 8 eras (1950s front-engine → ground effect 2022+), ≥3 moments each.

- [x] Step 1: Author eras content
- [x] Step 2: Page: scroll-animated vertical era timeline, champions-by-decade grid (champions.ts), notable moments cards, link CTAs to seasons
- [x] Step 3: Verify gate; commit `feat: history section`

### Task 19: Stats explorer

**Files:**
- Create: `src/app/stats/page.tsx` + `loading.tsx`, `src/content/stats/records.ts`, `src/components/stats/record-board.tsx`, `stat-chart.tsx`

**Interfaces:**
- Produces: `ALL_TIME_RECORDS: { category: string; records: { holder: string; value: string; detail: string }[] }[]` (wins, poles, titles, podiums, starts, youngest/oldest winners, constructor records — accurate as of 2026-07).
- Consumes: current-season data for "this season in numbers" panel (computed from `getSeasonResultsBulk`).

- [x] Step 1: Records content + season-in-numbers service fn `computeSeasonStats(results): { differentWinners, differentPolesitters?, avgFinishersPerRace, dnfCount, closestMargin }` + test
- [x] Step 2: Page: record boards by category, season-in-numbers stat cards, wins-by-team donut (Recharts), points distribution bar chart
- [x] Step 3: Verify gate; commit `feat: statistics explorer`

---

## Phase 5 — Learning platform

### Task 20: Lesson model + learning components

**Files:**
- Create: `src/content/lessons/types.ts`, `src/components/learn/quiz.tsx`, `flashcards.tsx`, `key-takeaways.tsx`, `lesson-diagram.tsx` (renders named SVG diagrams), `glossary-tooltip.tsx`, `lesson-progress.ts` (localStorage read/completed set)
- Create: `src/components/learn/diagrams/` — SVG diagram components: `downforce-diagram.tsx`, `drs-diagram.tsx`, `ers-flow-diagram.tsx`, `tire-compounds-diagram.tsx`, `race-weekend-timeline.tsx`, `pit-stop-anatomy.tsx`, `flag-gallery.tsx`, `points-table-diagram.tsx`, `qualifying-format-diagram.tsx`, `circuit-anatomy.tsx`
- Create: `src/content/lessons/__tests__/lesson-integrity.test.ts` (runs against registry as lessons land)

**Interfaces:**
- Produces:
  ```ts
  type Lesson = { slug: string; title: string; category: 'foundations'|'machinery'|'race-craft'|'rules'|'deep-dives'; difficulty: 1|2|3; minutes: number; summary: string; sections: LessonSection[]; quiz: QuizQuestion[]; flashcards: { front: string; back: string }[]; takeaways: string[]; misconceptions: { myth: string; reality: string }[]; facts: string[]; next: string[] };
  type LessonSection = { heading: string; body: string[]; diagram?: DiagramId };
  type QuizQuestion = { question: string; options: string[]; answerIndex: number; explanation: string };
  type DiagramId = 'downforce'|'drs'|'ers-flow'|'tire-compounds'|'race-weekend'|'pit-stop'|'flags'|'points-table'|'qualifying-format'|'circuit-anatomy';
  ```
- Produces: `Quiz({ questions })` (interactive, per-question feedback, score, motion), `Flashcards({ cards })` (flip animation), `GlossaryTooltip({ term, children })` (looks up glossary Task 25 — stub lookup fn now: `getGlossaryEntry(term): GlossaryEntry | undefined` in `src/content/glossary/glossary.ts` created here with initial 10 terms).

- [x] Step 1: Types + integrity test (every lesson: ≥3 sections, ≥4 quiz questions w/ valid answerIndex, ≥4 flashcards, next[] slugs resolve)
- [x] Step 2: Build components + 10 SVG diagrams (clean, labeled, token colors)
- [x] Step 3: Verify gate; commit `feat: learning platform infrastructure`

### Task 21: Lessons — foundations + race-craft (8 lessons)

**Files:**
- Create: `src/content/lessons/` — `intro-to-f1.ts`, `race-weekend.ts`, `qualifying.ts`, `sprint-weekends.ts`, `championship-points.ts`, `flags.ts`, `pit-stops.ts`, `race-strategy.ts`; `src/content/lessons/registry.ts` (`LESSONS: Lesson[]`, `getLesson(slug)`)

- [x] Step 1: Author all 8 lessons fully (accurate 2026 regs: sprint format, points 25-18-15-12-10-8-6-4-2-1, fastest-lap rules as of 2026)
- [x] Step 2: Integrity test passes for registry
- [x] Step 3: Verify gate; commit `feat: foundations and race-craft lessons`

### Task 22: Lessons — machinery (7 lessons)

**Files:**
- Create: `cars.ts`, `aerodynamics.ts`, `power-units.ts`, `ers.ts`, `drs.ts`, `tires.ts`, `engineering.ts`; register all

- [x] Step 1: Author (2026 PU regs: ~50/50 hybrid split, sustainable fuel, active aero X/Z modes, manual override mode)
- [x] Step 2: Integrity + verify gate; commit `feat: machinery lessons`

### Task 23: Lessons — rules + deep dives (7 lessons)

**Files:**
- Create: `technical-regulations.ts`, `sporting-regulations.ts`, `stewards.ts`, `safety.ts`, `weather.ts`, `history-of-f1.ts`, `future-of-f1.ts`; register all

- [x] Step 1: Author; integrity + verify gate; commit `feat: rules and deep-dive lessons`

### Task 24: Learn hub + lesson pages

**Files:**
- Create: `src/app/learn/page.tsx`, `src/app/learn/[slug]/page.tsx`, `src/components/learn/lesson-card.tsx`, `learning-path.tsx`, `lesson-body.tsx`

**Interfaces:**
- Consumes: LESSONS registry, Quiz, Flashcards, diagrams, lesson-progress.

- [x] Step 1: Hub: hero, category-grouped lesson cards (difficulty dots, minutes, completed check), suggested path for beginners (ordered foundations)
- [x] Step 2: Lesson page: `generateStaticParams` from registry, editorial layout, sections w/ diagrams, takeaways/misconceptions/facts panels, quiz, flashcards, next-lesson cards, mark-complete
- [x] Step 3: Verify gate + build; commit `feat: learn hub and lesson pages`

### Task 25: Glossary + rules pages

**Files:**
- Expand: `src/content/glossary/glossary.ts` to ≥100 terms (`GlossaryEntry { term, slug, definition, category, related: string[] }`)
- Create: `src/app/glossary/page.tsx` (client filter/search, A–Z groups, category filter)
- Create: `src/content/rules/rules.ts` (`RULE_SECTIONS: { id, title, summary, items: { rule: string; explanation: string }[] }[]` — sporting, technical, points, penalties, parc fermé, budget cap)
- Create: `src/app/rules/page.tsx` (accordion sections)

- [x] Step 1: Author glossary (test: ≥100 entries, unique slugs, related resolve) + rules content
- [x] Step 2: Build both pages
- [x] Step 3: Verify gate; commit `feat: glossary and rules reference`

---

## Phase 6 — Live Race Center

### Task 26: Live data hooks

**Files:**
- Create: `src/lib/hooks/use-live-session.ts`, `use-live-timing.ts`
- Create: `src/lib/services/live-timing.ts` (`buildLeaderboard(drivers, positions, intervals, laps, stints, pits): LeaderboardRow[]`, `latestPerDriver<T>(entries, key)`) + tests

**Interfaces:**
- Produces: `LeaderboardRow { position, driverNumber, acronym, fullName, teamName, teamColor, gapToLeader: string, interval: string, lastLap: string, bestLap: string, sectors: [string,string,string], compound: string|null, tyreAge: number|null, pitCount: number, status: 'running'|'retired' }`.
- Produces: `useLiveSession(): { session, status: 'live'|'recent'|'none', drivers, isLoading }` (query, refetch 60s); `useLiveTiming(sessionKey, enabled): { leaderboard, raceControl, weather, lastUpdated, isPolling }` (refetch 4s when live, 0 when not).
- Consumes: openf1.ts fns (Task 6).

- [x] Step 1: Failing tests for `buildLeaderboard` (fixture: 3 drivers, out-of-order position timestamps → latest wins; retired driver via race control? use position presence + laps; gap formatting `+1.234` / `1 LAP`) and `latestPerDriver`
- [x] Step 2: Implement; pass; verify gate; commit `feat: live timing hooks and leaderboard builder`

### Task 27: Live Race Center page

**Files:**
- Create: `src/app/live/page.tsx` (client-heavy), `src/components/live/live-leaderboard.tsx`, `session-status-banner.tsx` (LIVE pulse / REPLAY / NO SESSION states), `race-control-feed.tsx` (flags color-coded, SC/VSC/red banners), `live-weather.tsx`, `pit-tracker.tsx`, `stint-strip.tsx` (compound color bars), `live-track-status.tsx`

**Interfaces:**
- Consumes: hooks (Task 26), TrackMap (Task 16) with animated status ring.

- [x] Step 1: Status banner + graceful chain: live → most recent session ("Session Replay — data from {name}") → none (next-race countdown + CTA)
- [x] Step 2: Leaderboard: motion-animated row reordering, team color bars, compound chips (S red/M yellow/H white/I green/W blue), gaps monospace; race control feed w/ auto-scroll; weather panel; pit tracker; stint visualization per driver
- [x] Step 3: Session picker (recent sessions of the year) for replay browsing
- [x] Step 4: Verify gate + build; commit `feat: live race center`

---

## Phase 7 — Interactive tools + search

### Task 28: Compare tool

**Files:**
- Create: `src/app/compare/page.tsx`, `src/components/compare/driver-compare.tsx`, `team-compare.tsx`, `compare-picker.tsx` (search-select over current+legend lists), `radar-compare.tsx` (Recharts RadarChart), `head-to-head-bars.tsx`

**Interfaces:**
- Consumes: `buildCareerSummary` (Task 13), `buildTeamSummary` (Task 14), driver/team meta.
- Produces: `normalizeForRadar(a: CareerSummary, b: CareerSummary): RadarDatum[]` in `src/lib/services/compare.ts` + test (each axis scaled 0–100 vs max of pair).

- [x] Step 1: Failing test `normalizeForRadar`; implement; pass
- [x] Step 2: Tabs: Drivers | Teams. Two pickers → side-by-side stat cards, radar chart, head-to-head bar rows (wins/podiums/poles/points/titles), career overlap note
- [x] Step 3: Verify gate; commit `feat: comparison tools`

### Task 29: Simulators

**Files:**
- Create: `src/lib/services/simulators.ts` + `__tests__/simulators.test.ts`:
  - `simulateChampionship(current: DriverStanding[], remainingRaces: number, opts: { sprints: number }): { driverId, maxPoints, canWin: boolean }[]` (max remaining = races×25 + sprints×8)
  - `computeTireStrategy(laps: number, stints: { compound: 'soft'|'medium'|'hard'; laps: number }[], degradation: Record<compound, number>, basePace: number, pitLoss: number): { totalTime: number; valid: boolean; lapTimes: number[] }` (linear deg model)
  - `scorePitStop(reactionsMs: number[]): { total: number; rating: 'legendary'|'great'|'good'|'slow' }`
- Create: `src/app/simulators/page.tsx` (tabs), `src/components/simulators/championship-sim.tsx` (sliders: assumed finishes per contender → projected table), `tire-strategy-viz.tsx` (build stints, compare two strategies, lap-time chart + total delta), `pit-stop-game.tsx` (4-light reaction mini-game: click on green ×4 stages = wheel guns, jack, release; sum → rating vs 1.8s record)

- [x] Step 1: Failing tests for all three engines (championship: leader clinch case + mathematically-alive case; tire: pit loss counted per stop, invalid when stint laps ≠ race laps; pit game rating buckets)
- [x] Step 2: Implement engines; pass
- [x] Step 3: Build UI tabs w/ live data defaults (current standings, next circuit laps)
- [x] Step 4: Verify gate; commit `feat: championship, tire strategy, and pit stop simulators`

### Task 30: Global search (Cmd+K)

**Files:**
- Create: `src/lib/services/search-index.ts` (`buildSearchIndex(): SearchDoc[]`, `searchDocs(index, query): SearchDoc[]` — lowercase substring + startsWith ranking, max 20) + tests
- Create: `src/components/search/command-palette.tsx` (shadcn Command dialog, ⌘K/CtrlK listener, grouped results), wire trigger in header (Task 3)
- Create: `src/app/api/search-data/route.ts` if needed — NO: index is static content + current grid fetched client-side once via a small server component prop; pass `initialDocs` (lessons/glossary/circuits/rules/seasons static) and lazily merge current drivers/teams fetched from a tiny server action `getSearchDynamicDocs()` in `src/lib/services/search-dynamic.ts`

**Interfaces:**
- Produces: `SearchDoc { id, type: 'driver'|'team'|'circuit'|'lesson'|'glossary'|'season'|'rule'|'page', title, subtitle, href, keywords: string[] }`.

- [x] Step 1: Failing tests: ranking (startsWith beats substring), type filter, empty query → []
- [x] Step 2: Implement index + palette; wire header button + shortcut
- [x] Step 3: Verify gate + build; commit `feat: global command palette search`

---

## Phase 8 — Polish

### Task 31: Accessibility, performance, SEO, README

**Files:**
- Modify: `src/app/layout.tsx` (metadata templates, OpenGraph), add `src/app/error.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`
- Modify: components flagged in audit
- Create: `README.md` (features, architecture, data sources, commands, screenshots section)

- [x] Step 1: Audit pass: keyboard nav through header/palette/quiz/tabs; focus-visible styles; aria-labels on icon buttons; table semantics; color contrast on team chips (add text-shadow/contrast guard fn `readableTextOn(bgHex)` in format.ts + test)
- [x] Step 2: Reduced-motion sweep (every motion component honors setting), skeleton coverage sweep, image/font optimization check
- [x] Step 3: `not-found.tsx` (checkered flag themed), `error.tsx` (red flag themed), sitemap/robots/metadata
- [x] Step 4: Full gate: tsc, lint, vitest, `npm run build`; manual smoke via dev server on key routes
- [x] Step 5: Write README; commit `feat: polish pass — a11y, SEO, error surfaces, README`

---

## Self-Review Notes

- **Spec coverage:** All spec routes have tasks (home 12, learn 20–24, seasons 17, standings 10, drivers 13, teams 14, circuits 15–16, calendar 11, live 26–27, history 18, rules/glossary 25, compare 28, simulators 29, stats 19, settings 3, search 30). Error handling in Task 4 + per-page steps; a11y/perf in Task 31. Data status badge (Task 27), tiered caching (Global Constraints).
- **Type consistency:** Domain models defined once in Task 5/6 and consumed by name elsewhere; services define their own outputs at first use.
- **Known simplifications (per spec Out of Scope):** SVG stylized maps, no auth/DB, no audio radio playback, no Mapbox/Three.js.
