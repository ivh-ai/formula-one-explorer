/**
 * Editorial enrichment for driver profiles, keyed by Jolpica driverId.
 * Merged with API data at render time; unknown drivers degrade to API-only.
 */
export type DriverMeta = {
  driverId: string;
  bio: string;
  drivingStyle: string;
  helmetColors: [string, string];
  rivalries: string[];
  highlights: string[];
  funFacts: string[];
};

export const DRIVER_META: Record<string, DriverMeta> = {
  /* ------------------------------ 2026 grid ------------------------------ */
  norris: {
    driverId: "norris",
    bio: "Lando Norris arrived in F1 aged 19 after championship-winning junior campaigns and grew from McLaren's future hope into its title-winning present, becoming the 2025 World Champion after an intense season-long fight.",
    drivingStyle:
      "Exceptionally fast in high-speed corners with delicate steering inputs; strongest when a car rotates on entry and rewards commitment in qualifying.",
    helmetColors: ["#FF8000", "#FFF200"],
    rivalries: ["Oscar Piastri", "Max Verstappen"],
    highlights: [
      "2025 Formula One World Champion",
      "First win: Miami 2024",
      "Led McLaren to consecutive constructors' titles in 2024 and 2025",
    ],
    funFacts: [
      "A talented sim racer, he has competed under aliases in online endurance events.",
      "Founded the Quadrant esports and lifestyle brand.",
      "His helmet design tributes his home crowd at Silverstone most seasons.",
    ],
  },
  piastri: {
    driverId: "piastri",
    bio: "Oscar Piastri won the Formula Renault Eurocup, F3 and F2 titles in consecutive seasons before joining F1, a preposterous junior record. Calm to the point of unnerving, the Australian has become a serial race winner and championship contender for McLaren.",
    drivingStyle:
      "Metronomic and unflustered; minimal steering corrections, exceptional tire management, and near-immunity to pressure.",
    helmetColors: ["#0A2240", "#FF8000"],
    rivalries: ["Lando Norris"],
    highlights: [
      "Rookie-season sprint win at Qatar 2023",
      "Fought for the 2025 world championship into the final rounds",
      "Won junior F3 and F2 titles back-to-back as a rookie in each",
    ],
    funFacts: [
      "Famously rebutted Alpine's contract announcement with a single devastating tweet in 2022.",
      "His engineers nickname his radio style 'the printer' — flat, precise, zero drama.",
      "Grew up idolizing fellow Australian Mark Webber, now his manager.",
    ],
  },
  max_verstappen: {
    driverId: "max_verstappen",
    bio: "Max Verstappen became F1's youngest race starter at 17 and its youngest winner at 18, then rewrote the record books with four consecutive world championships from 2021 to 2024. Relentless, aggressive and complete, he is the benchmark of his generation.",
    drivingStyle:
      "Unmatched car control on corner entry with a preference for a sharp, pointy front end; devastating in mixed conditions and wheel-to-wheel combat.",
    helmetColors: ["#00205B", "#E8002D"],
    rivalries: ["Lewis Hamilton", "Lando Norris", "Charles Leclerc"],
    highlights: [
      "Four consecutive world championships (2021–2024)",
      "Record 19 wins in a single season (2023)",
      "Youngest Grand Prix winner in history (Spain 2016, aged 18)",
    ],
    funFacts: [
      "Won his first ever F1 race — his debut for Red Bull Racing after promotion from Toro Rosso.",
      "Races (and often wins) online endurance events under the Team Redline banner.",
      "Son of F1 racer Jos Verstappen and karting champion Sophie Kumpen.",
    ],
  },
  leclerc: {
    driverId: "leclerc",
    bio: "Charles Leclerc swept the GP3 and F2 titles, then delivered on Ferrari's faith with pole positions and wins in cars that rarely deserved them. Monaco's first home winner in over 90 years, he carries the weight of the tifosi with grace.",
    drivingStyle:
      "A qualifying specialist who extracts lap time through late braking and razor-thin margins; thrives on street circuits.",
    helmetColors: ["#E8002D", "#FFFFFF"],
    rivalries: ["Max Verstappen", "Carlos Sainz"],
    highlights: [
      "Won his home Monaco Grand Prix in 2024",
      "Back-to-back wins at Spa and Monza in 2019 made him a Ferrari hero",
      "Youngest driver to take pole for Ferrari in the modern era",
    ],
    funFacts: [
      "An accomplished pianist who has released his own recorded music.",
      "Godfather figure Jules Bianchi helped launch his karting career.",
      "Won in F1 before he ever won in karting's top world final.",
    ],
  },
  hamilton: {
    driverId: "hamilton",
    bio: "Lewis Hamilton is statistically the most successful driver in Formula One history: seven world titles, more than a hundred wins and poles, and a cultural reach beyond the sport. His 2025 move to Ferrari paired F1's most iconic driver with its most iconic team.",
    drivingStyle:
      "Sublime braking control and adaptability; famous for managing tires while maintaining race-winning pace, and for finding grip in the wet others cannot.",
    helmetColors: ["#FFEB00", "#6A0DAD"],
    rivalries: ["Nico Rosberg", "Max Verstappen", "Fernando Alonso"],
    highlights: [
      "Seven world championships (2008, 2014–2020, tied record)",
      "All-time leader in wins and pole positions",
      "Won a Grand Prix in every season from 2007 to 2024",
    ],
    funFacts: [
      "Started karting after his father worked multiple jobs to fund it.",
      "Founded Mission 44 to improve diversity in motorsport and STEM.",
      "His bulldog Roscoe became a paddock celebrity in his own right.",
    ],
  },
  russell: {
    driverId: "russell",
    bio: "George Russell earned his Mercedes seat the hard way: three seasons dragging a Williams into places it didn't belong. Now team leader at Mercedes, he combines analytical depth with startling one-lap speed.",
    drivingStyle:
      "Precise, cerebral, and brutally fast over one lap; excels at maximizing imperfect cars and thinking strategically mid-race.",
    helmetColors: ["#27F4D2", "#00205B"],
    rivalries: ["Lewis Hamilton", "Max Verstappen"],
    highlights: [
      "First win at Brazil 2022, leading a Mercedes one-two",
      "Nearly won Bahrain 2020 as a stand-in Mercedes driver",
      "Multiple wins as Mercedes team leader since 2024",
    ],
    funFacts: [
      "Director of the Grand Prix Drivers' Association since 2021.",
      "His Williams qualifying heroics earned the nickname 'Mr. Saturday'.",
      "Won the 2018 F2 title against Norris and Albon.",
    ],
  },
  antonelli: {
    driverId: "antonelli",
    bio: "Andrea Kimi Antonelli was fast-tracked by Mercedes from Italian karting stardom straight into Hamilton's vacated seat at 18. The youngest podium finishers' lists keep rewriting themselves around him.",
    drivingStyle:
      "Instinctive and aggressive, with a junior-career habit of winning in machinery he'd barely tested; still smoothing rough edges under pressure.",
    helmetColors: ["#27F4D2", "#0033A0"],
    rivalries: ["Oliver Bearman"],
    highlights: [
      "Youngest driver to lead a Grand Prix lap (Canada 2025 era stats)",
      "Podium finisher in his rookie 2025 season",
      "Won F4 and Formula Regional titles with dominant campaigns",
    ],
    funFacts: [
      "Toto Wolff tracked his karting results personally from age 11.",
      "Skipped F3 entirely on his way to Formula One.",
      "His father runs the successful AKM Motorsport junior team.",
    ],
  },
  alonso: {
    driverId: "alonso",
    bio: "Fernando Alonso ended Schumacher's reign with back-to-back titles in 2005 and 2006, and two decades later is still extracting miracles from race cars. The most complete racer of his era, on the grid past his mid-forties by pure ability.",
    drivingStyle:
      "Adaptable to any car characteristic; legendary opening laps, relentless racecraft, and an unmatched ability to sense a race's shape before it happens.",
    helmetColors: ["#005573", "#FFD100"],
    rivalries: ["Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"],
    highlights: [
      "World Champion 2005 and 2006 with Renault",
      "32 podiums in his 40s with Aston Martin",
      "Winner of the 24 Hours of Le Mans (twice) and Daytona",
    ],
    funFacts: [
      "Pursues motorsport's Triple Crown — only the Indy 500 eludes him.",
      "His Asturias karting complex hosts a museum of his career.",
      "Made his F1 debut in 2001, before some 2026 rivals were born.",
    ],
  },
  stroll: {
    driverId: "stroll",
    bio: "Lance Stroll became F1's second-youngest podium finisher at 18 and has anchored Aston Martin — the team his father Lawrence rebuilt — since its rebirth, with flashes of brilliance in changeable conditions.",
    drivingStyle:
      "Strong first laps and confident in low-grip, wet conditions; a front-row qualifier when the weather scrambles the order.",
    helmetColors: ["#229971", "#FF69B4"],
    rivalries: ["Fernando Alonso"],
    highlights: [
      "Podium at Baku 2017 aged 18",
      "Pole position in the wet at Istanbul 2020",
      "Raced days after wrist surgery to score points in Bahrain 2023",
    ],
    funFacts: [
      "Won the 2016 European F3 title with a record points haul.",
      "A keen tennis player who trains with tour professionals.",
      "His father assembled the consortium that became Aston Martin F1.",
    ],
  },
  gasly: {
    driverId: "gasly",
    bio: "Pierre Gasly's career is a study in resilience: demoted by Red Bull in 2019, he answered with a podium, then a fairy-tale victory at Monza 2020 for AlphaTauri. He now leads Alpine's French project.",
    drivingStyle:
      "Smooth and momentum-based, excellent in medium-speed chicanes; extracts strong race pace from midfield machinery.",
    helmetColors: ["#2173B8", "#E8002D"],
    rivalries: ["Esteban Ocon"],
    highlights: [
      "Victory at Monza 2020 from 10th on the grid",
      "Podium at Brazil 2019, beating Hamilton to the line",
      "GP2 champion in 2016",
    ],
    funFacts: [
      "Grew up in Rouen; childhood friends (and rivals) with Ocon.",
      "Part-owner of French football club FC Versailles.",
      "His Monza win was AlphaTauri's first since Vettel's in 2008 as Toro Rosso.",
    ],
  },
  colapinto: {
    driverId: "colapinto",
    bio: "Franco Colapinto burst from a mid-season Williams call-up in 2024 into a full-time career, carrying Argentina back onto the F1 grid for the first time in decades and igniting a fanbase not seen since Fangio and Reutemann.",
    drivingStyle:
      "Fearless and instinctive with striking one-lap confidence on street circuits; still trading raw speed against consistency.",
    helmetColors: ["#6CACE4", "#FFD100"],
    rivalries: ["Pierre Gasly"],
    highlights: [
      "Points on his second F1 weekend as a 2024 rookie",
      "First Argentine F1 race driver since 2001",
      "Race winner in F2 and F3",
    ],
    funFacts: [
      "Moved alone from Buenos Aires to Europe at 14 to race karts.",
      "Argentine TV audiences for F1 tripled after his debut.",
      "Reveres Juan Manuel Fangio and visits his museum in Balcarce.",
    ],
  },
  hadjar: {
    driverId: "hadjar",
    bio: "Isack Hadjar impressed enough in his 2025 Racing Bulls rookie season — including a maiden podium — to earn the most scrutinized seat in motorsport: Red Bull Racing, alongside Max Verstappen, for 2026.",
    drivingStyle:
      "Sharp-elbowed and brave on entry, with a qualifying edge that flattered junior machinery; learning to meter aggression over race distance.",
    helmetColors: ["#00205B", "#E8002D"],
    rivalries: ["Liam Lawson", "Arvid Lindblad"],
    highlights: [
      "Maiden podium at Zandvoort 2025",
      "Promoted to Red Bull Racing for 2026",
      "F2 title contender in 2024",
    ],
    funFacts: [
      "Nicknamed 'Le Petit Prost' by French media, to his amusement.",
      "His race engineer communications went viral for their honesty.",
      "First French driver in the senior Red Bull team.",
    ],
  },
  lawson: {
    driverId: "lawson",
    bio: "Liam Lawson took the long road: super-sub appearances, a bruising early-2025 stint at Red Bull Racing, then a rebuild at Racing Bulls where his toughness and speed made him the team's reference point.",
    drivingStyle:
      "Combative wheel-to-wheel racer, strong in traffic and on restarts; at his best when a weekend goes chaotic.",
    helmetColors: ["#000000", "#00A9E0"],
    rivalries: ["Isack Hadjar", "Yuki Tsunoda"],
    highlights: [
      "Scored points as an injury stand-in on his 2023 debut stretch",
      "DTM race winner while holding F1 reserve duties",
      "Re-established himself at Racing Bulls after Red Bull demotion",
    ],
    funFacts: [
      "First New Zealander in F1 since Brendon Hartley.",
      "Funded early karting partly through family fundraising dinners.",
      "Raced ovals in New Zealand's junior categories before Europe.",
    ],
  },
  arvid_lindblad: {
    driverId: "arvid_lindblad",
    bio: "Arvid Lindblad is Red Bull's latest teenage bet: a British junior phenom with Indian heritage who collected F3 and F2 silverware at record pace and stepped into Racing Bulls for 2026 at 18.",
    drivingStyle:
      "Naturally aggressive with standout racecraft in sprint formats; the raw-speed profile of a classic Red Bull junior.",
    helmetColors: ["#C8102E", "#FFD700"],
    rivalries: ["Isack Hadjar"],
    highlights: [
      "F1 race seat at 18 with Racing Bulls",
      "Multiple F2 feature race wins as a rookie",
      "Macau and junior single-seater standout",
    ],
    funFacts: [
      "Received a special FIA dispensation to test F1 machinery at 17.",
      "One of the first F1 drivers of Indian descent.",
      "Boxes to train reaction speed and neck strength.",
    ],
  },
  albon: {
    driverId: "albon",
    bio: "Alex Albon rebuilt his career masterfully after Red Bull: at Williams he became the midfield's most efficient points converter and the cornerstone of the team's climb back toward the front.",
    drivingStyle:
      "Exceptional tire whisperer in long stints; famous for one-stop strategies and defending trains of faster cars for 40 laps.",
    helmetColors: ["#00205B", "#E8002D"],
    rivalries: ["Carlos Sainz"],
    highlights: [
      "Podiums with Red Bull in 2020",
      "Dragged a 2023 Williams into Q3 and points repeatedly",
      "Williams' team leader through its resurgence",
    ],
    funFacts: [
      "Races under the Thai flag — F1's first Thai driver since Prince Bira.",
      "Runs an animal sanctuary with partner Lily Muni He.",
      "Beat Leclerc and Russell to karting titles as juniors.",
    ],
  },
  sainz: {
    driverId: "sainz",
    bio: "Carlos Sainz has won races for Ferrari and beaten world champions as teammates across four teams. At Williams he brings the craft of a strategist and the polish of a driver who makes every car look sorted.",
    drivingStyle:
      "Methodical race manager — brakes early, rotates mid-corner, protects tires; devastating with an alternative strategy in hand.",
    helmetColors: ["#E8002D", "#FFD100"],
    rivalries: ["Charles Leclerc", "Lando Norris", "Alexander Albon"],
    highlights: [
      "Won Singapore 2023, breaking Red Bull's perfect season",
      "Australia 2024 win days after appendix surgery",
      "Race winner with Ferrari in three consecutive seasons",
    ],
    funFacts: [
      "Son of double World Rally Champion Carlos Sainz Sr.",
      "Nicknamed 'the smooth operator' after his radio singalong.",
      "Golf handicap low enough to compete with pros in pro-ams.",
    ],
  },
  bearman: {
    driverId: "bearman",
    bio: "Oliver Bearman announced himself with a fairy-tale Ferrari debut at Jeddah 2024, called up from F2 overnight and finishing seventh. Haas signed him before the hype cooled, and he has repaid the faith with mature points hauls.",
    drivingStyle:
      "Composed beyond his years with sharp adaptation to new cars; strong in high-speed sequences and unfazed by big moments.",
    helmetColors: ["#E8002D", "#B6BABD"],
    rivalries: ["Andrea Kimi Antonelli"],
    highlights: [
      "Points on his shock Ferrari debut at 18 (Jeddah 2024)",
      "Haas' lead driver by his second full season",
      "Ferrari Driver Academy graduate",
    ],
    funFacts: [
      "Learned of his Ferrari debut at midnight and qualified 11th hours later.",
      "The youngest driver ever to race for Ferrari.",
      "His father accompanied him to every junior race in a camper van.",
    ],
  },
  ocon: {
    driverId: "ocon",
    bio: "Esteban Ocon fought from a caravan-funded karting childhood to a Grand Prix victory at Hungary 2021. A famously hard racer, he brings experienced, front-running references to Haas.",
    drivingStyle:
      "Uncompromising in defense, excellent tire preservation in hot races, and a knack for surviving chaotic afternoons to steal results.",
    helmetColors: ["#FF87BC", "#00205B"],
    rivalries: ["Pierre Gasly", "Fernando Alonso", "Sergio Pérez"],
    highlights: [
      "Won the 2021 Hungarian Grand Prix",
      "Podium at Sakhir 2020 and Monaco 2023",
      "GP3 and European F3 champion",
    ],
    funFacts: [
      "His parents sold their house to fund his karting.",
      "Mercedes reserve driver during his year out in 2019.",
      "Childhood karting rival of Verstappen and Gasly.",
    ],
  },
  hulkenberg: {
    driverId: "hulkenberg",
    bio: "Nico Hülkenberg finally shed F1's cruelest statistic with his first podium at Silverstone 2025, 15 years after his debut. Audi built its works team around his experience and unerring speed.",
    drivingStyle:
      "Clean, classical technique with elite qualifying consistency; extracts midfield cars' maximum without drama.",
    helmetColors: ["#00E701", "#1A1A1A"],
    rivalries: ["Kevin Magnussen", "Sergio Pérez"],
    highlights: [
      "First podium at Silverstone 2025 after a record wait",
      "Pole position at Brazil 2010 in a Williams",
      "Won Le Mans overall at his first attempt (2015)",
    ],
    funFacts: [
      "Nicknamed 'The Hulk'; his kart bore the comic character.",
      "The only driver to win Le Mans outright while an active F1 racer in the modern era.",
      "Returned from three years as a reserve to lead Audi's project.",
    ],
  },
  bortoleto: {
    driverId: "bortoleto",
    bio: "Gabriel Bortoleto won F3 and F2 titles back-to-back — a feat matching Piastri and Leclerc — and grew rapidly through a tough rookie 2025 at Sauber into the cornerstone of Audi's future.",
    drivingStyle:
      "Championship-manager instincts: banks points when winning isn't possible, with clean overtaking and low error rates.",
    helmetColors: ["#FFD700", "#009739"],
    rivalries: ["Isack Hadjar", "Andrea Kimi Antonelli"],
    highlights: [
      "Consecutive F3 (2023) and F2 (2024) championships",
      "First Brazilian full-timer since Massa's retirement",
      "Audi works driver for 2026",
    ],
    funFacts: [
      "Managed by Fernando Alonso's A14 agency.",
      "Brazil's F1 broadcast ratings jumped on his debut.",
      "Moved to Italy at 13 to pursue karting.",
    ],
  },
  perez: {
    driverId: "perez",
    bio: "Sergio Pérez, Mexico's most successful F1 driver, returned from a year away to lead Cadillac's debut. Six wins, a vice-championship, and a reputation as the sport's premier tire manager made him the obvious anchor for an all-new team.",
    drivingStyle:
      "The definitive one-stop specialist — glacial tire degradation, opportunistic strategy, and podiums salvaged from nowhere.",
    helmetColors: ["#006847", "#CE1126"],
    rivalries: ["Esteban Ocon", "Max Verstappen"],
    highlights: [
      "Six Grand Prix victories including Monaco 2022",
      "Runner-up in the 2023 world championship",
      "Sakhir 2020 win from last place on lap one",
    ],
    funFacts: [
      "His Sakhir 2020 win came 190 races into his career — patience personified.",
      "A national holiday mood grips Mexico City's Foro Sol when he races at home.",
      "Mentored by Mexican billionaire Carlos Slim's motorsport program since karting.",
    ],
  },
  bottas: {
    driverId: "bottas",
    bio: "Valtteri Bottas won ten Grands Prix and five constructors' titles alongside Hamilton at Mercedes, reinvented himself at Sauber, and now brings a decade of front-running knowledge to Cadillac's startup operation.",
    drivingStyle:
      "Immaculate qualifying fundamentals and monumental consistency; a low-mistake baseline every new team craves.",
    helmetColors: ["#FFFFFF", "#0072CE"],
    rivalries: ["Lewis Hamilton"],
    highlights: [
      "10 wins and 20 poles, mostly with Mercedes",
      "Vice-champion in 2019 and 2020",
      "Five consecutive constructors' championships (2017–2021)",
    ],
    funFacts: [
      "Competes seriously in gravel cycling races off-season.",
      "His mullet-and-mustache era made him a social media icon.",
      "Owns a coffee brand roasted in Australia.",
    ],
  },

  /* ------------------------------- Legends ------------------------------- */
  senna: {
    driverId: "senna",
    bio: "Ayrton Senna remains the sport's most mythologized figure: three world titles, 65 poles, and qualifying laps that seemed to bend physics. His death at Imola 1994 changed Formula One safety forever.",
    drivingStyle:
      "Extracted supernatural one-lap pace by dancing on the throttle mid-corner; peerless in the rain, ruthless in combat.",
    helmetColors: ["#FFD700", "#009739"],
    rivalries: ["Alain Prost", "Nigel Mansell"],
    highlights: [
      "World Champion 1988, 1990, 1991",
      "Six Monaco wins, five consecutive",
      "Donington 1993 opening lap — from fifth to first in the wet",
    ],
    funFacts: [
      "Quietly donated millions to Brazilian children's causes, revealed only after his death.",
      "His 65 poles from 161 races is a strike rate never matched.",
      "Studied meteorology obsessively for wet-race advantage.",
    ],
  },
  prost: {
    driverId: "prost",
    bio: "Alain Prost, 'The Professor', won four world championships by treating racing as a science — managing tires, fuel, risk and rivals with cold precision through F1's most dangerous modern era.",
    drivingStyle:
      "Smoothness incarnate: minimal inputs, geometric lines, races won at the slowest possible speed.",
    helmetColors: ["#0055A4", "#EF4135"],
    rivalries: ["Ayrton Senna", "Nigel Mansell", "Niki Lauda"],
    highlights: [
      "World Champion 1985, 1986, 1989, 1993",
      "51 wins — the record for over a decade",
      "Beat Lauda by half a point in 1984, the closest title ever",
    ],
    funFacts: [
      "Won his final championship in 1993 and retired immediately as champion.",
      "Later co-owned the Prost Grand Prix team.",
      "His feud and eventual friendship with Senna defined an era.",
    ],
  },
  michael_schumacher: {
    driverId: "michael_schumacher",
    bio: "Michael Schumacher turned Ferrari from perennial heartbreak into the most dominant machine in F1 history, adding five straight titles (2000–2004) to his two with Benetton. His work ethic professionalized the modern sport.",
    drivingStyle:
      "Attacked corner entry with an oversteering rear he alone could tame; qualifying-speed laps repeated for full race distances.",
    helmetColors: ["#E8002D", "#FFFFFF"],
    rivalries: ["Mika Häkkinen", "Damon Hill", "Fernando Alonso"],
    highlights: [
      "Seven world championships (1994, 1995, 2000–2004)",
      "91 wins, a record that stood for 14 years",
      "13 wins in a single season (2004)",
    ],
    funFacts: [
      "Debuted as a one-race substitute at Spa 1991 and qualified seventh.",
      "Kept a karting license and raced karts between title campaigns.",
      "Personally funded disaster relief donations of tens of millions.",
    ],
  },
  fangio: {
    driverId: "fangio",
    bio: "Juan Manuel Fangio won five world championships with four different constructors in the 1950s — a percentage dominance (24 wins from 52 races) no one has approached since.",
    drivingStyle:
      "Four-wheel drifts balanced on the throttle; mechanical sympathy honed as a riding mechanic in Argentine road races.",
    helmetColors: ["#F5D547", "#75AADB"],
    rivalries: ["Stirling Moss", "Alberto Ascari"],
    highlights: [
      "World Champion 1951, 1954, 1955, 1956, 1957",
      "Nürburgring 1957: broke the lap record ten times to win",
      "Champion with Alfa Romeo, Mercedes, Ferrari and Maserati",
    ],
    funFacts: [
      "Won his last title at 46 — still the oldest champion.",
      "Once kidnapped by Cuban revolutionaries, who released him as fans.",
      "A statue of Fangio stands at circuits on three continents.",
    ],
  },
  clark: {
    driverId: "clark",
    bio: "Jim Clark, the quiet Scottish farmer, was the purest natural talent of the 1960s: two titles, 25 wins, and an Indianapolis 500 victory, all in Colin Chapman's fragile, brilliant Lotuses.",
    drivingStyle:
      "So smooth he barely seemed to work; adapted instantly to any car, any surface, any discipline.",
    helmetColors: ["#00247D", "#FFFFFF"],
    rivalries: ["Graham Hill", "John Surtees"],
    highlights: [
      "World Champion 1963 and 1965",
      "Won the 1965 Indianapolis 500 as a rookie oval racer",
      "Led 71.5% of laps in 1963 — still unmatched",
    ],
    funFacts: [
      "Won the Belgian GP four times at fearsome old Spa, a track he hated.",
      "Raced in NASCAR, rally, and touring cars — and won in most.",
      "His death at Hockenheim 1968 shook the sport's sense of invincibility.",
    ],
  },
  lauda: {
    driverId: "lauda",
    bio: "Niki Lauda won three titles and staged sport's greatest comeback: 40 days after receiving last rites following his fiery Nürburgring crash in 1976, he raced again at Monza — and finished fourth.",
    drivingStyle:
      "Analytical to the decimal point; developed cars relentlessly and drove at exactly the required speed, never more.",
    helmetColors: ["#E8002D", "#FFFFFF"],
    rivalries: ["James Hunt", "Alain Prost"],
    highlights: [
      "World Champion 1975, 1977, 1984",
      "Returned from near-fatal burns in six weeks (1976)",
      "Won the 1984 title by half a point over Prost",
    ],
    funFacts: [
      "Founded and ran two airlines while racing.",
      "Withdrew from the deadly 1976 Japanese GP finale, conceding the title on principle.",
      "As Mercedes chairman, he brokered Hamilton's 2013 signing.",
    ],
  },
  stewart: {
    driverId: "stewart",
    bio: "Jackie Stewart won three world championships while waging a lonely, furious campaign for safety that transformed F1 from a blood sport into a professional one. Sixty-plus drivers died in his era; his activism saved hundreds since.",
    drivingStyle:
      "Silk-smooth progressive inputs — his tartan helmet band barely moved; devastating in the wet, most famously at the 1968 Nürburgring.",
    helmetColors: ["#FFFFFF", "#1D3C6E"],
    rivalries: ["Jochen Rindt", "Emerson Fittipaldi"],
    highlights: [
      "World Champion 1969, 1971, 1973",
      "Won the 1968 German GP by four minutes in fog and rain",
      "27 wins in just 99 starts",
    ],
    funFacts: [
      "Competed at the Olympics trials in shooting before racing.",
      "Severe dyslexia went undiagnosed until his sons were tested.",
      "Founded Stewart Grand Prix, which became Red Bull Racing via Jaguar.",
    ],
  },
  mansell: {
    driverId: "mansell",
    bio: "Nigel Mansell's all-or-nothing aggression made him Britain's people's champion. After years of near-misses he crushed the 1992 season with Williams' FW14B, then won the IndyCar title as a rookie the following year.",
    drivingStyle:
      "Maximum attack, visible car wrestling, and overtakes nobody else would attempt — like around the outside of Berger at Peraltada.",
    helmetColors: ["#E8112D", "#0033A0"],
    rivalries: ["Nelson Piquet", "Ayrton Senna", "Alain Prost"],
    highlights: [
      "World Champion 1992 with a record nine wins",
      "1993 IndyCar champion as a rookie",
      "31 wins, Britain's most until Hamilton",
    ],
    funFacts: [
      "Funded early racing by selling his house; broke his neck twice in juniors.",
      "Worked as a special constable (volunteer policeman) on the Isle of Man.",
      "Silverstone crowds famously invaded the track after his home wins.",
    ],
  },
  hakkinen: {
    driverId: "hakkinen",
    bio: "Mika Häkkinen survived a near-fatal 1995 crash to become the only rival Michael Schumacher openly feared, taking back-to-back titles with McLaren in 1998 and 1999.",
    drivingStyle:
      "Blindingly quick and unshakeable; famous for silence under pressure and the overtake of the decade on Schumacher at Spa 2000.",
    helmetColors: ["#FFFFFF", "#0072CE"],
    rivalries: ["Michael Schumacher"],
    highlights: [
      "World Champion 1998 and 1999",
      "Spa 2000: the three-wide pass on Schumacher around Zonta",
      "20 wins, all with McLaren",
    ],
    funFacts: [
      "Schumacher called him the opponent he respected most.",
      "Cried on camera at Monza 1999 after a rare error — fans loved him more for it.",
      "Returned from his coma-inducing Adelaide crash within months.",
    ],
  },
  vettel: {
    driverId: "vettel",
    bio: "Sebastian Vettel won four consecutive titles with Red Bull (2010–2013), becoming the youngest champion in history, then evolved into the sport's conscience on safety, diversity and the environment.",
    drivingStyle:
      "Built weekends around qualifying dominance and first-stint escapes, exploiting blown-diffuser downforce like no one else.",
    helmetColors: ["#FFFFFF", "#D40000"],
    rivalries: ["Fernando Alonso", "Lewis Hamilton", "Mark Webber"],
    highlights: [
      "Four consecutive world championships (2010–2013)",
      "Youngest world champion (23 years, 134 days)",
      "53 wins including 13 in 2013 with nine straight",
    ],
    funFacts: [
      "Named his cars — Kate, Luscious Liz, Hungry Heidi among them.",
      "Won Toro Rosso's only race until 2020 at Monza 2008, aged 21.",
      "Organized karting events for women in Saudi Arabia after retirement.",
    ],
  },
  raikkonen: {
    driverId: "raikkonen",
    bio: "Kimi Räikkönen, the Iceman, jumped from 23 car races directly into F1, won the 2007 title for Ferrari by a single point, and became the most beloved anti-celebrity in the paddock across two decades.",
    drivingStyle:
      "Reflex-driven speed with famously light steering input; delivered instantly in any car with zero interest in explaining how.",
    helmetColors: ["#FFFFFF", "#005CA9"],
    rivalries: ["Michael Schumacher", "Fernando Alonso"],
    highlights: [
      "World Champion 2007 with Ferrari",
      "Most race starts in F1 history (349)",
      "Won on his Ferrari return at Austin 2018 aged 39",
    ],
    funFacts: [
      "His entire title-winning radio celebration: a grunt.",
      "Raced NASCAR trucks and World Rally during his F1 sabbatical.",
      "Ferrari signed him twice; fans never stopped chanting his name.",
    ],
  },
  button: {
    driverId: "button",
    bio: "Jenson Button waited nine seasons for a competitive car, then delivered a title with Brawn GP in 2009's fairytale season — six wins in seven races in a team saved from collapse for £1.",
    drivingStyle:
      "The smoothest of his generation; peerless in mixed wet-dry conditions where reading grip mattered more than raw pace.",
    helmetColors: ["#FFFFFF", "#E8112D"],
    rivalries: ["Lewis Hamilton"],
    highlights: [
      "World Champion 2009 with Brawn GP",
      "Canada 2011: won from last after six pit stops",
      "Beat teammate Hamilton on points across 2010–2012",
    ],
    funFacts: [
      "Completed his first triathlon mid-career and became a serious competitor.",
      "His father John's pink shirts remain a paddock tribute symbol.",
      "Won the final race of his rookie constructor's only season.",
    ],
  },
  damon_hill: {
    driverId: "damon_hill",
    bio: "Damon Hill carried Williams through the trauma of 1994 and beat Schumacher for the 1996 crown, making the Hills the first father-son world champions.",
    drivingStyle:
      "Meticulous and resilient; developed into a fierce wheel-to-wheel racer under the most intense psychological pressure of the 90s.",
    helmetColors: ["#00247D", "#FFFFFF"],
    rivalries: ["Michael Schumacher", "Jacques Villeneuve"],
    highlights: [
      "World Champion 1996",
      "22 wins including Suzuka 1994 title-fight masterpiece",
      "Nearly won in an Arrows at Hungary 1997",
    ],
    funFacts: [
      "Started F1 at 32 after years as a test driver and motorcycle racer.",
      "His helmet carried his father Graham's iconic London Rowing Club oars.",
      "Played guitar on stage with George Harrison and Def Leppard.",
    ],
  },
  moss: {
    driverId: "moss",
    bio: "Stirling Moss won 16 Grands Prix and is remembered as the greatest driver never to win the championship — four times runner-up, often beaten only by loyalty to British cars or acts of sportsmanship.",
    drivingStyle:
      "Versatility itself: sports cars, rallies, F1 — sideways when needed, delicate when it counted, fast always.",
    helmetColors: ["#FFFFFF", "#00247D"],
    rivalries: ["Juan Manuel Fangio", "Mike Hawthorn"],
    highlights: [
      "16 wins from 66 starts without a title",
      "Mille Miglia 1955 victory at record average speed",
      "Won Monaco 1961 holding off three Ferraris for 100 laps",
    ],
    funFacts: [
      "Defended rival Hawthorn at a 1958 tribunal, costing himself the title.",
      "'Who do you think you are, Stirling Moss?' became British police slang.",
      "Knighted in 2000; raced competitively into his 80s.",
    ],
  },
  piquet: {
    driverId: "piquet",
    bio: "Nelson Piquet won three world championships with sharp engineering feedback and sharper elbows, thriving in Brabham's turbo era and surviving Williams' civil war with Mansell.",
    drivingStyle:
      "A development driver supreme who set cars up for race stints, not headlines; conserved machinery then attacked late.",
    helmetColors: ["#E8112D", "#FFFFFF"],
    rivalries: ["Nigel Mansell", "Alain Prost", "Ayrton Senna"],
    highlights: [
      "World Champion 1981, 1983, 1987",
      "First champion of the turbo era (1983)",
      "23 wins across three constructors",
    ],
    funFacts: [
      "Raced under his mother's surname to hide racing from his father.",
      "Won the 1983 title after a final-race engine gamble at Kyalami.",
      "His son Nelson Jr. became an F1 driver and Formula E champion.",
    ],
  },
  ascari: {
    driverId: "ascari",
    bio: "Alberto Ascari dominated the early championship like no one since: back-to-back titles in 1952–53 with Ferrari, including nine consecutive wins — a record that stood for seventy years.",
    drivingStyle:
      "Precise, front-running metronome; almost unbeatable from the lead, uncomfortable in traffic he rarely saw.",
    helmetColors: ["#75AADB", "#FFFFFF"],
    rivalries: ["Juan Manuel Fangio", "Giuseppe Farina"],
    highlights: [
      "World Champion 1952 and 1953",
      "Nine consecutive Grand Prix wins (1952–53)",
      "Won 40% of every championship race he entered by 1953",
    ],
    funFacts: [
      "Crashed into Monaco's harbor in 1955 and swam away — he died testing at Monza four days later.",
      "His father Antonio was also a champion racer killed in a race car.",
      "Superstitious about his lucky blue helmet, worn in every race.",
    ],
  },
};

export function getDriverMeta(driverId: string): DriverMeta | undefined {
  return DRIVER_META[driverId];
}
