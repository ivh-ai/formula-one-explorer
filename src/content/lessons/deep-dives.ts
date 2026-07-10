import type { Lesson } from "@/content/lessons/types";

export const DEEP_DIVE_LESSONS: Lesson[] = [
  {
    slug: "history-of-f1",
    title: "History of Formula One",
    category: "deep-dives",
    difficulty: 2,
    minutes: 10,
    summary: "Seventy-five years in one lesson: the eras, revolutions and rivalries that built the modern sport.",
    sections: [
      {
        heading: "1950–1967: Pioneers and revolutionaries",
        body: [
          "The World Championship began at Silverstone in May 1950 with front-engined machines and pre-war heroes. Juan Manuel Fangio won five titles with four different teams — a percentage dominance never matched. Then Cooper put the engine behind the driver (1959–60), the British 'garagistas' overthrew the continental factories, and Jim Clark's Lotus years redefined what smooth speed looked like.",
        ],
      },
      {
        heading: "1968–1993: Money, wings, ground effect and war",
        body: [
          "Sponsorship (1968) professionalized the sport; wings and then ground effect (Lotus 79, 1978) revealed that aerodynamics, not engines, was the frontier. Turbos arrived with Renault (1977) and grew to 1,400-hp qualifying monsters by the mid-80s.",
          "The era's soul was rivalry: Lauda–Hunt in 1976 (near-death and a one-point title), Prost–Senna at McLaren — teammates who decided two championships by collision — and Mansell–Piquet tearing Williams apart from within.",
        ],
      },
      {
        heading: "1994–2013: Tragedy, Schumacher and the aero wars",
        body: [
          "Imola 1994 took Senna and Ratzenberger and forced the safety revolution. Michael Schumacher rebuilt Ferrari from chaos into the most ruthless machine in sport: five straight titles (2000–04) and records thought permanent. Alonso ended the reign; Hamilton announced himself by losing the 2007 title by one point as a rookie, then winning 2008's by one point at the final corner.",
          "Brawn GP's £1 fairy tale (2009) and Vettel's four Red Bull titles (2010–13) closed the V8 era — the last before the hybrid transformation.",
        ],
      },
      {
        heading: "2014–present: Hybrids, Netflix and new money",
        body: [
          "The 2014 hybrid rules began Mercedes' eight straight constructors' titles and Hamilton's march to seven championships. Verstappen ended it in the 2021 Abu Dhabi controversy, then dominated the new ground-effect era with a record 19-win 2023.",
          "Off track, Liberty Media's ownership, Drive to Survive and the American boom (three US races) transformed F1's audience, while the budget cap rewired its economics. McLaren's 2024–25 resurgence and the 2026 regulations reset — 11 teams, Audi, Cadillac, 50/50 hybrids — opened the sport's newest chapter.",
        ],
      },
    ],
    quiz: [
      {
        question: "Where and when was the first World Championship race?",
        options: [
          "Monza, 1949",
          "Silverstone, May 1950",
          "Monaco, 1955",
          "Le Mans, 1950",
        ],
        answerIndex: 1,
        explanation: "Silverstone, a converted bomber airfield, hosted round one on 13 May 1950.",
      },
      {
        question: "What made the Cooper cars of 1959–60 revolutionary?",
        options: [
          "First use of wings",
          "The engine sat behind the driver",
          "Turbocharging",
          "Carbon-fiber chassis",
        ],
        answerIndex: 1,
        explanation: "The rear-engine layout transformed weight distribution; within two seasons everyone had copied it.",
      },
      {
        question: "Which car proved ground effect in 1978?",
        options: ["Ferrari 312T", "Lotus 79", "McLaren M23", "Brabham BT46B"],
        answerIndex: 1,
        explanation: "The Lotus 79's underbody aerodynamics gave Andretti a dominant title and set F1's aero agenda permanently.",
      },
      {
        question: "Who won five consecutive titles with Ferrari?",
        options: [
          "Niki Lauda",
          "Alain Prost",
          "Michael Schumacher",
          "Sebastian Vettel",
        ],
        answerIndex: 2,
        explanation: "Schumacher's 2000–2004 run with Ferrari remains the longest consecutive title streak.",
      },
      {
        question: "What characterized the 2014–2021 period?",
        options: [
          "Ferrari dominance",
          "Mercedes' hybrid-era dominance — eight straight constructors' titles",
          "No championships awarded",
          "V12 engines",
        ],
        answerIndex: 1,
        explanation: "Mercedes mastered the hybrid rules first and converted it into the longest team dominance in F1 history.",
      },
    ],
    flashcards: [
      { front: "First champion", back: "Giuseppe Farina (1950, Alfa Romeo); Fangio then won five of the next seven." },
      { front: "Garagistas", back: "Enzo Ferrari's sneer at the small British teams — who proceeded to beat him with innovation." },
      { front: "Imola 1994", back: "The weekend Senna and Ratzenberger died — the watershed of modern safety." },
      { front: "Drive to Survive", back: "The Netflix series (2019+) that ignited F1's global and American boom." },
      { front: "2026 reset", back: "New 50/50 hybrid rules, active aero, sustainable fuel, 11 teams with Audi and Cadillac." },
    ],
    takeaways: [
      "Every era was defined by a revolution: rear engines, sponsorship, ground effect, hybrids.",
      "Rivalries — Lauda/Hunt, Senna/Prost, Hamilton/Verstappen — are the sport's connective tissue.",
      "Tragedy repeatedly forced reinvention; safety is F1's most complete engineering victory.",
    ],
    misconceptions: [
      {
        myth: "F1 was always a global mega-sport.",
        reality: "For decades it was a largely European affair that nearly bankrupted half its grid; the current global boom is a 2017+ phenomenon.",
      },
    ],
    facts: [
      "Fangio won 24 of his 52 championship races — a 46% win rate no modern driver approaches.",
      "The Indianapolis 500 counted toward the F1 championship from 1950–1960, though almost no F1 drivers entered.",
    ],
    next: ["future-of-f1", "intro-to-f1"],
  },
  {
    slug: "future-of-f1",
    title: "The Future of Formula One",
    category: "deep-dives",
    difficulty: 2,
    minutes: 6,
    summary: "Where the sport is heading: the 2026 rules era, sustainability, expansion and the technologies coming next.",
    sections: [
      {
        heading: "The 2026 era, just begun",
        body: [
          "The current regulations are the largest combined chassis-and-engine reset in decades: nearly 50/50 hybrid power, 100% sustainable fuel, smaller and lighter cars, and active aerodynamics replacing DRS. Rules resets historically scramble the pecking order — the teams that master these rules first will define the next half-decade.",
          "The grid grew to eleven teams with Cadillac's arrival and Audi's transformation of Sauber — the first major manufacturer expansion since the 2010s, drawn in by cost caps and sustainable fuel.",
        ],
      },
      {
        heading: "Sustainability as strategy",
        body: [
          "F1 targets net-zero carbon by 2030. The racing cars are the showcase — sustainable drop-in fuels that could decarbonize existing road cars — but the bigger footprint is logistics: freight, travel and 24-race calendars. Expect regionalized calendars, biofueled freight and remote operations to keep growing.",
          "The bet is commercial as much as moral: manufacturers stay (and join) because F1 develops technology their road divisions can use.",
        ],
      },
      {
        heading: "What's coming next",
        body: [
          "Expansion pressure continues: more American engagement, rotating European venues, and interest from Africa (Kyalami) and Asia. Broadcasting is shifting streaming-first, and AI now assists everything from strategy modeling to race-control decision support.",
          "Perennial debates will shape the 2030s: should cars get smaller and lighter still? Can a cost-capped sport support twelve or thirteen teams? Does automation belong in racing, or is the driver's primacy sacred? F1's history suggests the answer to every question is: whatever keeps the show fast, close and loud.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is F1's stated sustainability target?",
        options: [
          "Carbon neutral by 2050",
          "Net-zero carbon by 2030",
          "Electric cars by 2028",
          "No stated target",
        ],
        answerIndex: 1,
        explanation: "The sport targets net-zero by 2030, with sustainable fuel and logistics reform as the main levers.",
      },
      {
        question: "Where does most of F1's carbon footprint come from?",
        options: [
          "The race cars",
          "Logistics — freight and travel",
          "Team factories",
          "Fan events",
        ],
        answerIndex: 1,
        explanation: "The cars are under 1% of the footprint; moving the circus around the world is the real cost.",
      },
      {
        question: "Which two manufacturers joined the grid around the 2026 reset?",
        options: [
          "Toyota and Porsche",
          "Audi and Cadillac",
          "BMW and Hyundai",
          "Peugeot and Lamborghini",
        ],
        answerIndex: 1,
        explanation: "Audi absorbed Sauber as a works team; Cadillac arrived as the first all-new team since 2016.",
      },
      {
        question: "Why do rules resets excite fans?",
        options: [
          "Cheaper tickets",
          "They historically scramble the competitive order",
          "They shorten races",
          "They add more points",
        ],
        answerIndex: 1,
        explanation: "Brawn 2009 and Mercedes 2014 both proved a reset can crown unexpected masters overnight.",
      },
    ],
    flashcards: [
      { front: "2026 regulations", back: "~50/50 hybrid, sustainable fuel, active aero, smaller cars — the biggest combined reset in decades." },
      { front: "Net-zero 2030", back: "F1's sustainability target, led by fuel technology and logistics reform." },
      { front: "Drop-in fuel", back: "Sustainable fuel usable by existing combustion engines — F1's biggest road-relevant bet." },
      { front: "Eleventh team", back: "Cadillac (2026) — the first grid expansion since Haas in 2016." },
    ],
    takeaways: [
      "The 2026 reset — hybrid split, active aero, new teams — is redefining the competitive order now.",
      "Sustainable fuel is F1's play for road relevance in a decarbonizing world.",
      "Expansion, streaming and AI will shape the sport's next decade.",
    ],
    misconceptions: [
      {
        myth: "F1 will inevitably go fully electric.",
        reality: "F1's bet is sustainable fuels for combustion-hybrid racing — deliberately distinct from Formula E's all-electric mandate.",
      },
    ],
    facts: [
      "F1's freight fleet has begun running on biofuels, cutting logistics emissions substantially.",
      "General Motors plans its own Cadillac F1 power unit later this decade.",
    ],
    next: ["power-units", "history-of-f1"],
  },
];
