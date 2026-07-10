/** Rules reference content — the sporting and technical rulebook, explained. */

export type RuleItem = { rule: string; explanation: string };

export type RuleSection = {
  id: string;
  title: string;
  summary: string;
  items: RuleItem[];
};

export const RULE_SECTIONS: RuleSection[] = [
  {
    id: "points",
    title: "Points & Championships",
    summary: "How races convert into titles.",
    items: [
      {
        rule: "Grand Prix points: 25-18-15-12-10-8-6-4-2-1",
        explanation:
          "The top ten score. Both drivers' points combine for the Constructors' Championship, which determines prize money.",
      },
      {
        rule: "Sprint points: 8-7-6-5-4-3-2-1",
        explanation: "Saturday sprints at six events pay the top eight, with no mandatory pit stop during the ~100 km race.",
      },
      {
        rule: "Shortened races pay reduced points",
        explanation:
          "Below 75% distance, sliding scales apply; under two completed racing laps, no points at all.",
      },
      {
        rule: "Ties broken by countback",
        explanation: "Most wins decides a points tie, then most second places, and so on down the finishing order.",
      },
    ],
  },
  {
    id: "race-weekend",
    title: "Sessions & Procedure",
    summary: "The rules that structure the weekend.",
    items: [
      {
        rule: "Qualifying: Q1 (18 min) → Q2 (15) → Q3 (12)",
        explanation: "Five cars eliminated in each of the first two segments; the top ten fight for pole in Q3.",
      },
      {
        rule: "The 107% rule",
        explanation:
          "Qualifiers slower than 107% of the fastest Q1 time may not race unless stewards grant an exception (e.g., strong practice pace).",
      },
      {
        rule: "Parc fermé from qualifying",
        explanation:
          "Setup is frozen from the start of qualifying. Substantive changes force a pit-lane start.",
      },
      {
        rule: "Race distance: ~305 km or 2 hours",
        explanation:
          "The fewest whole laps exceeding 305 km (Monaco excepted). A 3-hour absolute limit covers suspensions.",
      },
      {
        rule: "Two dry compounds mandatory",
        explanation: "In a dry race each driver must use two different slick compounds — guaranteeing at least one stop.",
      },
      {
        rule: "80 km/h pit-lane speed limit",
        explanation: "Enforced to the km/h with automatic penalties; it exists for crew safety.",
      },
    ],
  },
  {
    id: "flags-sc",
    title: "Flags, Safety Cars & Stoppages",
    summary: "Race neutralization and hazard management.",
    items: [
      {
        rule: "Yellow flags: slow down, no overtaking",
        explanation: "Single yellow = hazard near track; double yellow = hazard on track, be prepared to stop.",
      },
      {
        rule: "Safety Car bunches the field",
        explanation:
          "Lapped cars may be waved past before restarts. Pit stops under SC cost roughly half the normal time — a strategic lottery.",
      },
      {
        rule: "Virtual Safety Car preserves gaps",
        explanation: "All drivers must respect a minimum 'delta' lap time; no bunching occurs.",
      },
      {
        rule: "Red flag stops the session",
        explanation:
          "Cars queue in the pit lane. Tire changes and repairs are allowed — a free strategic reset that regularly reshapes races.",
      },
      {
        rule: "Blue flags for backmarkers",
        explanation: "A car about to be lapped must yield within three blue flags or receive a penalty.",
      },
    ],
  },
  {
    id: "penalties",
    title: "Penalties",
    summary: "The enforcement ladder for driving and procedural offenses.",
    items: [
      {
        rule: "5s / 10s time penalties",
        explanation: "Served at the next pit stop (crew must wait before working) or added to race time.",
      },
      {
        rule: "Drive-through and stop-go",
        explanation:
          "Drive through the pit lane at the limiter (~20s cost), or stop for 10 seconds with no work — the harsher option.",
      },
      {
        rule: "Grid penalties",
        explanation: "Applied at the next race for gearbox/engine changes beyond allocation or serious offenses.",
      },
      {
        rule: "Superlicence penalty points",
        explanation: "Incidents add points to a driver's licence; 12 within 12 months triggers a one-race ban.",
      },
      {
        rule: "Track limits",
        explanation:
          "All four wheels beyond the white line invalidates the lap time; repeated abuse in races brings time penalties.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Essentials",
    summary: "What makes a 2026 car legal.",
    items: [
      {
        rule: "Minimum weight: 768 kg",
        explanation: "Car plus driver. Teams fight for every gram because ~10 kg costs roughly 0.3s per lap.",
      },
      {
        rule: "Power unit: 1.6L turbo-hybrid V6, ~50/50 split",
        explanation:
          "Roughly 400 kW combustion + 350 kW electric under 2026 rules, running 100% sustainable fuel with energy-flow limits.",
      },
      {
        rule: "Active aerodynamics",
        explanation:
          "Movable wings switch between low-drag X-mode (straights) and high-downforce Z-mode (corners); a manual-override energy boost aids overtaking.",
      },
      {
        rule: "Component allocations",
        explanation: "Limited engines, turbos, batteries and gearboxes per season; exceeding allocation = grid penalties.",
      },
      {
        rule: "Crash tests",
        explanation:
          "Chassis must pass FIA impact, roll and halo load tests before a car may run a single lap.",
      },
      {
        rule: "The plank",
        explanation:
          "The wooden skid block under the floor may wear no more than 1 mm during a race — proof the car ran a legal ride height.",
      },
    ],
  },
  {
    id: "money",
    title: "Money & Fairness",
    summary: "The financial regulations that level the field.",
    items: [
      {
        rule: "Budget cap (~$135M, indexed)",
        explanation:
          "Covers most performance spending. Exceeding it brought Red Bull a fine and wind-tunnel reduction for 2021's breach.",
      },
      {
        rule: "Aerodynamic testing restrictions",
        explanation:
          "Wind-tunnel and CFD hours scale inversely with championship position — the leader gets the least development time.",
      },
      {
        rule: "Curfews",
        explanation: "Mechanics must have overnight rest periods during race weekends, with a limited number of exceptions per season.",
      },
      {
        rule: "New team requirements",
        explanation: "Entrants pay an anti-dilution fee and must prove technical and financial capability — the bar Cadillac cleared for 2026.",
      },
    ],
  },
];
