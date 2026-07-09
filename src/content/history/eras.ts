/** The eras of Formula One, for the History section timeline. */
export type Era = {
  id: string;
  name: string;
  years: string;
  summary: string;
  keyCars: string[];
  keyDrivers: string[];
  moments: { year: number; title: string; description: string }[];
};

export const ERAS: Era[] = [
  {
    id: "front-engine",
    name: "The Front-Engine Pioneers",
    years: "1950–1957",
    summary:
      "The championship began with pre-war engineering: front-engined monsters on skinny tires, drivers in cloth caps, and races on public roads. Alfa Romeo, Ferrari, Maserati and Mercedes traded dominance while Juan Manuel Fangio collected five titles with a craftsmanship never equalled.",
    keyCars: ["Alfa Romeo 158/159", "Mercedes W196", "Maserati 250F"],
    keyDrivers: ["Juan Manuel Fangio", "Alberto Ascari", "Stirling Moss", "Giuseppe Farina"],
    moments: [
      {
        year: 1950,
        title: "Silverstone starts it all",
        description: "The first round of the new World Championship runs on a converted airfield before the King and Queen.",
      },
      {
        year: 1955,
        title: "Mercedes withdraws",
        description: "After dominating with Fangio and Moss, Mercedes leaves racing following the Le Mans disaster — not to return for four decades.",
      },
      {
        year: 1957,
        title: "Fangio's Nürburgring masterpiece",
        description: "46 years old, chasing after a botched pit stop, Fangio breaks the lap record ten times to win his fifth title.",
      },
    ],
  },
  {
    id: "rear-engine",
    name: "The Rear-Engine Revolution",
    years: "1958–1967",
    summary:
      "Cooper put the engine behind the driver and nothing was ever the same. British 'garagistas' — Cooper, Lotus, BRM, Brabham — overthrew the continental factories, Jim Clark redefined what smooth speed looked like, and Colin Chapman began bending physics with the monocoque.",
    keyCars: ["Cooper T51", "Lotus 25", "Brabham BT19"],
    keyDrivers: ["Jim Clark", "Graham Hill", "Jack Brabham", "John Surtees"],
    moments: [
      {
        year: 1959,
        title: "Cooper's rear-engine title",
        description: "Jack Brabham proves the rear-engine layout superior; within two years every grid car copies it.",
      },
      {
        year: 1963,
        title: "Clark's annihilation",
        description: "Jim Clark wins 7 of 10 rounds, leading 71% of all racing laps — a figure still unmatched.",
      },
      {
        year: 1966,
        title: "Brabham wins in a Brabham",
        description: "Jack Brabham becomes the only driver ever to win the championship in a car bearing his own name.",
      },
    ],
  },
  {
    id: "wings-and-money",
    name: "Wings, Sponsors and Danger",
    years: "1968–1976",
    summary:
      "Sponsorship liveries replaced national colors, wings sprouted and downforce was discovered — while the sport killed a driver nearly every season. Jackie Stewart won three titles while fighting to make survival a reasonable expectation, and the Lauda–Hunt duel of 1976 became legend.",
    keyCars: ["Lotus 72", "Tyrrell 003", "McLaren M23", "Ferrari 312T"],
    keyDrivers: ["Jackie Stewart", "Emerson Fittipaldi", "Niki Lauda", "James Hunt"],
    moments: [
      {
        year: 1968,
        title: "Sponsorship arrives",
        description: "Lotus abandons British racing green for Gold Leaf tobacco colors, inventing the modern F1 business model.",
      },
      {
        year: 1970,
        title: "The posthumous champion",
        description: "Jochen Rindt is killed at Monza but his points lead holds — the sport's only posthumous title.",
      },
      {
        year: 1976,
        title: "Lauda's resurrection",
        description: "Forty days after his last rites, Lauda races at Monza and finishes fourth, bleeding through his balaclava.",
      },
    ],
  },
  {
    id: "ground-effect-turbo",
    name: "Ground Effect and the Turbo Wars",
    years: "1977–1988",
    summary:
      "Lotus discovered the ground beneath the car was the biggest wing of all; Renault bolted on a turbocharger and eventually everyone followed to 1,400-horsepower qualifying monsters. It ended with Senna and Prost sharing the greatest car ever built and hating every minute of it.",
    keyCars: ["Lotus 79", "Brabham BT52", "McLaren MP4/4", "Williams FW11"],
    keyDrivers: ["Nelson Piquet", "Alain Prost", "Ayrton Senna", "Nigel Mansell", "Keke Rosberg"],
    moments: [
      {
        year: 1978,
        title: "The unbeatable Lotus 79",
        description: "Ground effect makes Andretti's Lotus corner as if glued down — the aerodynamic age begins in earnest.",
      },
      {
        year: 1984,
        title: "Half a point",
        description: "Lauda beats teammate Prost by 0.5 points — the closest championship ever, decided by a half-points wet race in Monaco won by... Prost.",
      },
      {
        year: 1988,
        title: "15 wins from 16 races",
        description: "The McLaren-Honda MP4/4 of Senna and Prost produces the most dominant season in history.",
      },
    ],
  },
  {
    id: "senna-prost-electronics",
    name: "Electronics, Genius and Tragedy",
    years: "1989–1994",
    summary:
      "Active suspension, traction control and semi-automatic gearboxes turned cars into computers; Senna and Prost turned rivalry into warfare, deciding two championships by collision. Then Imola 1994 took Senna and Ratzenberger in one weekend, and Formula One rebuilt itself around safety.",
    keyCars: ["McLaren MP4/5", "Williams FW14B", "Benetton B194"],
    keyDrivers: ["Ayrton Senna", "Alain Prost", "Nigel Mansell", "Michael Schumacher"],
    moments: [
      {
        year: 1989,
        title: "Suzuka, chicane, chapter one",
        description: "Prost and Senna collide at the chicane; Prost takes the title. A year later Senna returns the favor at Turn 1 at 240 km/h.",
      },
      {
        year: 1992,
        title: "The FW14B's video-game grip",
        description: "Mansell wins the first five races in Williams' active-suspension masterpiece and seals the title by August.",
      },
      {
        year: 1994,
        title: "Imola changes everything",
        description: "Senna and Ratzenberger die in one weekend. Safety reform becomes F1's permanent obsession.",
      },
    ],
  },
  {
    id: "schumacher-ferrari",
    name: "The Schumacher–Ferrari Empire",
    years: "1995–2006",
    summary:
      "Michael Schumacher joined a broken Ferrari and built the most ruthless winning machine the sport has seen: five straight titles, a team molded entirely around one driver, and records thought untouchable. Häkkinen, and finally a young Alonso, provided the resistance.",
    keyCars: ["Ferrari F2002", "Ferrari F2004", "McLaren MP4/13", "Renault R25"],
    keyDrivers: ["Michael Schumacher", "Mika Häkkinen", "Fernando Alonso", "Rubens Barrichello"],
    moments: [
      {
        year: 2000,
        title: "Suzuka delivers Ferrari's title",
        description: "Schumacher ends Ferrari's 21-year drivers' championship drought and weeps on the radio.",
      },
      {
        year: 2004,
        title: "Peak F2004",
        description: "13 wins in 18 races; lap records set that decade-later cars still couldn't touch.",
      },
      {
        year: 2005,
        title: "Alonso ends the empire",
        description: "A 24-year-old Spaniard becomes the youngest champion yet and does it again the following year.",
      },
    ],
  },
  {
    id: "hybrid-prelude",
    name: "Aero Wars and the Red Bull Rise",
    years: "2007–2013",
    summary:
      "The tightest title fights of the modern era: Hamilton by a corner in 2008, Brawn's fairytale in 2009, four champions arriving at the 2010 finale. Then Adrian Newey's Red Bulls and Sebastian Vettel made blown diffusers and four straight titles look inevitable.",
    keyCars: ["Brawn BGP 001", "Red Bull RB7", "Red Bull RB9", "McLaren MP4-23"],
    keyDrivers: ["Sebastian Vettel", "Lewis Hamilton", "Fernando Alonso", "Jenson Button"],
    moments: [
      {
        year: 2008,
        title: "Is that Glock?!",
        description: "Hamilton takes P5 at the final corner of the final lap at Interlagos, snatching the title from Massa's family mid-celebration.",
      },
      {
        year: 2009,
        title: "The £1 team wins everything",
        description: "Brawn GP rises from Honda's ashes to win both titles with a double-diffuser loophole.",
      },
      {
        year: 2012,
        title: "Seven winners, seven races",
        description: "The most unpredictable season start ever ends with Vettel surviving a lap-one spin at the Brazil decider.",
      },
    ],
  },
  {
    id: "hybrid-era",
    name: "The Hybrid Era",
    years: "2014–2021",
    summary:
      "Mercedes mastered the new 1.6-liter hybrid power units and won eight consecutive constructors' titles while Hamilton marched to seven championships. The era closed with the fiercest duel of the century: Verstappen vs. Hamilton, settled on the final lap of the final race.",
    keyCars: ["Mercedes W05", "Mercedes W11", "Red Bull RB16B"],
    keyDrivers: ["Lewis Hamilton", "Nico Rosberg", "Max Verstappen", "Valtteri Bottas"],
    moments: [
      {
        year: 2016,
        title: "Rosberg wins and retires",
        description: "After beating Hamilton by five points, Rosberg quits five days later — leaving on top.",
      },
      {
        year: 2020,
        title: "Hamilton equals Schumacher",
        description: "A seventh title, plus the wins record, in a season raced through a pandemic.",
      },
      {
        year: 2021,
        title: "Abu Dhabi, last lap",
        description: "A disputed safety-car restart hands Verstappen the pass, the win, and his first title in F1's most controversial finish.",
      },
    ],
  },
  {
    id: "ground-effect-2",
    name: "Ground Effect Returns",
    years: "2022–2025",
    summary:
      "Ground-effect cars returned to cure dirty air, budget caps rewired team economics, and the grid compressed. Verstappen's record-shattering 2023 gave way to a four-team fight, McLaren's resurrection, and in 2025, Lando Norris's first championship.",
    keyCars: ["Red Bull RB19", "McLaren MCL38", "McLaren MCL39"],
    keyDrivers: ["Max Verstappen", "Lando Norris", "Oscar Piastri", "Charles Leclerc"],
    moments: [
      {
        year: 2023,
        title: "19 of 22",
        description: "Verstappen wins nineteen races including ten straight — dominance without precedent.",
      },
      {
        year: 2024,
        title: "Papaya rules",
        description: "McLaren's first constructors' crown since 1998 caps a two-year climb from the back of the midfield.",
      },
      {
        year: 2025,
        title: "Norris vs. Piastri",
        description: "An all-McLaren title duel goes the distance; Norris emerges champion.",
      },
    ],
  },
  {
    id: "new-formula",
    name: "The New Formula",
    years: "2026–",
    summary:
      "The biggest rules reset in a generation: power units split nearly 50/50 between combustion and electric, running 100% sustainable fuel; active aerodynamics with X and Z modes; smaller, lighter cars. Audi and Cadillac arrived, and a new competitive order is still being written.",
    keyCars: ["The 2026 generation"],
    keyDrivers: ["Max Verstappen", "Lando Norris", "Oscar Piastri", "Isack Hadjar"],
    moments: [
      {
        year: 2026,
        title: "Eleven teams",
        description: "Cadillac becomes F1's first all-new entrant in a decade; Audi debuts its first works F1 engine.",
      },
      {
        year: 2026,
        title: "Madrid joins the calendar",
        description: "The banked Madring hosts Spain's Grand Prix in the new era's first season.",
      },
    ],
  },
];
