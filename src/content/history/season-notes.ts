/** Editorial notes for landmark seasons, shown on season pages. */
export type SeasonNote = { headline: string; notes: string[] };

export const SEASON_NOTES: Record<number, SeasonNote> = {
  1950: {
    headline: "The world championship begins",
    notes: [
      "Seven races — six in Europe plus the Indianapolis 500 — formed the first World Drivers' Championship.",
      "Giuseppe Farina edged Alfa Romeo teammate Fangio to become the first champion.",
      "Silverstone hosted the opening round on 13 May, attended by the British royal family.",
    ],
  },
  1952: {
    headline: "Ascari's perfection",
    notes: [
      "Alberto Ascari won every championship race he entered, beginning a nine-win streak spanning two seasons.",
      "The championship ran to Formula 2 regulations to guarantee full grids.",
    ],
  },
  1955: {
    headline: "Triumph and tragedy",
    notes: [
      "Fangio and Moss dominated for Mercedes, finishing one-two at four Grands Prix.",
      "The Le Mans disaster (not an F1 race) led to the cancellation of four Grands Prix and Mercedes' withdrawal from racing.",
    ],
  },
  1958: {
    headline: "First constructors' title — and a champion by one point",
    notes: [
      "The Constructors' Championship debuted; Vanwall beat Ferrari to it.",
      "Mike Hawthorn took the drivers' crown by one point from Stirling Moss, who had won more races.",
      "Moss defended Hawthorn at a tribunal, likely costing himself the title — sportsmanship's most famous act.",
    ],
  },
  1961: {
    headline: "The sharknose Ferraris",
    notes: [
      "New 1.5-liter regulations caught British teams out; Ferrari's 156 dominated.",
      "Phil Hill became America's first world champion after teammate Wolfgang von Trips died at Monza.",
    ],
  },
  1968: {
    headline: "Wings and sponsorship arrive",
    notes: [
      "Lotus painted its cars in Gold Leaf tobacco colors — the birth of modern sponsorship.",
      "High-mounted wings sprouted mid-season, revolutionizing (and endangering) car design.",
      "Jim Clark died at Hockenheim in April; Graham Hill rallied Lotus to both titles.",
    ],
  },
  1976: {
    headline: "Hunt vs. Lauda — the season of the film 'Rush'",
    notes: [
      "Lauda nearly died at the Nürburgring, returned 40 days later at Monza with fresh burns.",
      "At a monsoonal Fuji finale, Lauda withdrew on safety grounds; Hunt claimed the title by one point.",
    ],
  },
  1978: {
    headline: "Ground effect perfected",
    notes: [
      "The Lotus 79's ground-effect aerodynamics gave Mario Andretti a dominant title.",
      "Teammate Ronnie Peterson died from complications after a startline crash at Monza.",
    ],
  },
  1982: {
    headline: "Chaos: eleven winners in sixteen races",
    notes: [
      "Keke Rosberg won the title with a single victory in the most unpredictable season ever.",
      "Gilles Villeneuve died at Zolder; Didier Pironi's career ended at Hockenheim weeks later.",
      "A drivers' strike at the season opener saw champions locked in a conference room singing songs.",
    ],
  },
  1988: {
    headline: "McLaren's near-perfect season",
    notes: [
      "Senna and Prost won 15 of 16 races in the MP4/4 — Ferrari's Berger broke the sweep at Monza.",
      "Senna took his first title after a season-long duel decided at Suzuka.",
    ],
  },
  1994: {
    headline: "F1's darkest modern weekend",
    notes: [
      "Ayrton Senna and Roland Ratzenberger died at Imola; safety was transformed forever after.",
      "Schumacher and Hill's collision at Adelaide decided the title in Schumacher's favor.",
      "Refueling returned and electronic driver aids were banned.",
    ],
  },
  2000: {
    headline: "Ferrari's drought ends",
    notes: [
      "Michael Schumacher became Ferrari's first drivers' champion since 1979, beating Häkkinen at Suzuka.",
      "It began five consecutive title doubles for the Scuderia.",
    ],
  },
  2008: {
    headline: "Champion at the final corner",
    notes: [
      "Hamilton passed Glock at the last corner of the last lap in Brazil to snatch the title from Massa by one point.",
      "Vettel's Monza win in a Toro Rosso made him F1's youngest winner at the time.",
      "The first night race ran in Singapore — later infamous for 'Crashgate'.",
    ],
  },
  2009: {
    headline: "The Brawn fairy tale",
    notes: [
      "Honda's abandoned team, bought for £1, won both titles with Jenson Button and the double-diffuser BGP 001.",
      "KERS hybrid power debuted — heavy, weak, and years ahead of its time.",
    ],
  },
  2010: {
    headline: "Four into Abu Dhabi",
    notes: [
      "Four drivers could win the title at the finale; Vettel, who had never led the standings, left as champion.",
      "Red Bull's first title double began a four-year reign.",
    ],
  },
  2012: {
    headline: "Seven winners in seven races",
    notes: [
      "The season opened with seven different winners before Alonso and Vettel settled into a duel.",
      "Vettel overturned a 39-point deficit, surviving a first-lap spin in the Interlagos decider.",
    ],
  },
  2016: {
    headline: "Rosberg wins and walks away",
    notes: [
      "Nico Rosberg beat Mercedes teammate Hamilton by five points, then retired five days later.",
      "Verstappen won the Spanish GP on his Red Bull debut, aged 18.",
    ],
  },
  2021: {
    headline: "Verstappen vs. Hamilton — decided on the last lap",
    notes: [
      "The most intense title fight in decades went to the final lap of the final race at Abu Dhabi.",
      "A controversial safety-car restart let Verstappen pass Hamilton for his first championship.",
      "The pair collided at Silverstone and Monza during a season of relentless wheel-to-wheel combat.",
    ],
  },
  2022: {
    headline: "Ground effect returns",
    notes: [
      "All-new regulations brought ground-effect cars, porpoising and closer racing.",
      "Verstappen won a record-equalling 15 races despite an early points deficit.",
    ],
  },
  2024: {
    headline: "McLaren's comeback completed",
    notes: [
      "McLaren won its first constructors' title since 1998 in a four-team fight.",
      "Verstappen took a fourth straight drivers' crown despite Red Bull losing its car advantage.",
      "Seven different drivers won across the most competitive season of the ground-effect era.",
    ],
  },
  2025: {
    headline: "Norris crowned in an all-McLaren duel",
    notes: [
      "Lando Norris and Oscar Piastri fought a season-long teammate battle for the championship.",
      "McLaren defended the constructors' title as Norris became Britain's 11th champion.",
      "The final year of the 2022 regulations ended with the closest teammate title fight since 2016.",
    ],
  },
  2026: {
    headline: "A new formula",
    notes: [
      "Revolutionary regulations: ~50/50 hybrid power units, 100% sustainable fuel and active aerodynamics.",
      "Audi and Cadillac joined, expanding the grid to 11 teams and 22 cars.",
      "Madrid's Madring debuted as host of the Spanish Grand Prix.",
    ],
  },
};

export function getSeasonNote(year: number): SeasonNote | undefined {
  return SEASON_NOTES[year];
}
