/** All-time Formula One records, accurate to mid-2026. */
export type RecordEntry = { holder: string; value: string; detail: string };

export type RecordCategory = {
  category: string;
  records: RecordEntry[];
};

export const ALL_TIME_RECORDS: RecordCategory[] = [
  {
    category: "Championships",
    records: [
      { holder: "Michael Schumacher / Lewis Hamilton", value: "7", detail: "Most drivers' world championships" },
      { holder: "Ferrari", value: "16", detail: "Most constructors' championships" },
      { holder: "Sebastian Vettel", value: "23y 134d", detail: "Youngest world champion (2010)" },
      { holder: "Juan Manuel Fangio", value: "46y 41d", detail: "Oldest world champion (1957)" },
      { holder: "Max Verstappen", value: "4 in a row", detail: "Most consecutive titles this century (2021–2024)" },
    ],
  },
  {
    category: "Race wins",
    records: [
      { holder: "Lewis Hamilton", value: "105", detail: "Most Grand Prix victories" },
      { holder: "Max Verstappen", value: "19", detail: "Most wins in a season (2023)" },
      { holder: "Max Verstappen", value: "10", detail: "Most consecutive wins (2023)" },
      { holder: "Max Verstappen", value: "18y 228d", detail: "Youngest Grand Prix winner (Spain 2016)" },
      { holder: "Alberto Ascari", value: "9", detail: "Most consecutive wins across seasons (1952–53)" },
    ],
  },
  {
    category: "Qualifying",
    records: [
      { holder: "Lewis Hamilton", value: "104", detail: "Most pole positions" },
      { holder: "Ayrton Senna", value: "40.4%", detail: "Best pole strike rate (65 from 161)" },
      { holder: "Sebastian Vettel", value: "15", detail: "Most poles in a season (2011)" },
      { holder: "Niki Lauda", value: "0.000s", detail: "Closest pole margin — tied with Piquet, Jerez 1997 three-way tie" },
    ],
  },
  {
    category: "Podiums & points",
    records: [
      { holder: "Lewis Hamilton", value: "202", detail: "Most podium finishes" },
      { holder: "Michael Schumacher", value: "155", detail: "Most podiums for one team (Ferrari)" },
      { holder: "Max Verstappen", value: "575", detail: "Most points in a season (2023)" },
      { holder: "Lewis Hamilton", value: "48", detail: "Longest points-scoring streak (2018–2020)" },
    ],
  },
  {
    category: "Starts & longevity",
    records: [
      { holder: "Fernando Alonso", value: "400+", detail: "Most Grand Prix starts" },
      { holder: "Kimi Räikkönen", value: "349", detail: "Most starts before Alonso passed him" },
      { holder: "Fernando Alonso", value: "20+ seasons", detail: "Longest career span, 2001–present" },
      { holder: "Louis Chiron", value: "55y 292d", detail: "Oldest driver to start a Grand Prix (Monaco 1955)" },
    ],
  },
  {
    category: "Speed & extremes",
    records: [
      { holder: "Valtteri Bottas", value: "372.5 km/h", detail: "Highest speed-trap figure (Mexico 2016)" },
      { holder: "Michael Schumacher", value: "1:21.046", detail: "Oldest current race lap record (Monza 2004, set by Barrichello)" },
      { holder: "McLaren", value: "1.80s", detail: "Fastest pit stop in history (2023)" },
      { holder: "2021 Belgian GP", value: "1 lap", detail: "Shortest 'race' ever — half points behind the safety car" },
    ],
  },
  {
    category: "Teams",
    records: [
      { holder: "Ferrari", value: "245+", detail: "Most race wins by a constructor" },
      { holder: "Mercedes", value: "8", detail: "Most consecutive constructors' titles (2014–2021)" },
      { holder: "Red Bull", value: "21 of 22", detail: "Best single-season win rate (2023)" },
      { holder: "McLaren", value: "15 of 16", detail: "Most dominant pre-hybrid season (1988)" },
    ],
  },
];
