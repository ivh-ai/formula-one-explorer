import type { Lesson } from "@/content/lessons/types";

export const RULES_LESSONS: Lesson[] = [
  {
    slug: "technical-regulations",
    title: "Technical Regulations",
    category: "rules",
    difficulty: 3,
    minutes: 7,
    summary: "The rulebook that defines the cars — and the loophole-hunting culture that defines the sport.",
    sections: [
      {
        heading: "What the technical rules govern",
        body: [
          "The FIA Technical Regulations run to hundreds of pages defining every dimension: bodywork boxes, wing sizes, floor geometry, minimum weight (768 kg from 2026), power-unit architecture, fuel-flow limits, crash-test requirements. Cars are measured, weighed and inspected ('scrutineering') throughout every weekend.",
          "The rules exist in tension with themselves: tight enough to keep costs and speeds sane, loose enough that clever engineering is rewarded. That gap is where championships are won.",
        ],
      },
      {
        heading: "The loophole hall of fame",
        body: [
          "F1's history is a museum of legal-until-banned inventions: Brabham's 1978 'fan car' (won its only race), the 2009 double diffuser (won Brawn both titles), the 2010 F-duct, the 2020 Mercedes DAS steering system. Each exploited wording, not intent — and each was outlawed only after proving devastating.",
          "The modern process is more collaborative: teams query the FIA before building ('is this legal?'), and technical directives clarify gray areas mid-season. But the treasure hunt never stops.",
        ],
      },
      {
        heading: "Enforcement",
        body: [
          "Legality checks include template measurements, deflection tests (bodywork must not flex beyond limits), weighbridge checks, fuel analysis, and the plank — a wooden skid block whose excessive wear proves a car ran illegally low. Disqualifications happen: Hamilton and Leclerc were both excluded from Austin 2023 for plank wear.",
          "Post-race, any car can be torn down for inspection. Championship-deciding technical protests are rare but seismic when they land.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is 'scrutineering'?",
        options: [
          "Media interviews",
          "The FIA's technical inspection of cars for legality",
          "Steward review of driving incidents",
          "Pre-race tire checks by Pirelli",
        ],
        answerIndex: 1,
        explanation: "Scrutineers measure, weigh and test cars against the technical regulations throughout the weekend.",
      },
      {
        question: "What does the plank under the car enforce?",
        options: ["Aerodynamic balance", "Minimum ride height", "Maximum weight", "Fuel capacity"],
        answerIndex: 1,
        explanation: "Excessive plank wear proves the car ran too low — grounds for disqualification, as at Austin 2023.",
      },
      {
        question: "What was the 2009 double diffuser?",
        options: [
          "An illegal engine mode",
          "A rules loophole that won Brawn GP both championships",
          "A tire-warming device",
          "A braking system",
        ],
        answerIndex: 1,
        explanation: "Three teams read the diffuser rules creatively; Brawn exploited it best and won both titles before rivals caught up.",
      },
      {
        question: "Why do teams query the FIA before building novel designs?",
        options: [
          "It's legally required",
          "To avoid investing in a concept that gets banned as illegal",
          "To share ideas with rivals",
          "To earn development credits",
        ],
        answerIndex: 1,
        explanation: "A pre-clearance opinion protects millions in development spend from a scrutineering surprise.",
      },
    ],
    flashcards: [
      { front: "Scrutineering", back: "FIA technical inspection — measuring, weighing and testing cars for rules compliance." },
      { front: "Technical directive", back: "Mid-season FIA clarification of how a regulation will be interpreted and enforced." },
      { front: "Deflection tests", back: "Load tests ensuring bodywork doesn't flex beyond legal limits at speed." },
      { front: "The plank", back: "Wooden skid block under the floor; wear beyond 1mm tolerance = disqualification." },
    ],
    takeaways: [
      "Technical rules define boxes; engineers win by filling them more cleverly than rivals.",
      "The great loopholes — fan car, double diffuser, DAS — were legal on wording, banned on effect.",
      "Enforcement is physical: templates, load tests, the plank, and post-race teardowns.",
    ],
    misconceptions: [
      {
        myth: "Rule-bending is cheating.",
        reality: "Exploiting the letter of the rules is the sport's celebrated core skill; actual cheating (hidden systems, fuel-flow deception) is rare and severely punished.",
      },
    ],
    facts: [
      "The Brabham fan car won its only Grand Prix in 1978 and was withdrawn before it could be banned.",
      "Mercedes' DAS system let drivers change front toe by pushing the steering wheel — legal for exactly one season.",
    ],
    next: ["sporting-regulations", "engineering"],
  },
  {
    slug: "sporting-regulations",
    title: "Sporting Regulations",
    category: "rules",
    difficulty: 2,
    minutes: 6,
    summary: "The rules of competition: race procedure, parc fermé, penalties, and the paperwork that shapes Sundays.",
    sections: [
      {
        heading: "Running the event",
        body: [
          "The Sporting Regulations govern everything that isn't the car: session formats, grid procedures, safety-car rules, pit-lane conduct, points, and penalties. Where the technical rules are physics, the sporting rules are law — and just as contested.",
          "Key mechanisms include parc fermé (setup frozen from qualifying onward), the 107% qualifying cut, tire allocation rules, and curfews limiting overnight mechanic work.",
        ],
      },
      {
        heading: "The penalty ladder",
        body: [
          "Driving offenses draw escalating punishments: time penalties (5s or 10s, served at a stop or added post-race), drive-throughs, stop-go penalties, grid drops for the next race, penalty points on the superlicence (12 in a year = one-race ban), and in extremis disqualification or race bans.",
          "Causing a collision, unsafe release, speeding in the pit lane, track-limits abuse and impeding in qualifying are the everyday currency of steward decisions.",
        ],
      },
      {
        heading: "Parc fermé and why it matters",
        body: [
          "From qualifying until the race, cars sit under parc fermé conditions: only minor maintenance allowed, no setup changes. Get your setup wrong on Saturday and you carry it through Sunday — or break the seal and start from the pit lane.",
          "The rule exists to prevent qualifying-special cars and to cap costs; its side effect is drama whenever weather flips between Saturday and Sunday and everyone is locked into the wrong configuration.",
        ],
      },
    ],
    quiz: [
      {
        question: "What does parc fermé restrict?",
        options: [
          "Media access to the garage",
          "Car setup changes between qualifying and the race",
          "Driver curfews",
          "Fan access to the paddock",
        ],
        answerIndex: 1,
        explanation: "Setup is frozen from qualifying; significant changes mean starting from the pit lane.",
      },
      {
        question: "How many superlicence penalty points trigger a race ban?",
        options: ["5", "8", "12", "20"],
        answerIndex: 2,
        explanation: "Accumulating 12 points within 12 months brings an automatic one-race ban.",
      },
      {
        question: "What is a drive-through penalty?",
        options: [
          "Passing through the pit lane at the speed limit without stopping",
          "A 25-second time penalty",
          "Being sent to the back of the grid",
          "Losing DRS for five laps",
        ],
        answerIndex: 0,
        explanation: "The driver must enter and traverse the pit lane at limited speed — costing roughly 20 seconds.",
      },
      {
        question: "What does the 107% rule govern?",
        options: [
          "Maximum fuel load",
          "Minimum qualifying pace required to be allowed to race",
          "Budget cap tolerance",
          "Engine allocation",
        ],
        answerIndex: 1,
        explanation: "Qualifying beyond 107% of the fastest Q1 time means exclusion from the race unless stewards grant an exception.",
      },
    ],
    flashcards: [
      { front: "Parc fermé", back: "The setup freeze from qualifying to race start — 'closed park'." },
      { front: "Penalty points", back: "Superlicence demerits; 12 in a rolling year = one-race ban." },
      { front: "Stop-go penalty", back: "Stop in the pit box for 10 seconds with no work performed — the harshest in-race penalty short of disqualification." },
      { front: "Curfew", back: "Mandatory overnight breaks for mechanics; limited exceptions per season." },
    ],
    takeaways: [
      "Sporting regs govern the competition itself: formats, procedures and punishments.",
      "The penalty ladder escalates from 5-second penalties to race bans.",
      "Parc fermé locks Saturday's setup into Sunday — a rule that regularly creates drama.",
    ],
    misconceptions: [
      {
        myth: "Penalties are arbitrary.",
        reality: "Stewards work from published guidelines and precedent databases; the appearance of inconsistency usually comes from genuinely different circumstances.",
      },
    ],
    facts: [
      "Teams may break curfew a limited number of times per season — the all-nighter is a rationed resource.",
      "The 107% rule dates to 1996, was dropped, and returned in 2011.",
    ],
    next: ["stewards", "technical-regulations"],
  },
  {
    slug: "stewards",
    title: "Stewards & Race Control",
    category: "rules",
    difficulty: 2,
    minutes: 5,
    summary: "Who actually decides penalties, how incidents are judged, and why fans argue about every verdict.",
    sections: [
      {
        heading: "The chain of command",
        body: [
          "Race control, led by the FIA race director, runs the event operationally: flags, safety cars, session stoppages, track limits monitoring. The stewards — a rotating panel including at least one experienced ex-driver — judge incidents and issue penalties. Race control notes an incident; stewards investigate and decide.",
          "Teams can't appeal most in-race decisions, but they can seek a 'right of review' with significant new evidence.",
        ],
      },
      {
        heading: "How incidents are judged",
        body: [
          "Stewards review multiple camera angles, telemetry (steering, throttle, brake traces), GPS lines and team radio before ruling. Standard doctrines exist: the overtaking car must be 'substantially alongside' at the apex to claim space; forcing a car off track earns a penalty; first-lap incidents get more tolerance ('lap-one racing incident').",
          "Verdicts range from 'no further action' through warnings, time penalties, and grid drops — each published with written reasoning.",
        ],
      },
      {
        heading: "Why controversy is permanent",
        body: [
          "Racing incidents are judgment calls at 300 km/h between competing narratives — and every verdict makes one fanbase furious. The sport has responded with more transparency: published decision documents, steward guidelines shared with teams, and driver representation on panels.",
          "Abu Dhabi 2021 remains the reference case for race-control controversy; its aftermath reshaped race direction, introducing rotating race directors and a remote 'virtual race control' support room.",
        ],
      },
    ],
    quiz: [
      {
        question: "Who issues penalties for driving incidents?",
        options: ["The race director", "The stewards panel", "The FIA president", "Team principals' vote"],
        answerIndex: 1,
        explanation: "Race control manages the event; the stewards (including an ex-driver) investigate incidents and impose penalties.",
      },
      {
        question: "What evidence do stewards review?",
        options: [
          "Only the TV broadcast",
          "Multiple cameras, telemetry, GPS and team radio",
          "Fan votes",
          "Only driver statements",
        ],
        answerIndex: 1,
        explanation: "Panels see far more than viewers: every angle, every data trace, every radio call.",
      },
      {
        question: "When must an attacking car be 'substantially alongside'?",
        options: [
          "On the straight",
          "At the apex, to be entitled to racing room in the corner",
          "In the pit lane",
          "Behind the safety car",
        ],
        answerIndex: 1,
        explanation: "The alongside-at-the-apex doctrine determines who owns the corner in most side-by-side disputes.",
      },
      {
        question: "What changed after Abu Dhabi 2021?",
        options: [
          "Nothing",
          "Race direction was restructured with rotation and a remote support room",
          "Safety cars were abolished",
          "Stewards were replaced by AI",
        ],
        answerIndex: 1,
        explanation: "The controversial finale led to new race directors, rotating assignments and a 'virtual race control' backup team.",
      },
    ],
    flashcards: [
      { front: "Race director", back: "The FIA official operating the event: flags, safety cars, procedures." },
      { front: "Stewards", back: "The judging panel (with an ex-driver) that investigates incidents and issues penalties." },
      { front: "Racing incident", back: "A verdict of shared/no blame — no penalty issued." },
      { front: "Right of review", back: "A team's petition to reopen a decision with significant new evidence." },
    ],
    takeaways: [
      "Race control operates the race; stewards judge it.",
      "Panels rule with far more evidence than viewers ever see.",
      "Doctrines like 'alongside at the apex' structure most wheel-to-wheel verdicts.",
    ],
    misconceptions: [
      {
        myth: "Stewards are anonymous bureaucrats who've never raced.",
        reality: "Every panel includes at least one experienced former racing driver, and decisions are published with reasoning.",
      },
    ],
    facts: [
      "Steward panels rotate between events — a deliberate anti-bias design that also fuels consistency debates.",
      "Modern decision documents cite precedent incidents by name, like case law.",
    ],
    next: ["sporting-regulations", "flags"],
  },
  {
    slug: "safety",
    title: "Safety",
    category: "rules",
    difficulty: 2,
    minutes: 7,
    summary: "From killing a driver a season to surviving 67g: the engineering and rules that transformed F1's survivability.",
    sections: [
      {
        heading: "The dark decades",
        body: [
          "In the 1950s–70s, Formula One killed drivers at a rate that is difficult to comprehend today — often several per season across F1 and its feeder categories. Circuits had trees and houses for barriers; cars carried fuel tanks beside the driver; fire was the great terror.",
          "Jackie Stewart's safety campaign — barriers, medical facilities, track standards — made him unpopular with organizers and immortal to everyone who raced after him.",
        ],
      },
      {
        heading: "The Senna watershed and after",
        body: [
          "Imola 1994 — Senna and Ratzenberger dying on consecutive days — triggered the modern safety revolution: the FIA Institute, crash-test regimes, higher cockpit sides, wheel tethers, the HANS device protecting the neck, and circuit redesigns replacing gravel and walls with asphalt runoff.",
          "Twenty years of relentless iteration meant that when Robert Kubica hit a wall at 75g in Canada 2007, he missed one race. When Romain Grosjean's car split a barrier and burned in Bahrain 2020, the halo, survival cell and fireproofs let him walk out of the flames.",
        ],
      },
      {
        heading: "The halo and the modern toolkit",
        body: [
          "The halo — the titanium hoop over the cockpit, mandatory since 2018 — was initially mocked on aesthetic grounds. It has since been credited with saving multiple lives (Leclerc at Spa 2018, Grosjean 2020, Zhou at Silverstone 2022, Hamilton at Monza 2021). Nobody mocks it now.",
          "Today's toolkit: the survival cell, halo, HANS, biometric gloves, accident data recorders, the Medical Car chasing lap one, extrication-trained marshals, and the VSC/safety-car protocols born from Bianchi's 2014 accident. Safety is now a design discipline equal to aerodynamics.",
        ],
      },
    ],
    quiz: [
      {
        question: "What triggered the modern F1 safety revolution?",
        options: [
          "A sponsor requirement",
          "The deaths of Senna and Ratzenberger at Imola 1994",
          "A fan referendum",
          "Television pressure",
        ],
        answerIndex: 1,
        explanation: "The 1994 Imola weekend transformed safety from concern into systematic engineering discipline.",
      },
      {
        question: "What is the halo?",
        options: [
          "A helmet brand",
          "The titanium cockpit-protection hoop, mandatory since 2018",
          "A pit-lane light system",
          "A tire compound",
        ],
        answerIndex: 1,
        explanation: "The halo withstands the weight of a bus and has been credited with saving several drivers.",
      },
      {
        question: "Which driver led the 1960s–70s safety crusade?",
        options: ["Niki Lauda", "Jackie Stewart", "Juan Manuel Fangio", "James Hunt"],
        answerIndex: 1,
        explanation: "Stewart campaigned for barriers, medical standards and track changes — resisted then, honored ever since.",
      },
      {
        question: "What did the Virtual Safety Car emerge from?",
        options: [
          "Cost-saving measures",
          "Jules Bianchi's 2014 Suzuka accident",
          "A television experiment",
          "The 2005 US Grand Prix",
        ],
        answerIndex: 1,
        explanation: "Bianchi's fatal collision with a recovery vehicle under yellows led to the VSC's controlled slow-down protocol.",
      },
    ],
    flashcards: [
      { front: "Halo", back: "Titanium cockpit hoop (2018+) — supports ~12 tonnes; multiple lives saved." },
      { front: "HANS device", back: "Head And Neck Support — tethers the helmet to prevent fatal whiplash injuries." },
      { front: "Survival cell", back: "The carbon monocoque built to stay intact through massive impacts." },
      { front: "Medical Car", back: "Follows the field on lap one, carrying a doctor to any startline incident within seconds." },
    ],
    takeaways: [
      "F1 went from a driver death nearly every season to two decades with a single race-weekend fatality.",
      "Each tragedy produced systems: Imola 1994 → crash-testing era; Bianchi 2014 → VSC; Grosjean 2020 validated the halo.",
      "Safety is now a core engineering discipline, not an afterthought.",
    ],
    misconceptions: [
      {
        myth: "Modern F1 is dangerous the way it always was.",
        reality: "Drivers have survived 67g and 75g impacts and fires that would have been unsurvivable in any earlier era. Danger remains; fatality has become extraordinarily rare.",
      },
    ],
    facts: [
      "Grosjean's 2020 fireball lasted 27 seconds; his fireproof suit was rated for 20. He escaped with burned hands.",
      "Zhou Guanyu's car slid upside down through gravel and over a barrier at Silverstone 2022 — he was unhurt, thanks largely to the halo.",
    ],
    next: ["flags", "history-of-f1"],
  },
];
