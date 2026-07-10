import type { Lesson } from "@/content/lessons/types";

export const RACE_CRAFT_LESSONS: Lesson[] = [
  {
    slug: "pit-stops",
    title: "Pit Stops",
    category: "race-craft",
    difficulty: 1,
    minutes: 6,
    summary: "Twenty people, four tires, two seconds — the most rehearsed choreography in sport.",
    sections: [
      {
        heading: "Two seconds of perfection",
        body: [
          "A modern F1 pit stop changes all four wheels in around two seconds; the world record is 1.80 seconds. About twenty crew members touch the car: three per wheel (gun, off, on), front and rear jacks, side stabilizers, and a release controller watching for traffic.",
          "There has been no refueling since 2010 — cars start heavy with up to 110 kg of fuel and run to the end. The stop is purely about tires (and occasionally a new front wing).",
        ],
        diagram: "pit-stop",
      },
      {
        heading: "Where the time actually goes",
        body: [
          "The stationary time is the headline, but the true cost of a stop is the whole pit lane transit: entry, the speed-limited lane (80 km/h), the stop itself, and the exit. Total 'pit loss' runs 18–25 seconds depending on the circuit — that's the number strategists actually use.",
          "A slow stop of four seconds barely matters; a cross-threaded wheel nut costing thirty seconds is a race-ruiner. Teams therefore optimize for consistency over outright record attempts.",
        ],
      },
      {
        heading: "Stops as strategic weapons",
        body: [
          "Because pit loss is fixed, the game is choosing when to pay it. Stopping earlier than a rival to attack on fresh tires is the undercut; staying out longer in clear air is the overcut. Safety cars slash the effective cost of a stop, which is why the pit wall erupts into calculation the instant one is called.",
          "Double-stacking — pitting both cars in one go — saves a safety-car opportunity but risks disaster if the first stop stumbles.",
        ],
      },
    ],
    quiz: [
      {
        question: "Roughly how long is a good modern pit stop (stationary time)?",
        options: ["Two seconds", "Five seconds", "Ten seconds", "Thirty seconds"],
        answerIndex: 0,
        explanation: "Crews routinely hit low-2s stops; McLaren holds the 1.80s world record.",
      },
      {
        question: "Why don't cars refuel during stops?",
        options: [
          "Fuel is too expensive",
          "Refueling has been banned since 2010",
          "The cars don't use fuel",
          "Refueling only happens at night races",
        ],
        answerIndex: 1,
        explanation: "Refueling was banned on safety and cost grounds from 2010; cars start with all their race fuel (max 110 kg).",
      },
      {
        question: "What matters more to strategists than stationary time?",
        options: [
          "The number of mechanics",
          "Total pit-lane time loss (~18–25 s)",
          "Gun torque settings",
          "TV coverage of the stop",
        ],
        answerIndex: 1,
        explanation: "Strategy models use full pit loss — entry, limited lane, stop, exit — not just the two seconds stationary.",
      },
      {
        question: "What is 'double stacking'?",
        options: [
          "Fitting two tire sets at once",
          "Pitting both team cars consecutively in one window",
          "Two pit crews working one car",
          "Stacking spare wings in the garage",
        ],
        answerIndex: 1,
        explanation: "Both cars pit back-to-back — efficient under safety cars, catastrophic if the first stop goes wrong.",
      },
    ],
    flashcards: [
      { front: "Pit loss", back: "Total time cost of a stop including the pit lane transit — about 18–25 seconds depending on circuit." },
      { front: "Pit crew size", back: "~20 people: three per wheel, two jacks, stabilizers, release controller." },
      { front: "Pit stop record", back: "1.80 seconds (McLaren, 2023)." },
      { front: "Unsafe release", back: "Sending a car into the path of another in the pit lane — penalized." },
    ],
    takeaways: [
      "Stationary time is ~2 seconds, but the strategic cost of a stop is the full 18–25 second pit loss.",
      "No refueling since 2010 — stops are about tires.",
      "Undercuts, overcuts and safety-car timing turn stops into weapons.",
    ],
    misconceptions: [
      {
        myth: "Faster stops win races.",
        reality: "Consistency beats records: the spread between a great and average stop (~1s) is tiny next to the cost of a single failure (~30s).",
      },
    ],
    facts: [
      "Wheel guns spin nuts at over 10,000 rpm; each wheel is off and on in under a second.",
      "In the refueling era (1994–2009) stops took 7–12 seconds and races were often won in the pits.",
    ],
    next: ["race-strategy", "tires"],
  },
  {
    slug: "race-strategy",
    title: "Race Strategy",
    category: "race-craft",
    difficulty: 2,
    minutes: 9,
    summary: "Undercuts, overcuts, tire deltas and pit windows — the chess game running beneath every Grand Prix.",
    sections: [
      {
        heading: "The core equation",
        body: [
          "Strategy is arithmetic: fresh tires are faster, but a pit stop costs 18–25 seconds. Every plan balances the lap-time gain of new rubber against that fixed cost. When degradation is low, one stop wins; when tires fall apart, two or even three stops are faster despite the extra pit visits.",
          "Teams simulate thousands of race permutations before lights out, then re-run them live as reality intervenes. The strategist's screen shows every rival's 'pit window' — the lap range where their stop makes sense — and the fight is about entering yours at the perfect moment.",
        ],
      },
      {
        heading: "The undercut and the overcut",
        body: [
          "The undercut is F1's signature move: pit one lap before the rival ahead, use the fresh-tire advantage on your out-lap, and when they stop a lap later, you emerge in front. It works because a new tire's first laps are its fastest — worth a second or more at some circuits.",
          "The overcut inverts the logic: stay out longer while your rival struggles in traffic or on tires that need gentle warm-up, build a gap in clear air, and stop later. Overcuts thrive at circuits where new tires take laps to switch on, or when the car ahead pits into traffic.",
        ],
      },
      {
        heading: "Reading a race like a strategist",
        body: [
          "Watch the gaps, not the positions. A leader 19 seconds ahead of P2 is 'in the pit window' — they can stop and return still leading. A driver suddenly lapping half a second slower has probably hit tire degradation ('the cliff') and become undercut bait.",
          "Track position versus tire offset is the eternal trade: emerging ahead on worn tires, or behind on fresh ones with laps to attack. Circuits where overtaking is easy favor tire offset; circuits like Monaco favor track position at nearly any cost.",
        ],
      },
      {
        heading: "Chaos theory: safety cars and rain",
        body: [
          "A safety car halves the cost of a pit stop, instantly rewriting every plan. Teams pre-compute 'SC windows' each lap: if the safety car comes now, do we stop? The answer flips race outcomes more than any other single factor.",
          "Rain adds the crossover problem: intermediates are faster than slicks once the track is wet enough, and vice versa as it dries. Calling that crossover a lap early — like Gasly's team at Monza 2020 or countless Interlagos gambles — is how midfield cars steal wins.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the undercut?",
        options: [
          "Overtaking under braking",
          "Pitting before a rival to jump them with fresh-tire pace",
          "Driving below the white line",
          "Cutting a chicane",
        ],
        answerIndex: 1,
        explanation: "Stopping first converts fresh-tire speed on the out-lap into track position when the rival pits a lap later.",
      },
      {
        question: "When does an overcut tend to work?",
        options: [
          "When new tires need laps to warm up, or the rival pits into traffic",
          "Only in the rain",
          "When your car is slower",
          "It never works",
        ],
        answerIndex: 0,
        explanation: "If fresh rubber doesn't deliver instantly (or the rival hits traffic), staying out in clear air gains more.",
      },
      {
        question: "A leader is 'in the pit window' when...",
        options: [
          "The pit lane is open",
          "Their lead exceeds the total pit loss, so they can stop and stay ahead",
          "They have used both compounds",
          "There are 10 laps left",
        ],
        answerIndex: 1,
        explanation: "With a gap bigger than the ~20s pit loss, a stop doesn't cost the position — the strategic definition of a free stop.",
      },
      {
        question: "Why do safety cars scramble strategy?",
        options: [
          "They damage tires",
          "They cut the effective cost of pitting roughly in half",
          "They force everyone to pit twice",
          "They end DRS for the race",
        ],
        answerIndex: 1,
        explanation: "With the field slowed, pit loss shrinks dramatically — drivers who happen to be near their window get a cheap stop.",
      },
      {
        question: "What is 'the cliff'?",
        options: [
          "A famous corner at Silverstone",
          "The point where a worn tire's performance collapses suddenly",
          "The pit wall",
          "The final chicane at Monza",
        ],
        answerIndex: 1,
        explanation: "Degradation isn't linear — past a threshold, lap times fall off a cliff, forcing an immediate stop.",
      },
    ],
    flashcards: [
      { front: "Undercut", back: "Pit before a rival and use fresh-tire out-lap pace to emerge ahead when they stop." },
      { front: "Overcut", back: "Stay out longer in clear air and pit later — works when fresh tires warm slowly or traffic is bad." },
      { front: "Pit window", back: "The lap range where a stop makes strategic sense given tire life and gaps." },
      { front: "Tire delta", back: "The lap-time difference between compounds, or between fresh and worn tires." },
      { front: "Crossover point", back: "The moment a different tire type becomes faster as conditions change (e.g., drying track)." },
    ],
    takeaways: [
      "All strategy balances fresh-tire pace against the fixed ~20-second pit loss.",
      "The undercut attacks with fresh-tire out-laps; the overcut exploits clear air and slow warm-up.",
      "Watch gaps, not positions — a 20-second lead is a free pit stop.",
      "Safety cars and rain crossovers are the great strategy randomizers.",
    ],
    misconceptions: [
      {
        myth: "The fastest car always wins.",
        reality: "Strategy regularly beats pace: a well-timed undercut, safety car or rain call can hand a win to the third-fastest car.",
      },
    ],
    facts: [
      "Top teams employ dedicated strategy groups running live Monte Carlo simulations during races.",
      "Hungary 1998: Ross Brawn switched Schumacher to three stops mid-race and asked for '19 qualifying laps' — it won the race.",
    ],
    next: ["tires", "weather"],
  },
  {
    slug: "weather",
    title: "Weather & Wet Racing",
    category: "race-craft",
    difficulty: 2,
    minutes: 6,
    summary: "Why rain is the great equalizer: crossover calls, visibility, and the art of finding grip where none is advertised.",
    sections: [
      {
        heading: "The great equalizer",
        body: [
          "Rain compresses the field like nothing else. Downforce advantages shrink when cornering speeds drop, engine power matters less without traction, and suddenly driver skill — feel, adaptability, bravery calibrated to conditions — dominates the timesheet. Most legendary drives (Senna at Donington 1993, Verstappen at Brazil 2016, Hamilton at Silverstone 2008) happened in the wet.",
          "Weather radar is a pit-wall obsession. A shower touching one sector while the rest stays dry creates the trickiest conditions in racing: slicks on a partly wet track.",
        ],
      },
      {
        heading: "Three tires, two crossovers",
        body: [
          "Full wets (blue) handle standing water, moving up to 85 liters per second at speed, but they're slow on a merely damp track. Intermediates (green) cover the huge middle ground. Slicks take over the moment a dry line appears. The two crossover points — wet-to-inter and inter-to-slick — are where races are won.",
          "The driver is the sensor: radio calls like 'inters in three laps' come from feel, and the first car to gamble correctly often gains fifteen seconds before rivals react.",
        ],
      },
      {
        heading: "Visibility, rivers and racing lines",
        body: [
          "Spray is the real danger: at 250 km/h behind another car, drivers see essentially nothing. This is why wet races start behind the safety car or get red-flagged — not the grip, the blindness.",
          "The wet racing line often abandons the dry one: the rubbered-in dry line becomes slick when wet, so drivers hunt grip off-line on abrasive, unrubbered asphalt. Watching a master change lines lap by lap as a track dries is one of F1's finest sights.",
        ],
      },
    ],
    quiz: [
      {
        question: "Why does rain compress the performance gap between cars?",
        options: [
          "All teams must use the same setup",
          "Lower cornering speeds shrink aerodynamic advantages and driver skill dominates",
          "Engines are power-capped in the wet",
          "The FIA slows the leaders deliberately",
        ],
        answerIndex: 1,
        explanation: "With less speed, downforce differences matter less — feel and adaptability move to the top of the equation.",
      },
      {
        question: "When do intermediates become the right tire?",
        options: [
          "In standing water",
          "On a damp track without standing water",
          "Only during safety cars",
          "Whenever it's cloudy",
        ],
        answerIndex: 1,
        explanation: "Inters cover the wide middle ground between full-wet conditions and a dry(ing) line.",
      },
      {
        question: "What is the biggest danger in heavy rain?",
        options: [
          "Cold brakes",
          "Spray destroying visibility",
          "Engine water damage",
          "Slower pit stops",
        ],
        answerIndex: 1,
        explanation: "Drivers describe seeing nothing at all behind another car — visibility, not grip, forces stoppages.",
      },
      {
        question: "Why do drivers move off the normal racing line in the wet?",
        options: [
          "To cool the tires",
          "The rubbered-in dry line becomes extra slippery when wet",
          "Race control requires it",
          "To avoid the DRS zones",
        ],
        answerIndex: 1,
        explanation: "Laid rubber is grippy when dry but greasy when wet — unrubbered off-line asphalt offers more bite.",
      },
    ],
    flashcards: [
      { front: "Full wets", back: "Blue-marked tires for standing water — clear ~85 L/s at speed but slow on a drying track." },
      { front: "Intermediates", back: "Green-marked tires for damp tracks — the workhorse of changeable conditions." },
      { front: "Crossover point", back: "The moment a different tire becomes fastest as the track wets or dries." },
      { front: "Aquaplaning", back: "Tires floating on water and losing all contact — the wet-weather driver's nightmare." },
    ],
    takeaways: [
      "Rain shrinks car advantages and amplifies driver skill.",
      "Races hinge on catching the wet↔inter↔slick crossovers a lap before rivals.",
      "Spray-induced blindness, not grip, is what stops wet races.",
    ],
    misconceptions: [
      {
        myth: "Wet races are slower and therefore boring.",
        reality: "Wet races produce more overtakes, more strategy variance and more legendary drives than any other condition.",
      },
    ],
    facts: [
      "Senna passed five cars on the opening lap at a soaked Donington 1993 — often called the greatest lap ever driven.",
      "Verstappen's 2016 Brazil drive included a half-spin recovery at 250 km/h and 13 passes in the closing laps.",
    ],
    next: ["tires", "safety"],
  },
];
