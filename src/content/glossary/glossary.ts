/** The F1 Explorer glossary — every term a fan needs, ~100+ entries. */

export type GlossaryCategory =
  | "racing"
  | "technical"
  | "strategy"
  | "rules"
  | "culture";

export type GlossaryEntry = {
  term: string;
  slug: string;
  definition: string;
  category: GlossaryCategory;
  related: string[];
};

function entry(
  term: string,
  category: GlossaryCategory,
  definition: string,
  related: string[] = [],
): GlossaryEntry {
  return {
    term,
    slug: term
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, ""),
    definition,
    category,
    related,
  };
}

export const GLOSSARY: GlossaryEntry[] = [
  // Racing
  entry("Apex", "racing", "The innermost point of a corner's racing line. Hitting the apex lets a driver straighten the corner and carry maximum speed.", ["racing-line"]),
  entry("Racing line", "racing", "The fastest path through a corner or lap — typically wide entry, apex, wide exit. Off-line asphalt is often dusty and slippery.", ["apex", "marbles"]),
  entry("Slipstream", "racing", "The pocket of low-pressure air behind a car. Following closely on a straight reduces drag and boosts top speed — also called a tow.", ["dirty-air", "drs"]),
  entry("Dirty air", "racing", "Turbulent air shed by a leading car that robs the following car of downforce in corners, making close pursuit difficult.", ["slipstream", "downforce"]),
  entry("Lock-up", "racing", "When braking force exceeds tire grip and a wheel stops rotating, producing smoke and a flat spot on the tire.", ["flat-spot", "braking-zone"]),
  entry("Flat spot", "racing", "A worn patch on a tire caused by a lock-up. Causes vibration that can force an unplanned pit stop.", ["lock-up"]),
  entry("Oversteer", "racing", "When the rear of the car slides wide in a corner. Small amounts rotate the car; large amounts become a spin.", ["understeer"]),
  entry("Understeer", "racing", "When the front tires lose grip and the car runs wide of the intended line despite steering input.", ["oversteer"]),
  entry("Braking zone", "racing", "The stretch before a corner where cars decelerate — from 340 km/h to 90 km/h in under 150 meters. Prime overtaking territory.", ["lock-up", "late-braking"]),
  entry("Late braking", "racing", "Delaying braking to out-brake a rival into a corner. The classic overtaking move — and the classic way to lock up.", ["braking-zone", "divebomb"]),
  entry("Divebomb", "racing", "An aggressive, very late lunge down the inside of a corner. Heroic when it sticks, a penalty when it doesn't.", ["late-braking"]),
  entry("Switchback", "racing", "Letting a defender take a tight inside line, then crossing behind to get a better exit and pass on the following straight. Also called the cutback.", ["racing-line"]),
  entry("Marbles", "racing", "Discarded bits of rubber that accumulate off the racing line. Driving on them is described as driving on ice.", ["racing-line"]),
  entry("Purple sector", "racing", "The fastest time set by anyone in a track sector, shown in purple on timing screens. Green means a personal best.", ["sector"]),
  entry("Sector", "racing", "Each lap is split into three timed sectors for analysis and flag signaling.", ["purple-sector", "mini-sector"]),
  entry("Mini-sector", "racing", "Finer subdivisions of the three sectors used by teams and broadcasters to compare car performance corner by corner.", ["sector"]),
  entry("Out-lap", "racing", "The lap immediately after leaving the pits, used to bring tires up to temperature before a push lap.", ["in-lap", "tire-warm-up"]),
  entry("In-lap", "racing", "The lap driven back to the pits before a stop. Fast in-laps are critical to making an undercut work.", ["out-lap", "undercut"]),
  entry("Push lap", "racing", "A lap driven at maximum effort, typically in qualifying or during a critical strategy phase.", ["out-lap"]),
  entry("Formation lap", "racing", "The slow lap before the start, used to warm tires and brakes before cars line up on the grid.", ["grid"]),
  entry("Grid", "racing", "The starting order and the physical starting positions, set by qualifying results plus any penalties.", ["pole-position", "grid-penalty"]),
  entry("Pole position", "racing", "First place on the starting grid, earned by the fastest qualifying lap.", ["qualifying", "grid"]),
  entry("Fastest lap", "racing", "The quickest race lap. Its bonus championship point was discontinued after 2024.", []),
  entry("Grand Chelem", "racing", "A perfect weekend: pole, race win, fastest lap, and leading every lap. Also called a Grand Slam.", ["pole-position", "fastest-lap"]),
  entry("DNF", "racing", "Did Not Finish — a retirement from the race due to damage, failure or accident.", ["dns"]),
  entry("DNS", "racing", "Did Not Start — a car that qualified but couldn't take the start.", ["dnf"]),
  entry("Backmarker", "racing", "A car near the back of the field, usually about to be lapped. Blue flags require backmarkers to let leaders through.", ["blue-flag"]),

  // Technical
  entry("Downforce", "technical", "Aerodynamic force pressing the car onto the track, generated by wings and the floor. More downforce = faster cornering, at the cost of straight-line speed.", ["ground-effect", "drag"]),
  entry("Drag", "technical", "Air resistance that slows the car on straights. Teams balance drag against downforce for each circuit.", ["downforce", "drs"]),
  entry("Ground effect", "technical", "Downforce generated by accelerating air beneath the car's shaped floor — the dominant aerodynamic principle of 2022–2025 cars.", ["downforce", "porpoising", "floor"]),
  entry("Floor", "technical", "The car's underbody, its single biggest downforce generator in the ground-effect era. Damage costs whole seconds per lap.", ["ground-effect", "plank"]),
  entry("Plank", "technical", "A wooden skid block under the car that enforces minimum ride height. Excessive wear means disqualification.", ["floor", "ride-height"]),
  entry("Ride height", "technical", "The gap between the car's floor and the track. Lower is faster — until the plank wears or the car bottoms out.", ["plank", "porpoising"]),
  entry("Porpoising", "technical", "Violent vertical bouncing at speed when ground-effect airflow stalls and reattaches cyclically. The defining problem of 2022.", ["ground-effect"]),
  entry("DRS", "technical", "Drag Reduction System — a rear wing flap that opens to cut drag when a car runs within one second of another in designated zones, aiding overtaking. Superseded by active-aero override modes in 2026.", ["drag", "slipstream", "active-aerodynamics"]),
  entry("Active aerodynamics", "technical", "Movable front and rear wings introduced in 2026: low-drag straight-line mode ('X-mode') and high-downforce corner mode ('Z-mode').", ["drs", "downforce"]),
  entry("Power unit", "technical", "The complete hybrid propulsion package: 1.6-liter turbocharged V6 plus electrical systems and battery. From 2026, roughly half the power is electric.", ["mgu-k", "ers"]),
  entry("ERS", "technical", "Energy Recovery System — harvests energy under braking, stores it in the battery and redeploys it as electric boost.", ["mgu-k", "power-unit"]),
  entry("MGU-K", "technical", "Motor Generator Unit–Kinetic: converts braking energy to electricity and delivers electric power to the rear axle (~350 kW under 2026 rules).", ["ers", "power-unit"]),
  entry("MGU-H", "technical", "Motor Generator Unit–Heat: recovered energy from the turbocharger from 2014–2025. Dropped for the 2026 regulations.", ["power-unit"]),
  entry("Sustainable fuel", "technical", "The 100% 'drop-in' sustainable fuel mandated from 2026, made without new fossil carbon.", ["power-unit"]),
  entry("Halo", "technical", "The titanium hoop above the cockpit, mandatory since 2018. Credited with saving multiple drivers' lives, including Grosjean in 2020.", ["survival-cell"]),
  entry("Survival cell", "technical", "The carbon-fiber monocoque protecting the driver — designed to stay intact through the biggest impacts.", ["halo"]),
  entry("Telemetry", "technical", "Live data streamed from hundreds of car sensors to the pit wall — speeds, temperatures, pressures, driver inputs.", ["pit-wall"]),
  entry("Setup", "technical", "The adjustable configuration of the car — wings, suspension, ride height, differential — tuned for each circuit and locked at qualifying (parc fermé).", ["parc-ferme", "ride-height"]),
  entry("Camber", "technical", "The tilt of the tires from vertical. Negative camber leans tire tops inward for better cornering grip.", ["setup"]),
  entry("Slick tire", "technical", "A treadless dry-weather tire maximizing rubber contact with the track. No grooves means no grip in rain.", ["compound", "intermediates"]),
  entry("Compound", "technical", "The rubber recipe of a tire. Pirelli brings three dry compounds per weekend, labeled soft (red), medium (yellow) and hard (white).", ["slick-tire", "degradation"]),
  entry("Intermediates", "technical", "Green-striped treaded tires for a damp or drying track — between slicks and full wets.", ["full-wets", "crossover-point"]),
  entry("Full wets", "technical", "Blue-striped heavy-rain tires that can displace ~85 liters of water per second at speed.", ["intermediates"]),
  entry("Degradation", "technical", "The loss of tire performance over a stint as rubber wears and overheats. 'Deg' drives most strategy calls.", ["compound", "graining", "blistering"]),
  entry("Graining", "technical", "When the tire surface tears and rolls into ridges, reducing grip until it 'cleans up'. Common on cold, new track surfaces.", ["degradation"]),
  entry("Blistering", "technical", "Bubbles and chunks forming when a tire overheats from the inside — permanent damage, unlike graining.", ["degradation"]),
  entry("Tire warm-up", "technical", "Getting tires into their working temperature window (roughly 90–110°C for slicks). Cold tires can halve available grip.", ["out-lap"]),
  entry("Brake-by-wire", "technical", "Electronically controlled rear braking that blends friction braking with ERS energy harvesting.", ["ers"]),
  entry("Dirty side", "technical", "The side of the grid off the racing line, with less rubbered-in grip for the start.", ["grid"]),
  entry("Kerb", "technical", "The raised painted edging at corners. Riding kerbs can straighten a corner — or launch a car.", ["track-limits"]),

  // Strategy
  entry("Undercut", "strategy", "Pitting before a rival to gain time on fresh tires while they stay out on worn ones. The move that wins most strategic battles.", ["overcut", "pit-window"]),
  entry("Overcut", "strategy", "Staying out longer than a rival and using clear air to build a gap before your own stop. Works when fresh tires warm up slowly or traffic is bad.", ["undercut"]),
  entry("Pit window", "strategy", "The span of laps in which a pit stop makes strategic sense, dictated by tire life and gaps to rivals.", ["undercut", "stint"]),
  entry("Stint", "strategy", "The laps driven on one set of tires between stops.", ["pit-window", "degradation"]),
  entry("One-stop", "strategy", "A race strategy with a single pit stop — usually the fastest route when degradation is low.", ["two-stop", "stint"]),
  entry("Two-stop", "strategy", "A strategy with two pit stops, trading extra pit time for faster, fresher-tire stints.", ["one-stop"]),
  entry("Tire delta", "strategy", "The lap-time difference between tire compounds or between fresh and worn tires.", ["degradation", "compound"]),
  entry("Pit loss", "strategy", "Total time lost by pitting versus staying out — typically 18–25 seconds depending on the circuit's pit lane.", ["pit-window"]),
  entry("Free stop", "strategy", "A pit stop under safety car when the field is slowed, costing far less time than under green-flag racing.", ["safety-car", "pit-loss"]),
  entry("Target lap time", "strategy", "The pace engineers ask a driver to hold to make a tire last to a planned stop lap.", ["stint", "degradation"]),
  entry("Fuel saving", "strategy", "Lifting and coasting to conserve fuel; cars start with a maximum of 110 kg and no refueling is allowed.", ["lift-and-coast"]),
  entry("Lift and coast", "strategy", "Lifting off the throttle before braking zones to save fuel and cool brakes and tires, at a small lap-time cost.", ["fuel-saving"]),
  entry("Crossover point", "strategy", "The moment when a different tire (e.g., slicks on a drying track) becomes faster than the current one.", ["intermediates"]),
  entry("Track position", "strategy", "Being physically ahead on track. On circuits where passing is hard, track position beats raw pace.", ["undercut", "dirty-air"]),
  entry("Pit wall", "strategy", "The trackside command post where strategists, engineers and the team principal manage the race.", ["telemetry"]),
  entry("Double stack", "strategy", "Pitting both of a team's cars on consecutive seconds in one stop — high risk, high reward under safety cars.", ["free-stop"]),
  entry("Delta time", "strategy", "A required minimum lap time under safety car or VSC conditions, ensuring cars slow down uniformly.", ["virtual-safety-car"]),

  // Rules
  entry("Parc fermé", "rules", "The 'closed park' rules freezing car setup from qualifying until the race. Significant changes mean a pit-lane start.", ["setup"]),
  entry("Qualifying", "rules", "The Saturday knockout session (Q1, Q2, Q3) that sets the starting grid.", ["pole-position", "107-percent-rule"]),
  entry("Sprint", "rules", "A ~100 km Saturday race at selected events with points for the top eight (8-7-6-5-4-3-2-1) and its own qualifying session.", ["sprint-qualifying"]),
  entry("Sprint Qualifying", "rules", "The shorter SQ1/SQ2/SQ3 knockout session that sets the sprint race grid at sprint weekends.", ["sprint"]),
  entry("107% rule", "rules", "Drivers must qualify within 107% of the fastest Q1 time to be allowed to race (stewards can grant exceptions).", ["qualifying"]),
  entry("Safety Car", "rules", "A high-performance car that bunches the field at reduced speed during hazards. Overtaking is forbidden behind it.", ["virtual-safety-car", "red-flag"]),
  entry("Virtual Safety Car", "rules", "A VSC slows every car to a delta time without deploying the physical safety car — gaps are roughly preserved.", ["safety-car", "delta-time"]),
  entry("Red flag", "rules", "Session stopped. Cars return to the pits; in races, teams may change tires and repair damage during the stoppage.", ["safety-car"]),
  entry("Yellow flag", "rules", "Danger ahead: slow down, no overtaking. Double yellows mean be prepared to stop.", ["green-flag"]),
  entry("Green flag", "rules", "Track clear — racing conditions resume after a hazard zone.", ["yellow-flag"]),
  entry("Blue flag", "rules", "Shown to backmarkers: a leader is approaching to lap you — let them through within three flags or face a penalty.", ["backmarker"]),
  entry("Black flag", "rules", "Disqualification — the driver must return to the pits immediately. Extremely rare.", []),
  entry("Track limits", "rules", "The white lines defining the track. All four wheels beyond them invalidates lap times and can bring penalties.", ["kerb"]),
  entry("Grid penalty", "rules", "Starting positions lost for infractions or for exceeding power-unit component allocations.", ["grid"]),
  entry("Time penalty", "rules", "Five or ten seconds added to a driver's race, served at a pit stop or added post-race.", ["drive-through"]),
  entry("Drive-through", "rules", "A penalty requiring the driver to pass through the pit lane at the speed limit without stopping.", ["time-penalty"]),
  entry("Stewards", "rules", "The race-weekend judges (including an ex-driver) who investigate incidents and issue penalties.", ["race-control"]),
  entry("Race control", "rules", "The FIA operations room that runs the session: flags, safety cars, investigations and track status.", ["stewards", "race-director"]),
  entry("Race director", "rules", "The FIA official responsible for running the event and enforcing sporting regulations.", ["race-control"]),
  entry("Budget cap", "rules", "The annual spending limit (~$135M, adjusted) covering most performance-related team costs, introduced in 2021.", ["cost-cap-breach"]),
  entry("Cost cap breach", "rules", "Exceeding the budget cap — punishable by fines, testing restrictions, or points deductions.", ["budget-cap"]),
  entry("Superlicence", "rules", "The FIA qualification required to race in F1, earned through junior-series points and 300+ km of F1 testing.", []),
  entry("Formation start", "rules", "The standard standing start: formation lap, five red lights, lights out and away we go.", ["formation-lap"]),
  entry("Unsafe release", "rules", "Releasing a car from a pit box into the path of another — penalized with fines or time penalties.", ["pit-lane"]),
  entry("Pit lane", "rules", "The service road with a strict speed limit (usually 80 km/h). Speeding brings automatic penalties.", ["pit-loss"]),
  entry("Impeding", "rules", "Blocking a rival's flying lap in qualifying — typically a three-place grid penalty.", ["qualifying"]),
  entry("Parc fermé start", "rules", "Cars that break parc fermé must start from the pit lane instead of the grid.", ["parc-ferme"]),
  entry("Championship points", "rules", "Race points pay 25-18-15-12-10-8-6-4-2-1 for the top ten; sprints pay 8 down to 1.", ["sprint"]),

  // Culture
  entry("Paddock", "culture", "The restricted area behind the garages where teams, media and guests operate over a race weekend.", ["hospitality"]),
  entry("Hospitality", "culture", "Team motorhomes and suites in the paddock — part restaurant, part office, part diplomatic embassy.", ["paddock"]),
  entry("Grid walk", "culture", "The pre-race broadcast tradition of roaming the grid interviewing anyone famous enough to stop.", ["grid"]),
  entry("Tifosi", "culture", "Ferrari's famously devoted fans, most visible as a red sea at Monza.", []),
  entry("Orange army", "culture", "Max Verstappen's Dutch fans, who turn grandstands orange across Europe.", []),
  entry("Silly season", "culture", "The rumor-filled months when driver contracts, swaps and sackings dominate the news.", []),
  entry("Backmarker team", "culture", "A team regularly at the back of the grid — many of today's giants started as one.", ["backmarker"]),
  entry("Garagista", "culture", "Enzo Ferrari's dismissive term for the small British teams that went on to beat him with innovation.", []),
  entry("Pit babe era", "culture", "The pre-2018 practice of grid girls, discontinued as the sport modernized.", []),
  entry("Box, box", "culture", "The radio call ordering a driver to pit ('box' from the German 'Boxenstopp').", ["pit-window"]),
  entry("Plan A / Plan B", "culture", "Radio shorthand for pre-agreed strategy options, switched as the race evolves.", ["pit-window"]),
  entry("Hammer time", "culture", "Lewis Hamilton's engineer's call to push flat out — now generic slang for maximum attack.", ["push-lap"]),
  entry("Multi 21", "culture", "The infamous 2013 Red Bull team order Vettel ignored to beat Webber — shorthand for teammate betrayal.", []),
  entry("GOAT debate", "culture", "The eternal argument over the greatest of all time: Fangio's dominance, Senna's speed, Schumacher's titles, Hamilton's records.", []),
  entry("Wingman", "culture", "A driver instructed to support their teammate's championship rather than race them.", ["team-orders"]),
  entry("Team orders", "culture", "Instructions coordinating teammates' positions. Once banned, now legal and endlessly controversial.", ["wingman", "multi-21"]),
  entry("Home race", "culture", "A driver's national Grand Prix, where pressure and support both peak.", []),
  entry("Flyaway race", "culture", "Rounds outside Europe requiring air freight — the calendar's logistical marathons.", []),
  entry("Testing", "culture", "The heavily restricted pre-season running (three days) where new cars first show their hands — or hide them.", ["sandbagging"]),
  entry("Sandbagging", "culture", "Deliberately hiding true pace in testing or practice to mislead rivals.", ["testing"]),
  entry("DNF-fest", "culture", "Fan slang for a chaotic race with many retirements.", ["dnf"]),
  entry("Netflix effect", "culture", "The surge of new (especially US) fans brought by the Drive to Survive documentary series.", []),
];

const BY_SLUG = new Map(GLOSSARY.map((glossaryEntry) => [glossaryEntry.slug, glossaryEntry]));
const BY_TERM = new Map(
  GLOSSARY.map((glossaryEntry) => [glossaryEntry.term.toLowerCase(), glossaryEntry]),
);

export function getGlossaryEntry(termOrSlug: string): GlossaryEntry | undefined {
  return BY_TERM.get(termOrSlug.toLowerCase()) ?? BY_SLUG.get(termOrSlug.toLowerCase());
}
