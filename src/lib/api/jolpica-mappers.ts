import type {
  CircuitRef,
  ConstructorRef,
  ConstructorStanding,
  DriverRef,
  DriverStanding,
  QualifyingRow,
  Race,
  RaceResultRow,
  SessionSchedule,
} from "@/lib/models/f1";
import type {
  RawCircuit,
  RawConstructor,
  RawConstructorStanding,
  RawDriver,
  RawDriverStanding,
  RawQualifyingResult,
  RawRace,
  RawResult,
  RawSession,
} from "@/lib/api/jolpica-types";

function toInt(value: string | undefined, fallback = 0): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function toFloat(value: string | undefined, fallback = 0): number {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function mapDriver(raw: RawDriver): DriverRef {
  return {
    driverId: raw.driverId,
    code: raw.code ?? null,
    permanentNumber: raw.permanentNumber ? toInt(raw.permanentNumber) : null,
    givenName: raw.givenName,
    familyName: raw.familyName,
    fullName: `${raw.givenName} ${raw.familyName}`,
    nationality: raw.nationality ?? "",
    dateOfBirth: raw.dateOfBirth ?? null,
    url: raw.url ?? null,
  };
}

export function mapConstructor(raw: RawConstructor): ConstructorRef {
  return {
    constructorId: raw.constructorId,
    name: raw.name,
    nationality: raw.nationality ?? "",
  };
}

export function mapCircuit(raw: RawCircuit): CircuitRef {
  return {
    circuitId: raw.circuitId,
    name: raw.circuitName,
    locality: raw.Location?.locality ?? "",
    country: raw.Location?.country ?? "",
    lat: toFloat(raw.Location?.lat),
    lng: toFloat(raw.Location?.long),
    url: raw.url ?? null,
  };
}

function sessionIso(session: RawSession | undefined): string | null {
  if (!session?.date) return null;
  return session.time ? `${session.date}T${session.time}` : `${session.date}T00:00:00Z`;
}

export function mapRace(raw: RawRace): Race {
  const sessions: SessionSchedule[] = [];
  const push = (name: string, session: RawSession | undefined) => {
    const iso = sessionIso(session);
    if (iso) sessions.push({ name, dateTimeUtc: iso });
  };

  push("Practice 1", raw.FirstPractice);
  push("Practice 2", raw.SecondPractice);
  push("Practice 3", raw.ThirdPractice);
  push("Sprint Qualifying", raw.SprintQualifying ?? raw.SprintShootout);
  push("Sprint", raw.Sprint);
  push("Qualifying", raw.Qualifying);

  const raceIso = raw.time
    ? `${raw.date}T${raw.time}`
    : raw.date
      ? `${raw.date}T00:00:00Z`
      : null;
  if (raceIso) sessions.push({ name: "Race", dateTimeUtc: raceIso });

  return {
    season: toInt(raw.season),
    round: toInt(raw.round),
    raceName: raw.raceName,
    circuit: mapCircuit(raw.Circuit),
    dateTimeUtc: raceIso,
    date: raw.date,
    sprint: Boolean(raw.Sprint || raw.SprintQualifying || raw.SprintShootout),
    sessions,
    url: raw.url ?? null,
  };
}

export function mapResult(raw: RawResult): RaceResultRow {
  return {
    position: toInt(raw.position),
    positionText: raw.positionText,
    driver: mapDriver(raw.Driver),
    constructor: mapConstructor(raw.Constructor),
    grid: toInt(raw.grid),
    laps: toInt(raw.laps),
    status: raw.status ?? "",
    points: toFloat(raw.points),
    timeText: raw.Time?.time ?? null,
    fastestLap: raw.FastestLap?.Time?.time
      ? {
          rank: toInt(raw.FastestLap.rank, 0),
          lap: toInt(raw.FastestLap.lap, 0),
          time: raw.FastestLap.Time.time,
        }
      : null,
  };
}

export function mapQualifying(raw: RawQualifyingResult): QualifyingRow {
  return {
    position: toInt(raw.position),
    driver: mapDriver(raw.Driver),
    constructor: mapConstructor(raw.Constructor),
    q1: raw.Q1 ?? null,
    q2: raw.Q2 ?? null,
    q3: raw.Q3 ?? null,
  };
}

export function mapDriverStanding(raw: RawDriverStanding): DriverStanding {
  return {
    position: toInt(raw.position ?? raw.positionText),
    points: toFloat(raw.points),
    wins: toInt(raw.wins),
    driver: mapDriver(raw.Driver),
    constructors: raw.Constructors.map(mapConstructor),
  };
}

export function mapConstructorStanding(
  raw: RawConstructorStanding,
): ConstructorStanding {
  return {
    position: toInt(raw.position ?? raw.positionText),
    points: toFloat(raw.points),
    wins: toInt(raw.wins),
    constructor: mapConstructor(raw.Constructor),
  };
}
