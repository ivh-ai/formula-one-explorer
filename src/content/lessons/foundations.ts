import type { Lesson } from "@/content/lessons/types";

export const FOUNDATIONS_LESSONS: Lesson[] = [
  {
    slug: "intro-to-f1",
    title: "Introduction to Formula One",
    category: "foundations",
    difficulty: 1,
    minutes: 8,
    summary:
      "What Formula One actually is, how a season works, and why the fastest circus on Earth captivates half a billion fans.",
    sections: [
      {
        heading: "The fastest sport on the planet",
        body: [
          "Formula One is the top tier of single-seater motor racing: eleven teams, twenty-two drivers, and the fastest closed-circuit racing cars ever built. The 'formula' in the name is the rulebook — a set of technical specifications every car must follow. Within that formula, teams design and build their own cars, which is what makes F1 as much an engineering championship as a driving one.",
          "An F1 car accelerates from 0 to 100 km/h in about 2.6 seconds, corners with forces that would make an untrained neck give up in minutes, and brakes so hard that drivers feel five times their body weight pushing them forward. No other circuit racing category combines this speed with wheel-to-wheel competition.",
        ],
      },
      {
        heading: "How a season works",
        body: [
          "A season runs from March to December across roughly 24 Grands Prix on five continents — street circuits like Monaco, purpose-built tracks like Silverstone, and night races like Singapore. Each event awards points toward two parallel championships: the Drivers' Championship for individuals and the Constructors' Championship for teams.",
          "Race winners collect 25 points, second place 18, third 15, down to a single point for tenth. Add up the points across the year and you have your champions. The drivers' title carries the glory; the constructors' title decides the prize money.",
        ],
        diagram: "points-table",
      },
      {
        heading: "Teams and drivers",
        body: [
          "Each team — also called a constructor — fields two race cars. Some, like Ferrari (racing since 1950) and McLaren, are institutions; others, like Cadillac (new for 2026), are ambitious newcomers. Teams employ hundreds of engineers, aerodynamicists and mechanics; the two drivers are just the most visible one percent of the operation.",
          "Teammates share a garage and data but race the same machinery — which makes your teammate your most dangerous rival. The first person any driver must beat is the one in the identical car.",
        ],
      },
      {
        heading: "Why people get hooked",
        body: [
          "F1 is a season-long drama with three interleaved contests: driver versus driver on track, engineer versus engineer in the factories, and strategist versus strategist on the pit wall. A championship can swing on a tenth of a second found in a wind tunnel, a gamble on rain tires, or a single lapse of concentration at 300 km/h.",
          "Start with one race. Learn one team, one driver, one rivalry. The rest of this course will fill in everything else.",
        ],
      },
    ],
    quiz: [
      {
        question: "What does the 'formula' in Formula One refer to?",
        options: [
          "The fuel mixture the cars use",
          "The set of technical rules all cars must follow",
          "The mathematical points system",
          "The shape of the circuits",
        ],
        answerIndex: 1,
        explanation:
          "The 'formula' is the shared rulebook — the technical specification within which every team designs its own unique car.",
      },
      {
        question: "How many championships run in parallel each season?",
        options: [
          "One — the World Championship",
          "Two — Drivers' and Constructors'",
          "Three — Drivers', Constructors' and Engines'",
          "One per continent",
        ],
        answerIndex: 1,
        explanation:
          "Drivers score for themselves (Drivers' Championship) and both cars' points combine for their team (Constructors' Championship).",
      },
      {
        question: "How many points does a race winner score?",
        options: ["10", "18", "25", "50"],
        answerIndex: 2,
        explanation: "Wins pay 25 points, with 18 for second and 15 for third, down to 1 point for tenth.",
      },
      {
        question: "How many cars does each team enter in a race?",
        options: ["One", "Two", "Three", "As many as they can afford"],
        answerIndex: 1,
        explanation: "Every constructor fields exactly two cars — and teammates are each other's most direct rivals.",
      },
      {
        question: "Which team has raced in every F1 season since 1950?",
        options: ["McLaren", "Williams", "Mercedes", "Ferrari"],
        answerIndex: 3,
        explanation: "Ferrari is the only team present in every world championship season since the very first in 1950.",
      },
    ],
    flashcards: [
      { front: "Grand Prix", back: "A single race event in the championship, French for 'big prize'. There are ~24 per season." },
      { front: "Constructor", back: "An F1 team — so called because it must design and build (construct) its own car." },
      { front: "Drivers' Championship", back: "The individual title, won by the driver with the most points across the season." },
      { front: "Constructors' Championship", back: "The team title — both cars' points combined. It decides the prize money." },
      { front: "Points for a win", back: "25 points (then 18, 15, 12, 10, 8, 6, 4, 2, 1 for positions 2–10)." },
    ],
    takeaways: [
      "F1 is both a driving and an engineering championship — teams build their own cars within a shared rulebook.",
      "Two titles run in parallel: Drivers' (glory) and Constructors' (prize money).",
      "Race wins pay 25 points; the top ten all score.",
      "Your teammate has identical machinery, making them your most direct benchmark.",
    ],
    misconceptions: [
      {
        myth: "All F1 cars are basically the same, like NASCAR or IndyCar.",
        reality: "Every team designs and builds its own car. Machinery differences are why the same driver can dominate one year and struggle the next.",
      },
      {
        myth: "The driver doesn't matter much — it's all the car.",
        reality: "The car sets the ceiling, but teammates in identical cars are routinely separated by three-tenths per lap — an enormous margin at this level.",
      },
    ],
    facts: [
      "F1 cars generate so much downforce that above ~180 km/h they could theoretically drive upside down.",
      "Over half a billion people watch F1 across a season.",
      "A modern F1 steering wheel costs more than most road cars.",
    ],
    next: ["race-weekend", "cars"],
  },
  {
    slug: "race-weekend",
    title: "The Race Weekend",
    category: "foundations",
    difficulty: 1,
    minutes: 7,
    summary: "Practice, qualifying, race — how three days of running fit together, and what to actually watch in each session.",
    sections: [
      {
        heading: "Three days, one story",
        body: [
          "A standard Grand Prix weekend has five sessions: three practice sessions, qualifying, and the race. Each has a distinct job. Practice is homework, qualifying is the entrance exam, and the race is the final.",
          "Cars arrive in the paddock as educated guesses. Teams simulate every circuit beforehand, but simulations aren't reality — wind, temperature and new asphalt all move the goalposts. The weekend is a compressed engineering sprint to close the gap between prediction and pavement.",
        ],
        diagram: "race-weekend",
      },
      {
        heading: "Practice: the homework sessions",
        body: [
          "Friday's two one-hour sessions (FP1 and FP2) are for learning: engineers sweep through setup changes, drivers learn grip levels, and long runs on heavy fuel rehearse the race. Saturday morning's FP3 is the dress rehearsal for qualifying — low fuel, soft tires, maximum attack.",
          "Watch the long-run pace on Friday afternoon, not the headline lap times. Teams routinely run different fuel loads and engine modes, so FP2's fastest lap is often a mirage; the consistent 15-lap averages tell the truth.",
        ],
      },
      {
        heading: "Qualifying: one lap for everything",
        body: [
          "Saturday afternoon sets the starting grid through three knockout rounds — Q1, Q2 and Q3. The slowest five drivers drop out in each of the first two segments, leaving a ten-car shootout for pole position. One mistake, one traffic jam, one yellow flag, and a front-runner can start fourteenth.",
          "Grid position matters enormously because overtaking is hard. At Monaco, qualifying effectively is the race.",
        ],
        diagram: "qualifying-format",
      },
      {
        heading: "Sunday: the Grand Prix",
        body: [
          "Races run to a distance of about 305 km — usually 50 to 70 laps, up to a two-hour limit. Drivers must use at least two different tire compounds (on a dry race), so everyone pits at least once, and those stops create the strategic chess game that can overturn the grid order.",
          "The start is the highest-risk, highest-reward moment: more positions change in the first 30 seconds than in the following 30 laps.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the main purpose of Friday practice?",
        options: [
          "Setting the grid order",
          "Learning the track and refining car setup",
          "Scoring bonus championship points",
          "Mandatory TV running",
        ],
        answerIndex: 1,
        explanation: "FP1 and FP2 are for setup experiments, tire evaluation and race-simulation runs — no points, no grid impact.",
      },
      {
        question: "How does qualifying determine pole position?",
        options: [
          "Championship order sets the grid",
          "A random draw",
          "Three knockout rounds ending in a top-ten shootout",
          "Average speed across all practice sessions",
        ],
        answerIndex: 2,
        explanation: "Q1 and Q2 each eliminate the slowest five; the remaining ten fight for pole in Q3.",
      },
      {
        question: "Why does everyone pit at least once in a dry race?",
        options: [
          "Refueling is mandatory",
          "Two different tire compounds must be used",
          "Engines overheat otherwise",
          "The rules require a minimum of three stops",
        ],
        answerIndex: 1,
        explanation: "The two-compound rule forces at least one stop, creating the strategic dimension of every dry Grand Prix.",
      },
      {
        question: "Roughly how long is a Grand Prix?",
        options: ["100 km", "200 km", "305 km", "500 km"],
        answerIndex: 2,
        explanation: "Race distance is the fewest laps exceeding 305 km (Monaco is the exception at ~260 km), capped at two hours.",
      },
    ],
    flashcards: [
      { front: "FP1 / FP2 / FP3", back: "The three free practice sessions — no points, used for setup work and race preparation." },
      { front: "Q1, Q2, Q3", back: "The three knockout segments of qualifying; five cars eliminated in each of the first two." },
      { front: "Pole position", back: "First place on the starting grid, won by the fastest Q3 lap." },
      { front: "Race distance", back: "About 305 km — 50 to 70 laps depending on circuit length, max two hours." },
      { front: "Two-compound rule", back: "In a dry race each driver must use two different slick compounds, forcing at least one pit stop." },
    ],
    takeaways: [
      "Practice is for learning, qualifying sets the grid, the race pays the points.",
      "Friday long-run pace predicts the race better than headline lap times.",
      "Qualifying is three knockout rounds; one error can ruin a front-runner's weekend.",
      "The mandatory tire-compound change guarantees pit-stop strategy in every dry race.",
    ],
    misconceptions: [
      {
        myth: "The fastest car in practice will win on Sunday.",
        reality: "Practice times are muddied by fuel loads and engine modes. Teams often 'sandbag' — hiding pace deliberately.",
      },
    ],
    facts: [
      "Being fastest in all three practice sessions, qualifying and the race is called a 'clean sweep' — it's rare even for dominant cars.",
      "The two-hour race limit exists partly because of Canada 2011, a rain-delayed race that took over four hours to complete.",
    ],
    next: ["qualifying", "sprint-weekends"],
  },
  {
    slug: "qualifying",
    title: "Qualifying",
    category: "foundations",
    difficulty: 1,
    minutes: 6,
    summary: "The knockout format, why the last two minutes of each segment are chaos, and how one lap decides a weekend.",
    sections: [
      {
        heading: "The knockout format",
        body: [
          "Qualifying is an hour of elimination: 18 minutes of Q1 with all 22 cars (slowest five out), 15 minutes of Q2 with 17 (five more out), then a 12-minute, ten-car shootout in Q3 for pole position. Your final position in the session becomes your grid slot for Sunday.",
          "The format guarantees drama at both ends: at the front, the pole battle; at the back, big names occasionally caught out by traffic, weather or a scrappy lap and eliminated eighteenth.",
        ],
        diagram: "qualifying-format",
      },
      {
        heading: "The anatomy of a flying lap",
        body: [
          "A qualifying run is three laps: an out-lap to heat the tires, the flying lap at maximum attack, and an in-lap back to the pits. Tires must reach their temperature window — push too early and they slide; too gently and they never switch on.",
          "Timing is everything. Teams launch cars to find clear air, because catching a slow car mid-lap costs tenths. In the final minutes of each segment the whole field funnels onto track at once, creating the traffic jams that regularly eliminate favorites.",
        ],
      },
      {
        heading: "Why pole matters (and when it doesn't)",
        body: [
          "Starting first means clean air, first pick into Turn 1, and strategic control. At circuits where overtaking is nearly impossible — Monaco, Hungary, Singapore — pole is worth more than at Monza or Spa, where slipstreams and DRS make the race order fluid.",
          "Statistically, roughly 40% of races are won from pole. The rest are won by strategy, starts and racecraft — which is why the championship rewards Sunday, not Saturday.",
        ],
      },
    ],
    quiz: [
      {
        question: "How many cars are eliminated in Q1?",
        options: ["Three", "Five", "Seven", "Ten"],
        answerIndex: 1,
        explanation: "The slowest five drop out in Q1 (P18–P22) and five more in Q2 (P13–P17), leaving ten for Q3.",
      },
      {
        question: "What is an out-lap for?",
        options: [
          "Cooling the engine",
          "Bringing tires and brakes up to temperature",
          "Saving fuel",
          "Showing the car to the crowd",
        ],
        answerIndex: 1,
        explanation: "Tires only grip within their temperature window, so the out-lap prepares them for the flying lap.",
      },
      {
        question: "Why do eliminations of top drivers happen most often in Q1?",
        options: [
          "Q1 uses harder tires",
          "Track traffic and single-run gambles can compromise a lap",
          "Top teams aren't allowed to run early",
          "Q1 is held in the dark",
        ],
        answerIndex: 1,
        explanation: "With 22 cars on track and some teams gambling on one run, traffic or a small error can trap anyone in the drop zone.",
      },
      {
        question: "At which type of circuit is pole position most valuable?",
        options: [
          "Long circuits with big straights",
          "Circuits where overtaking is nearly impossible",
          "High-altitude circuits",
          "Circuits with many DRS zones",
        ],
        answerIndex: 1,
        explanation: "Where passing is hardest — Monaco being the extreme — track position from qualifying largely decides the race.",
      },
    ],
    flashcards: [
      { front: "Q3", back: "The final 12-minute, ten-car shootout that decides pole position." },
      { front: "Flying lap", back: "A lap at maximum attack, sandwiched between a tire-warming out-lap and an in-lap." },
      { front: "Clear air", back: "Track space free of other cars — essential for an uncompromised qualifying lap." },
      { front: "Impeding", back: "Blocking another driver's flying lap; typically punished with a three-place grid penalty." },
    ],
    takeaways: [
      "Qualifying is three knockout segments: 22 cars → 17 → 10 → pole.",
      "Tire temperature and clear air make or break a flying lap.",
      "Pole's value depends on the circuit — everything at Monaco, less at Monza.",
    ],
    misconceptions: [
      {
        myth: "Qualifying position doesn't matter because you can overtake in the race.",
        reality: "About 40% of wins come from pole, and at several circuits the leader after Turn 1 is nearly unpassable without strategy.",
      },
    ],
    facts: [
      "The closest pole margin ever was 0.000s — Jerez 1997, where three drivers set an identical time to the thousandth.",
      "Ayrton Senna took pole in 40% of every race he entered — a strike rate never approached since.",
    ],
    next: ["sprint-weekends", "race-strategy"],
  },
  {
    slug: "sprint-weekends",
    title: "Sprint Weekends",
    category: "foundations",
    difficulty: 2,
    minutes: 5,
    summary: "The compressed format used at six events: two qualifying sessions, two races, and almost no practice.",
    sections: [
      {
        heading: "What changes on a sprint weekend",
        body: [
          "Six weekends per season run the sprint format. Friday keeps just one practice session before Sprint Qualifying (a shortened SQ1/SQ2/SQ3 knockout) sets Saturday's sprint grid. Saturday holds the sprint race — about 100 km, roughly a third of Grand Prix distance — followed by traditional qualifying for Sunday's main event.",
          "The compression is the point: with one hour of practice instead of three, setup mistakes are locked in early, and every session carries competitive stakes.",
        ],
      },
      {
        heading: "The sprint race",
        body: [
          "Sprints run flat-out with no mandatory pit stop — around 20 laps of pure racing. The top eight score points: 8, 7, 6, 5, 4, 3, 2, 1. That's enough to matter in a tight championship but not enough to make drivers cautious, which is exactly the balance the format aims for.",
          "The sprint result does not set Sunday's grid (it did in early versions of the format). Sunday's grid comes from its own qualifying session, so a sprint crash doesn't necessarily ruin the Grand Prix.",
        ],
      },
      {
        heading: "Strategy in miniature",
        body: [
          "With no required stop, sprint strategy is about tire choice for a single stint and first-lap positioning. Data gathered in the sprint — tire degradation, race pace, following in dirty air — feeds directly into Sunday's strategy planning, making the sprint a paid rehearsal.",
          "For teams starting out of position, the sprint is also a low-risk laboratory: try an aggressive setup or an unusual tire, and if it fails, Sunday is untouched.",
        ],
      },
    ],
    quiz: [
      {
        question: "How long is a sprint race?",
        options: ["About 50 km", "About 100 km", "About 200 km", "Full race distance"],
        answerIndex: 1,
        explanation: "Sprints run ~100 km — roughly a third of a Grand Prix — with no mandatory pit stop.",
      },
      {
        question: "How many drivers score points in a sprint?",
        options: ["Three", "Eight", "Ten", "All finishers"],
        answerIndex: 1,
        explanation: "The top eight score 8-7-6-5-4-3-2-1 points.",
      },
      {
        question: "What sets the grid for Sunday's Grand Prix on a sprint weekend?",
        options: [
          "The sprint race result",
          "Sprint Qualifying",
          "A separate traditional qualifying session",
          "Championship order",
        ],
        answerIndex: 2,
        explanation: "Since 2024's refinements, the Grand Prix has its own qualifying; the sprint and its SQ session are self-contained.",
      },
      {
        question: "Why do teams value sprint races strategically?",
        options: [
          "They allow engine changes without penalty",
          "They provide real race data (tire wear, pace) before Sunday",
          "They award double points",
          "They set the pit lane order",
        ],
        answerIndex: 1,
        explanation: "A sprint is effectively a paid dress rehearsal — real degradation and dirty-air data with limited championship risk.",
      },
    ],
    flashcards: [
      { front: "Sprint race", back: "A ~100 km Saturday race with no mandatory stop; top eight score 8 down to 1 point." },
      { front: "Sprint Qualifying (SQ)", back: "The shortened SQ1/SQ2/SQ3 knockout on Friday that sets the sprint grid." },
      { front: "Sprint weekends per season", back: "Six events run the sprint format." },
      { front: "Practice on sprint weekends", back: "Just one session (FP1) — setup mistakes get locked in early." },
    ],
    takeaways: [
      "Sprint weekends compress the schedule: one practice, two qualifying sessions, two races.",
      "Sprints award 8-7-6-5-4-3-2-1 points to the top eight.",
      "Sunday's grid comes from its own qualifying — the sprint is self-contained.",
    ],
    misconceptions: [
      {
        myth: "The sprint sets the grid for the Grand Prix.",
        reality: "That was the original 2021 format. Today the sprint is standalone, and Sunday has its own qualifying session.",
      },
    ],
    facts: [
      "The first sprint was held at Silverstone in 2021.",
      "China 2024 hosted a sprint on a track the current cars had never raced — after a single practice session.",
    ],
    next: ["championship-points", "race-strategy"],
  },
  {
    slug: "championship-points",
    title: "Championship Points",
    category: "foundations",
    difficulty: 1,
    minutes: 5,
    summary: "How points build titles: the 25-point win, sprint scoring, shortened-race rules and the tiebreakers.",
    sections: [
      {
        heading: "The scoring system",
        body: [
          "Grand Prix points pay the top ten: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1. Sprint races pay the top eight: 8 down to 1. Both drivers' hauls combine for the Constructors' Championship, so a team maxes out at 43 points per Grand Prix with a one-two finish.",
          "The bonus point for fastest lap was dropped after 2024 — lap records are now for glory only.",
        ],
        diagram: "points-table",
      },
      {
        heading: "The gaps are the game",
        body: [
          "The jump from P1 to P2 (7 points) is bigger than from P2 to P3 (3 points). This asymmetry shapes behavior: winning matters disproportionately, and a driver defending second from third may take fewer risks than one chasing a win.",
          "For teams, the difference between P10 and P11 in the constructors' standings is worth tens of millions in prize money — which is why backmarker teams celebrate a single point like a podium.",
        ],
      },
      {
        heading: "Special cases and tiebreakers",
        body: [
          "If a race is stopped and can't resume, points scale with distance completed: no points under two laps, then reduced scales (roughly quarter, half, three-quarter) until 75% distance unlocks full points. This rule was born at Spa 2021, where 'a race' of one lap behind the safety car paid half points.",
          "Championship ties are broken by countback: most wins, then most seconds, and so on. Titles have been decided this way — most famously in 1984 when Lauda beat Prost by half a point.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the maximum a team can score in one Grand Prix (no sprint)?",
        options: ["25 points", "43 points", "44 points", "50 points"],
        answerIndex: 1,
        explanation: "A one-two finish pays 25 + 18 = 43 points since the fastest-lap bonus was abolished after 2024.",
      },
      {
        question: "How are championship ties broken?",
        options: [
          "By most poles",
          "By countback of wins, then seconds, and so on",
          "By a playoff race",
          "By fastest average lap time",
        ],
        answerIndex: 1,
        explanation: "Countback compares finishing positions: most wins first, then most second places, continuing down the order.",
      },
      {
        question: "When do shortened races pay reduced points?",
        options: [
          "Whenever it rains",
          "When the race can't be resumed before 75% distance",
          "Only at street circuits",
          "Never — points are all or nothing",
        ],
        answerIndex: 1,
        explanation: "Sliding scales apply below 75% distance, a rule refined after the one-lap 'race' at Spa 2021.",
      },
      {
        question: "Why do small teams fight so hard for a single point?",
        options: [
          "Points transfer to next season",
          "Constructors' standings positions are worth millions in prize money",
          "A point guarantees a test day",
          "It avoids relegation",
        ],
        answerIndex: 1,
        explanation: "One position in the final constructors' table can be worth tens of millions of dollars in payments.",
      },
    ],
    flashcards: [
      { front: "Grand Prix points", back: "25-18-15-12-10-8-6-4-2-1 for the top ten finishers." },
      { front: "Sprint points", back: "8-7-6-5-4-3-2-1 for the top eight." },
      { front: "Tiebreaker", back: "Countback: most wins, then most second places, and so on down the order." },
      { front: "75% rule", back: "Full points require 75% race distance; shortened races pay reduced scales." },
    ],
    takeaways: [
      "Wins pay disproportionately: P1 is worth 7 more than P2, the biggest gap in the table.",
      "Both cars score for the constructors' title — consistency across two drivers wins it.",
      "Ties go to countback of wins; half-point races have decided titles.",
    ],
    misconceptions: [
      {
        myth: "Fastest lap earns a bonus point.",
        reality: "It did from 2019–2024 (if you finished top ten), but the bonus was dropped for 2025 onward.",
      },
    ],
    facts: [
      "The 1984 title was decided by half a point — the closest margin ever.",
      "Under the pre-2010 system a win paid just 10 points; today's 25-point wins reward victory much more heavily.",
    ],
    next: ["flags", "race-strategy"],
  },
  {
    slug: "flags",
    title: "Flags & Race Control",
    category: "foundations",
    difficulty: 1,
    minutes: 6,
    summary: "Yellow, red, blue and the rest — plus the Safety Car and Virtual Safety Car that reshape races.",
    sections: [
      {
        heading: "The flag language",
        body: [
          "Flags are racing's oldest communication system, now doubled by LED panels and cockpit lights. Yellow means danger — slow down, no overtaking (double yellows: be ready to stop). Green clears the hazard. Red stops the session entirely. Blue tells a lapped car to let the leaders through, and the black-and-white flag is a warning for unsporting driving — football's yellow card.",
          "The checkered flag needs no explanation, though it has been shown early by celebrity flag-wavers more than once, with chaotic results.",
        ],
        diagram: "flags",
      },
      {
        heading: "Safety Car and Virtual Safety Car",
        body: [
          "When a hazard needs marshals on track, race control deploys the Safety Car. The field bunches behind it at reduced speed, gaps evaporate, and pit stops suddenly cost half as much time — which is why a well-timed safety car can flip a race on its head.",
          "The Virtual Safety Car (VSC) achieves the slowdown without the bunching: every driver must stay above a reference 'delta' time, roughly preserving the gaps. Introduced after Jules Bianchi's 2014 accident, it's used for smaller hazards.",
        ],
      },
      {
        heading: "Red flags and restarts",
        body: [
          "A red flag suspends the session: cars file into the pit lane and wait. During the stoppage teams may change tires and repair damage — a free reset that has rescued races for some and stolen them from others.",
          "Restarts happen either as a rolling start behind the safety car or a full standing restart from the grid, at race control's discretion. A late red flag effectively creates a sprint to the finish.",
        ],
      },
    ],
    quiz: [
      {
        question: "What must a driver do under double yellow flags?",
        options: [
          "Maintain pace but not overtake",
          "Slow significantly and be prepared to stop",
          "Pit immediately",
          "Turn on rain lights",
        ],
        answerIndex: 1,
        explanation: "Double yellows signal a major hazard — significant speed reduction and readiness to stop, with overtaking forbidden.",
      },
      {
        question: "Who receives the blue flag?",
        options: [
          "The race leader",
          "A car about to be lapped",
          "A car with damage",
          "A driver under investigation",
        ],
        answerIndex: 1,
        explanation: "Blue flags order backmarkers to let the lapping leaders through — ignoring three brings a penalty.",
      },
      {
        question: "What's the key difference between the Safety Car and the VSC?",
        options: [
          "The VSC is only used in rain",
          "The Safety Car bunches the field; the VSC roughly preserves gaps",
          "The VSC ends the race",
          "The Safety Car applies only to leaders",
        ],
        answerIndex: 1,
        explanation: "Behind the physical safety car everyone closes up; under VSC all cars slow to a delta time, keeping gaps intact.",
      },
      {
        question: "What can teams do during a red-flag stoppage?",
        options: [
          "Nothing — cars are impounded",
          "Change tires and repair damage",
          "Swap drivers",
          "Refuel the car",
        ],
        answerIndex: 1,
        explanation: "Work is allowed on cars in the red-flag queue, including tire changes — a strategic 'free stop' that often reshapes the race.",
      },
      {
        question: "Why can a safety car flip race strategy?",
        options: [
          "It forces everyone to pit",
          "Pit stops cost far less time while the field runs slowly",
          "It awards bonus points",
          "It resets tire wear",
        ],
        answerIndex: 1,
        explanation: "With the pack slowed, the ~20-second pit loss shrinks dramatically — a 'cheap' stop that rewards the lucky and the brave.",
      },
    ],
    flashcards: [
      { front: "Yellow flag", back: "Danger ahead — slow down, no overtaking. Doubled when marshals or a stopped car are on track." },
      { front: "Blue flag", back: "Shown to backmarkers: let the lapping car through within three flags or be penalized." },
      { front: "VSC", back: "Virtual Safety Car — all cars slow to a delta time; gaps are preserved, no physical car deploys." },
      { front: "Red flag", back: "Session stopped. Cars queue in the pits; tire changes and repairs are permitted." },
      { front: "Black-and-white flag", back: "A formal warning for unsporting behavior — the 'yellow card' of F1." },
    ],
    takeaways: [
      "Flags are safety-critical law: yellow slows the race, red stops it, blue manages lapped traffic.",
      "The Safety Car bunches the field and makes pit stops cheap; the VSC slows everyone while preserving gaps.",
      "Red-flag stoppages allow repairs and tire changes — a strategic wildcard.",
    ],
    misconceptions: [
      {
        myth: "The Safety Car is just a pace car for show.",
        reality: "Its deployment changes strategy mathematics instantly — races are regularly won and lost on safety-car timing.",
      },
    ],
    facts: [
      "The Safety Car is a full performance car driven flat out — F1 cars still struggle to keep temperature behind it.",
      "At the 2018 Canadian GP, model Winnie Harlow waved the checkered flag a lap early; results were counted back accordingly.",
    ],
    next: ["safety", "pit-stops"],
  },
];
