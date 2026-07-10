import type { Lesson } from "@/content/lessons/types";

export const MACHINERY_LESSONS: Lesson[] = [
  {
    slug: "cars",
    title: "The Cars",
    category: "machinery",
    difficulty: 1,
    minutes: 7,
    summary: "What an F1 car actually is: a carbon-fiber survival cell wrapped in aerodynamics, driven by a hybrid power unit.",
    sections: [
      {
        heading: "An aircraft that refuses to fly",
        body: [
          "An F1 car is best understood as an upside-down aircraft: its wings and floor push it down instead of up, generating several times the car's weight in downforce at speed. That grip is why an F1 car corners at speeds that would fling a supercar off the road.",
          "The 2026 generation is smaller and lighter than its predecessors — about 190 cm wide with a minimum weight of 768 kg — with active aerodynamics that change the wings' angle between corners and straights.",
        ],
        diagram: "downforce",
      },
      {
        heading: "Built around the driver",
        body: [
          "The structural heart is the monocoque or 'survival cell' — a carbon-fiber tub designed to remain intact through enormous impacts. The driver sits reclined, feet up, in a custom-molded seat, protected by the halo above and crash structures at every extremity.",
          "The engine bolts directly to the back of the tub as a structural member, and the gearbox bolts to the engine, carrying the rear suspension. Nothing on an F1 car is only one thing.",
        ],
      },
      {
        heading: "The numbers that matter",
        body: [
          "Top speeds reach 350+ km/h, but straight-line speed is almost incidental — corners decide lap time. Braking from 320 km/h to 90 km/h takes about 120 meters and subjects the driver to ~5g. Cornering loads reach 4–6g, which is why drivers train necks like sprinters train legs.",
          "A car comprises ~14,500 parts, and teams redesign thousands of them during a single season. The car that finishes the year shares little more than a name with the one that started it.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the primary structural component protecting the driver?",
        options: ["The roll hoop", "The carbon-fiber monocoque (survival cell)", "The engine block", "The floor"],
        answerIndex: 1,
        explanation: "The monocoque tub is engineered to stay intact through the biggest crashes; everything else can (and should) break away.",
      },
      {
        question: "Why do F1 cars corner so much faster than road supercars?",
        options: [
          "Lighter drivers",
          "Aerodynamic downforce pressing them onto the track",
          "Wider roads",
          "Four-wheel steering",
        ],
        answerIndex: 1,
        explanation: "Wings and floor generate several times the car's weight in downward force, multiplying tire grip at speed.",
      },
      {
        question: "What is new about the 2026 generation of cars?",
        options: [
          "V12 engines",
          "Smaller, lighter chassis with active aerodynamics",
          "Six wheels",
          "Closed cockpits",
        ],
        answerIndex: 1,
        explanation: "The 2026 rules brought smaller, ~768 kg cars with movable front and rear wings (X-mode and Z-mode).",
      },
      {
        question: "Roughly how many g does a driver experience under maximum braking?",
        options: ["1g", "2g", "5g", "10g"],
        answerIndex: 2,
        explanation: "Around 5g — five times body weight thrown against the belts, corner after corner for 90 minutes.",
      },
    ],
    flashcards: [
      { front: "Monocoque", back: "The one-piece carbon-fiber survival cell that forms the car's chassis and protects the driver." },
      { front: "Downforce", back: "Aerodynamic force pressing the car down — several times its weight at speed." },
      { front: "Halo", back: "The titanium cockpit protection hoop, mandatory since 2018 — supports the weight of a bus." },
      { front: "2026 car weight", back: "Minimum 768 kg including driver — lighter and smaller than the previous generation." },
    ],
    takeaways: [
      "An F1 car is an inverted aircraft: downforce is the entire design philosophy.",
      "The carbon monocoque is a survival cell; everything else is sacrificial.",
      "Corners, not straights, decide lap time — hence 5g braking and 4–6g cornering.",
    ],
    misconceptions: [
      {
        myth: "F1 cars are mainly about huge engine power.",
        reality: "Power is capped by fuel-flow rules; aerodynamic grip is where lap time lives. A wingless F1 car would be slower through corners than a good road car is on paper.",
      },
    ],
    facts: [
      "Brake discs run at up to 1,000°C and are made of carbon, not steel.",
      "An F1 car's ~14,500 parts get redesigned continuously — hundreds of updates land every season.",
    ],
    next: ["aerodynamics", "power-units"],
  },
  {
    slug: "aerodynamics",
    title: "Aerodynamics",
    category: "machinery",
    difficulty: 2,
    minutes: 8,
    summary: "Downforce, drag, ground effect and dirty air — the invisible forces that dominate car design.",
    sections: [
      {
        heading: "Downforce vs. drag: the eternal trade",
        body: [
          "Every aerodynamic surface produces two forces: downforce (good — presses tires into the track) and drag (bad — slows the car on straights). Aerodynamicists spend careers improving that ratio. A Monaco setup piles on wing angle for maximum grip; a Monza setup shaves it away for top speed.",
          "Downforce grows with the square of speed: double the speed, quadruple the force. At 300 km/h a modern car generates far more downforce than its own weight.",
        ],
        diagram: "downforce",
      },
      {
        heading: "Ground effect: the floor is the secret",
        body: [
          "The car's biggest wing is invisible: the floor. Shaped underbody tunnels accelerate air beneath the car, dropping its pressure so the atmosphere above pushes the car down. This 'ground effect' produces most of a modern car's downforce with relatively little drag — the best trade in aerodynamics.",
          "It's also touchy. The floor works best millimeters from the ground, which is why cars run brutally stiff and why the 2022 cars famously 'porpoised' — bouncing as airflow stalled and reattached in cycles.",
        ],
      },
      {
        heading: "Dirty air and the racing problem",
        body: [
          "A car punches a hole in the air and leaves turbulence behind. A following car loses front downforce in that 'dirty air', overheats its tires sliding around, and can't stay close enough to attack. This is racing's fundamental aerodynamic paradox: the faster the cars, the worse the racing — unless rules intervene.",
          "The 2022 ground-effect rules cut the losses substantially, and the 2026 regulations continue the effort with active aero: wings flatten on straights (X-mode) for speed and steepen in corners (Z-mode) for grip, replacing the old DRS overtaking aid with a standard capability plus a 'manual override' boost for attacking cars.",
        ],
      },
      {
        heading: "How teams find it",
        body: [
          "Aero development is an arms race run in three tools: CFD (computational fluid dynamics) simulations, a 60%-scale wind tunnel, and real-track correlation using sensor rakes. Regulations limit tunnel and CFD hours — with less allocation for teams higher in the standings, a deliberate handicap system.",
          "Gains are measured in 'points' of downforce; a few points equal roughly a tenth of a second per lap. Championships are won by whoever adds points fastest across a season.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the relationship between downforce and speed?",
        options: [
          "Linear — double speed, double force",
          "Quadratic — double speed, quadruple force",
          "Constant at all speeds",
          "Inverse — less force at high speed",
        ],
        answerIndex: 1,
        explanation: "Aerodynamic force scales with the square of speed, which is why high-speed corners can be taken flat.",
      },
      {
        question: "Where does most of a modern F1 car's downforce come from?",
        options: ["The rear wing", "The front wing", "The shaped underfloor (ground effect)", "The halo"],
        answerIndex: 2,
        explanation: "Underbody tunnels create low pressure beneath the car — the most efficient downforce source, dominant since 2022.",
      },
      {
        question: "Why is following another car closely difficult?",
        options: [
          "Engine overheating",
          "Turbulent 'dirty air' robs the follower of front downforce",
          "Blue flag rules",
          "Fuel consumption rises",
        ],
        answerIndex: 1,
        explanation: "The wake of the lead car degrades the follower's aero grip, causing sliding, tire overheating and lost pace.",
      },
      {
        question: "What are X-mode and Z-mode in the 2026 rules?",
        options: [
          "Engine maps",
          "Active aero states: low-drag straights (X) and high-downforce corners (Z)",
          "Tire compounds",
          "Qualifying formats",
        ],
        answerIndex: 1,
        explanation: "The 2026 cars' movable wings switch between straight-line and cornering configurations automatically.",
      },
      {
        question: "Why did the 2022 cars 'porpoise'?",
        options: [
          "Soft tires",
          "Ground-effect airflow stalling and reattaching cyclically at low ride heights",
          "Driver error",
          "Weak suspension springs",
        ],
        answerIndex: 1,
        explanation: "As the floor sucked the car lower, airflow stalled, downforce vanished, the car rose, flow reattached — repeat, violently.",
      },
    ],
    flashcards: [
      { front: "Drag", back: "Air resistance opposing motion — the price paid for downforce." },
      { front: "Ground effect", back: "Downforce from accelerating air under the shaped floor — high grip, low drag, ride-height sensitive." },
      { front: "Dirty air", back: "Turbulence behind a car that strips a follower's downforce and overheats its tires." },
      { front: "CFD", back: "Computational Fluid Dynamics — simulated aerodynamics, rationed by regulation." },
      { front: "X-mode / Z-mode", back: "2026 active-aero states: flattened wings for straights, steepened for corners." },
    ],
    takeaways: [
      "Everything is the downforce-vs-drag trade, tuned per circuit.",
      "The floor, not the wings, generates most modern downforce.",
      "Dirty air is the enemy of close racing; the 2022 and 2026 rules exist to fight it.",
      "Development speed — points of downforce per week — decides championships.",
    ],
    misconceptions: [
      {
        myth: "Bigger wings always make the car faster.",
        reality: "More wing means more corner grip but less straight-line speed. Monza and Monaco setups differ enormously for exactly this reason.",
      },
    ],
    facts: [
      "Teams may run wind tunnels only at 60% scale and limited hours — with championship leaders allowed the least.",
      "The 'points of downforce' currency converts to about a tenth of a second per few points at most tracks.",
    ],
    next: ["drs", "engineering"],
  },
  {
    slug: "power-units",
    title: "Power Units",
    category: "machinery",
    difficulty: 2,
    minutes: 8,
    summary: "The 2026 hybrid: a 1.6-liter V6 plus a potent electric motor, running 100% sustainable fuel.",
    sections: [
      {
        heading: "Why 'power unit', not 'engine'",
        body: [
          "Since 2014, F1 cars are propelled by hybrid systems: a 1.6-liter turbocharged V6 internal-combustion engine plus electrical machinery that recovers, stores and redeploys energy. The complete package — engine, motor-generator, battery, turbo and control electronics — is the 'power unit'.",
          "The 2026 regulations rebalanced it dramatically: electrical power roughly triples to ~350 kW, making the split between combustion and electric power close to 50/50. The MGU-H (turbo energy recovery) was dropped to cut cost and complexity.",
        ],
        diagram: "ers-flow",
      },
      {
        heading: "Sustainable fuel",
        body: [
          "From 2026 all cars run 100% sustainable 'drop-in' fuel — synthesized without adding new fossil carbon, and usable in principle by ordinary road cars. This was the headline demand that attracted Audi, Honda's return, and Ford's partnership with Red Bull.",
          "Fuel-flow limits, not displacement, cap engine power. Efficiency is the competition: F1 engines exceed 50% thermal efficiency, the highest of any production-adjacent combustion engine ever built.",
        ],
      },
      {
        heading: "Managing the battery",
        body: [
          "Drivers and their engineers manage electrical deployment lap by lap: harvest under braking, deploy on the straights that matter. With half the power now electric, energy management is as decisive as raw horsepower — running out of battery mid-straight is the new running out of breath.",
          "The 2026 rules add a 'manual override' mode giving attacking cars extra electrical deployment when close behind a rival — the spiritual successor to DRS.",
        ],
      },
      {
        heading: "Reliability and penalties",
        body: [
          "Each driver gets a limited allocation of power-unit components per season; exceeding it triggers grid penalties. This is why you'll see teams strategically take a 'penalty weekend' at a track where overtaking is easy, banking a fresh engine for the run home.",
          "Manufacturers — Ferrari, Mercedes, Honda, Red Bull Ford, Audi — supply themselves and customer teams, and a winter of engine development can reorder the entire grid.",
        ],
      },
    ],
    quiz: [
      {
        question: "What is the approximate combustion/electric power split under the 2026 rules?",
        options: ["90/10", "70/30", "Roughly 50/50", "20/80"],
        answerIndex: 2,
        explanation: "Electrical power rose to ~350 kW in 2026, making the split nearly even — the biggest hybrid step in F1 history.",
      },
      {
        question: "Which component was dropped for 2026?",
        options: ["The turbocharger", "The MGU-K", "The MGU-H", "The battery"],
        answerIndex: 2,
        explanation: "The MGU-H (heat energy recovery from the turbo) was removed to reduce cost and complexity and attract new manufacturers.",
      },
      {
        question: "What fuel do 2026 cars use?",
        options: [
          "Standard pump gasoline",
          "100% sustainable synthetic fuel",
          "Hydrogen",
          "Pure ethanol",
        ],
        answerIndex: 1,
        explanation: "Fully sustainable 'drop-in' fuel — a key reason Audi, Honda and Ford committed to 2026.",
      },
      {
        question: "What limits engine power under the rules?",
        options: ["Displacement", "Fuel-flow (energy-flow) limits", "RPM alone", "Tire grip"],
        answerIndex: 1,
        explanation: "Energy-flow caps make efficiency the true competition — F1 engines exceed 50% thermal efficiency.",
      },
      {
        question: "Why would a team deliberately take an engine penalty?",
        options: [
          "To save fuel",
          "To bank a fresh power unit at a track where recovery through the field is easy",
          "Penalties earn points",
          "To reset tire allocation",
        ],
        answerIndex: 1,
        explanation: "Strategic penalties at overtaking-friendly circuits trade one bad Saturday for fresh performance across many races.",
      },
    ],
    flashcards: [
      { front: "Power unit", back: "The full hybrid package: 1.6L turbo V6 + MGU-K + battery + electronics." },
      { front: "MGU-K", back: "The motor-generator recovering braking energy and deploying ~350 kW of electric power (2026)." },
      { front: "Thermal efficiency", back: "F1 power units exceed 50% — the most efficient racing engines ever." },
      { front: "Manual override", back: "The 2026 attack mode: extra electrical deployment for a chasing car — DRS's successor." },
      { front: "Component allocation", back: "Limited engines/parts per season; exceeding it means grid penalties." },
    ],
    takeaways: [
      "2026 power units are near 50/50 hybrid, on 100% sustainable fuel.",
      "Fuel-flow limits make efficiency, not displacement, the competition.",
      "Energy management is now as decisive as horsepower.",
      "Component limits turn reliability into a season-long strategy game.",
    ],
    misconceptions: [
      {
        myth: "F1 hybrids are like road-car hybrids — economy devices.",
        reality: "The MGU-K delivers about 470 hp of instant electric punch; it's a performance weapon that happens to be efficient.",
      },
    ],
    facts: [
      "F1's ~50%+ thermal efficiency roughly doubles a typical road car engine's.",
      "The V6 revs to 15,000 rpm; its pistons travel up and down about 250 times per second.",
    ],
    next: ["ers", "engineering"],
  },
  {
    slug: "ers",
    title: "ERS: The Electric Weapon",
    category: "machinery",
    difficulty: 2,
    minutes: 6,
    summary: "How braking energy becomes overtaking power — harvest, store, deploy, repeat.",
    sections: [
      {
        heading: "The energy loop",
        body: [
          "Every braking zone wastes energy as heat — unless you catch it. The MGU-K (Motor Generator Unit–Kinetic) connects to the drivetrain and runs both ways: under braking it acts as a generator, converting the car's motion into electricity stored in the battery; on the straights it flips into motor mode, feeding that energy back as propulsion.",
          "The loop runs every lap: harvest into corners, deploy out of them. Under the 2026 rules the electrical side contributes roughly half the car's total power.",
        ],
        diagram: "ers-flow",
      },
      {
        heading: "Deployment strategy",
        body: [
          "The battery can't hold unlimited energy, so when to spend it is a genuine strategy. Software plans a default deployment map per lap — prioritizing the straights where speed matters most — and drivers adjust with steering-wheel switches: full attack to pass, extra harvesting to save for later.",
          "Defending is electric too: a leading driver saving battery for the finish-line straight can neutralize an attacker's advantage. Watching the ERS chess within a battle is one of modern F1's hidden pleasures.",
        ],
      },
      {
        heading: "From KERS to today",
        body: [
          "The first system, KERS (2009), offered a modest 60 kW for 6.7 seconds per lap via a boost button. The 2014 hybrids made recovery continuous and powerful; 2026 tripled electric output again and added the manual-override attack mode. In fifteen years, electricity went from party trick to half the propulsion.",
        ],
      },
    ],
    quiz: [
      {
        question: "What does the MGU-K do under braking?",
        options: [
          "Nothing — it only works on straights",
          "Acts as a generator, converting motion into stored electricity",
          "Increases brake temperature",
          "Charges the rival's battery",
        ],
        answerIndex: 1,
        explanation: "In generator mode it converts kinetic energy to electricity, simultaneously providing some braking force.",
      },
      {
        question: "Why can't drivers deploy full electric power all lap?",
        options: [
          "It's against the rules to overtake with it",
          "Battery energy is limited — deployment must be budgeted",
          "The motor overheats in corners",
          "Deployment only works in DRS zones",
        ],
        answerIndex: 1,
        explanation: "Energy storage and per-lap limits force a spend-versus-save strategy that drivers manage from the wheel.",
      },
      {
        question: "What was KERS?",
        options: [
          "The first F1 traction control",
          "The 2009 push-button hybrid boost — 60 kW for 6.7 s/lap",
          "A tire compound",
          "A qualifying format",
        ],
        answerIndex: 1,
        explanation: "Kinetic Energy Recovery System — the modest ancestor of today's massively more powerful hybrid systems.",
      },
      {
        question: "How is ERS used defensively?",
        options: [
          "It can't be",
          "Saving battery to deploy exactly where the attacker attacks",
          "It jams the rival's radio",
          "It cools the tires",
        ],
        answerIndex: 1,
        explanation: "Matching deployment on the critical straight neutralizes the attacker's energy advantage — electric chess.",
      },
    ],
    flashcards: [
      { front: "Harvest", back: "Recovering energy (mainly under braking) into the battery." },
      { front: "Deploy", back: "Spending stored electrical energy as propulsion on demand." },
      { front: "KERS", back: "The original 2009 system: 60 kW for 6.7 seconds per lap, via a boost button." },
      { front: "Deployment map", back: "The software plan for where on each lap electric power is spent." },
    ],
    takeaways: [
      "ERS is a loop: harvest under braking, deploy on the straights.",
      "Battery budgeting is a real-time strategy layer for drivers and engineers.",
      "Electric power grew from a 60 kW gimmick (2009) to half of total output (2026).",
    ],
    misconceptions: [
      {
        myth: "The hybrid system is only about efficiency PR.",
        reality: "ERS is a tactical weapon: deployment timing wins and loses on-track battles every race.",
      },
    ],
    facts: [
      "Harvesting affects brake feel, so brake-by-wire electronics blend friction and regeneration seamlessly.",
      "Drivers manage deployment modes mid-corner via steering-wheel rotaries — while pulling 4g.",
    ],
    next: ["power-units", "drs"],
  },
  {
    slug: "drs",
    title: "DRS & Overtaking Aids",
    category: "machinery",
    difficulty: 1,
    minutes: 5,
    summary: "The rear-wing flap that defined an era of overtaking — and its 2026 successor, the manual override.",
    sections: [
      {
        heading: "How DRS works",
        body: [
          "DRS — the Drag Reduction System — is a flap in the rear wing that flattens on command, dumping drag and adding roughly 10–12 km/h of straight-line speed. It could only be used in marked 'DRS zones', and only when a car crossed the detection point within one second of the car ahead.",
          "The design goal was surgical: give the chasing car just enough advantage to offset the dirty-air penalty of following, without making passes automatic.",
        ],
        diagram: "drs",
      },
      {
        heading: "The controversy",
        body: [
          "Purists argued DRS made overtaking artificial — a 'push-to-pass' button rather than earned racecraft. Defenders pointed at pre-DRS seasons where faster cars sat trapped for fifty laps. The truth lived circuit by circuit: well-calibrated zones produced battles; overpowered ones produced motorway passes.",
          "'DRS trains' showed the system's limit: a queue of cars each within a second of the next, all with DRS open, all unable to pass because their advantages cancelled out.",
        ],
      },
      {
        heading: "2026: from DRS to override",
        body: [
          "The 2026 regulations retired classic DRS. All cars now flatten their wings on straights automatically (X-mode) — low drag is standard, not a chasing bonus. The overtaking aid moved to the power unit: a 'manual override' gives the attacking car extra electrical deployment when within range of a rival.",
          "Same philosophy, new hardware: compensate the follower for dirty air, keep the pass a fight.",
        ],
      },
    ],
    quiz: [
      {
        question: "What did classic DRS physically do?",
        options: [
          "Boosted engine power",
          "Opened a rear-wing flap to reduce drag",
          "Softened the suspension",
          "Cooled the tires",
        ],
        answerIndex: 1,
        explanation: "The rear-wing flap flattened, cutting drag for ~10–12 km/h more top speed in designated zones.",
      },
      {
        question: "What was the condition for using DRS in a race?",
        options: [
          "Any time on any straight",
          "Within one second of the car ahead at the detection point, in a DRS zone",
          "Only when leading",
          "Once per lap maximum",
        ],
        answerIndex: 1,
        explanation: "The one-second detection rule limited DRS to genuine pursuit situations in marked zones.",
      },
      {
        question: "What replaced DRS as the overtaking aid in 2026?",
        options: [
          "Bigger wings",
          "The electrical 'manual override' deployment boost",
          "Sticky tires for attackers",
          "Reversed grids",
        ],
        answerIndex: 1,
        explanation: "With low-drag X-mode standard for everyone, the chasing car's bonus became extra electric power.",
      },
      {
        question: "What is a 'DRS train'?",
        options: [
          "The truck convoy between races",
          "A queue of cars all within a second of each other, DRS advantages cancelling out",
          "The support series",
          "A type of slipstream at Monza",
        ],
        answerIndex: 1,
        explanation: "When everyone in the queue has DRS, nobody gains — cars circulate trapped in line.",
      },
    ],
    flashcards: [
      { front: "DRS zone", back: "A marked straight where the rear-wing flap could open — typically 1–4 per circuit." },
      { front: "Detection point", back: "The timing line where the one-second gap was measured to grant DRS." },
      { front: "DRS train", back: "A queue of cars whose mutual DRS advantages cancel out — nobody can pass." },
      { front: "Manual override (2026)", back: "Extra electric deployment for a chasing car — the new overtaking aid." },
    ],
    takeaways: [
      "DRS traded drag for speed, granted only to a car within one second of its prey.",
      "It existed to offset dirty air, not to hand out free passes.",
      "2026 made low drag universal (X-mode) and moved the chase bonus to electric power.",
    ],
    misconceptions: [
      {
        myth: "DRS made every pass automatic.",
        reality: "Well-tuned zones only brought cars alongside — the pass still had to be completed under braking. Poorly tuned zones were the exception that fueled the stereotype.",
      },
    ],
    facts: [
      "DRS was introduced in 2011 after the 2010 season featured famously processional races despite four championship contenders.",
      "Some circuits ran four DRS zones; Monaco's single zone rarely produced a pass at all.",
    ],
    next: ["aerodynamics", "ers"],
  },
  {
    slug: "tires",
    title: "Tires",
    category: "machinery",
    difficulty: 2,
    minutes: 7,
    summary: "The only four contact patches that touch the road: compounds, temperature windows, degradation and the cliff.",
    sections: [
      {
        heading: "Four postcards of rubber",
        body: [
          "Everything a driver does travels through four contact patches roughly the size of postcards. Tires are the single biggest performance variable in F1 — a car on the right rubber at the right temperature can be seconds faster than the same car on the wrong one.",
          "Pirelli brings three dry compounds to each race, labeled soft (red), medium (yellow) and hard (white) from a larger family. Softer rubber grips better but wears faster; the race-day question is always speed now versus endurance later.",
        ],
        diagram: "tire-compounds",
      },
      {
        heading: "The temperature window",
        body: [
          "Slicks work in a narrow window, roughly 90–110°C. Below it the rubber is stiff and slides ('graining' as the cold surface tears); above it the tire overheats and blisters. Drivers weave on formation laps, brake hard deliberately, and manage pace precisely to keep tires in the window.",
          "Different cars stress tires differently — one team's car might switch tires on instantly but cook them, another warms them slowly but preserves them. These 'tire characters' shape entire seasons.",
        ],
      },
      {
        heading: "Degradation and the cliff",
        body: [
          "Tires lose performance with wear and heat cycles — 'degradation'. It isn't linear: past a threshold, grip collapses suddenly. Strategists call it the cliff, and reading its approach (rising lap times, sliding, driver reports) is the trigger for most pit calls.",
          "Managing 'deg' is a driving skill of its own: the best tire managers — Pérez, Sainz, historically Button and Prost — win races on strategy options their gentler style unlocks.",
        ],
      },
      {
        heading: "Rain rubber",
        body: [
          "Intermediates (green stripe) handle damp tracks; full wets (blue stripe) clear standing water at up to 85 liters per second. Both generate heat differently than slicks, and the crossover moments between them decide wet races.",
        ],
      },
    ],
    quiz: [
      {
        question: "What are the three dry compound colors at each race?",
        options: [
          "Red (soft), yellow (medium), white (hard)",
          "Green, blue, red",
          "Black, silver, gold",
          "Purple, green, white",
        ],
        answerIndex: 0,
        explanation: "Soft/red, medium/yellow, hard/white — chosen from Pirelli's larger compound family per circuit.",
      },
      {
        question: "What happens to a slick tire below its temperature window?",
        options: [
          "It works normally",
          "It stiffens, slides and grains",
          "It explodes",
          "It gains grip",
        ],
        answerIndex: 1,
        explanation: "Cold rubber doesn't key into the asphalt; the sliding tears the surface into grip-robbing graining.",
      },
      {
        question: "What is 'the cliff'?",
        options: [
          "A corner at Suzuka",
          "The sudden collapse of a worn tire's performance",
          "The pit wall barrier",
          "Maximum tire pressure",
        ],
        answerIndex: 1,
        explanation: "Degradation accelerates non-linearly — past the threshold, lap times fall away instantly and a stop becomes urgent.",
      },
      {
        question: "Why do driving styles matter for tires?",
        options: [
          "They don't — tires are identical",
          "Smoother inputs generate less sliding heat, extending stint length and strategy options",
          "Aggressive drivers get harder tires",
          "The FIA assigns compounds by style",
        ],
        answerIndex: 1,
        explanation: "Gentle tire managers can run longer stints or faster late pace — a genuine competitive weapon.",
      },
    ],
    flashcards: [
      { front: "Compound", back: "The rubber recipe: soft (fast, fragile) → hard (slow, durable)." },
      { front: "Temperature window", back: "Slicks grip best around 90–110°C; outside it they slide or blister." },
      { front: "Graining", back: "Cold-tire surface tearing that temporarily ruins grip until it cleans up." },
      { front: "Blistering", back: "Overheating damage from within — permanent, unlike graining." },
      { front: "The cliff", back: "The sudden, non-linear collapse of worn-tire performance." },
    ],
    takeaways: [
      "Tires are the biggest single performance variable in the sport.",
      "The temperature window rules everything: too cold grains, too hot blisters.",
      "Degradation is non-linear — anticipate the cliff, don't react to it.",
    ],
    misconceptions: [
      {
        myth: "Harder tires are always the smarter race choice.",
        reality: "Hards only win when degradation is high. On low-deg circuits, softer compounds are faster from start to finish.",
      },
    ],
    facts: [
      "Tire warmers pre-heat slicks to ~70°C before every run.",
      "F1 tires are filled with nitrogen for more stable pressures than air.",
    ],
    next: ["race-strategy", "pit-stops"],
  },
  {
    slug: "engineering",
    title: "Engineering & The Factory",
    category: "machinery",
    difficulty: 3,
    minutes: 7,
    summary: "The thousand-person operation behind two cars: design loops, simulators, telemetry and the development race.",
    sections: [
      {
        heading: "The factory behind the garage",
        body: [
          "A top F1 team employs around a thousand people; perhaps sixty travel to races. The rest design, simulate, manufacture and test. The car you see on Sunday is the output of a factory running continuous development loops: aerodynamicists propose, CFD screens, the wind tunnel verifies, machinists produce, and the race team validates on track.",
          "The budget cap (~$135M for most performance spending) transformed this from a spending contest into an efficiency contest — the best-run factory wins, not the richest.",
        ],
      },
      {
        heading: "Simulators and virtual racing",
        body: [
          "Drivers 'race' every circuit before arriving, in simulators accurate enough that setup work transfers to reality. During race weekends, reserve drivers run overnight sim sessions at the factory, testing setup changes the track team can apply next morning — a 24-hour engineering relay across time zones.",
          "Correlation — making the simulator, wind tunnel, CFD and track agree — is the quiet superpower of championship teams. When tools disagree with reality, development is guesswork.",
        ],
      },
      {
        heading: "Telemetry: the car that talks",
        body: [
          "Hundreds of sensors stream live data — tire temperatures, brake temperatures, suspension loads, driver inputs — to the pit wall and back to mission control at the factory, where dozens more engineers watch every lap. When an engineer says 'we see something on the data', they mean it literally: a failing gearbox announces itself in vibration signatures before the driver feels anything.",
          "Race engineers translate this torrent into the radio messages you hear: target lap times, tire offsets, threat warnings — the interface between a thousand people and one driver at 300 km/h.",
        ],
      },
      {
        heading: "The development race",
        body: [
          "The championship is really two races: the visible one on Sundays and the invisible one between factories, measured in updates per month. A team that starts the year half a second down but develops faster can win the title; a dominant car left undeveloped will be caught by August.",
          "Regulations throttle development deliberately: wind-tunnel hours scale inversely with championship position, giving strugglers more testing — F1's version of a draft pick system.",
        ],
      },
    ],
    quiz: [
      {
        question: "Roughly how many people work at a top F1 team?",
        options: ["About 60", "About 200", "About 1,000", "About 10,000"],
        answerIndex: 2,
        explanation: "Around a thousand — with only ~60 at the track. The factory is the real machine.",
      },
      {
        question: "What did the budget cap change?",
        options: [
          "Nothing measurable",
          "It turned a spending contest into an efficiency contest",
          "It banned wind tunnels",
          "It capped driver salaries only",
        ],
        answerIndex: 1,
        explanation: "With spending capped (~$135M), the best-organized development operation wins rather than the wealthiest.",
      },
      {
        question: "What is 'correlation' in F1 engineering?",
        options: [
          "The link between teammates' lap times",
          "Agreement between simulation tools (CFD, tunnel, sim) and real-track behavior",
          "Statistical race predictions",
          "Sponsorship performance metrics",
        ],
        answerIndex: 1,
        explanation: "If the tools don't match reality, every development decision is a guess — correlation is the foundation of progress.",
      },
      {
        question: "How does the sport handicap successful teams' development?",
        options: [
          "Weight penalties on the car",
          "Less wind-tunnel and CFD time for teams higher in the standings",
          "Banned upgrades after June",
          "Mandatory driver swaps",
        ],
        answerIndex: 1,
        explanation: "Aerodynamic testing allocations scale inversely with championship position — leaders get the least.",
      },
    ],
    flashcards: [
      { front: "Mission control", back: "The factory room where dozens of engineers monitor live race telemetry remotely." },
      { front: "Correlation", back: "Agreement between CFD, wind tunnel, simulator and the real track — the basis of effective development." },
      { front: "Budget cap", back: "~$135M annual limit on most performance spending, since 2021." },
      { front: "Race engineer", back: "The driver's single point of contact — translates the team's data into radio guidance." },
    ],
    takeaways: [
      "F1 is a factory sport: ~1,000 people stand behind every two-car garage.",
      "The budget cap rewards efficiency and organization over raw spending.",
      "Telemetry and simulators make development a 24/7, globe-spanning loop.",
      "In-season development pace decides championships as much as launch pace.",
    ],
    misconceptions: [
      {
        myth: "The car is finished when the season starts.",
        reality: "Launch spec is maybe 90% of final-race spec. Teams bring updates nearly every race; standing still means going backward.",
      },
    ],
    facts: [
      "During races, factory mission-control rooms legally advise the pit wall in real time.",
      "A modern F1 car carries 300+ sensors generating over a terabyte of data across a race weekend.",
    ],
    next: ["technical-regulations", "aerodynamics"],
  },
];
