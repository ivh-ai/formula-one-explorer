/**
 * Domain models for historical/current F1 data. These are the only shapes
 * pages and components consume — raw API responses never leave src/lib/api.
 */

export type DriverRef = {
  driverId: string;
  code: string | null;
  permanentNumber: number | null;
  givenName: string;
  familyName: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string | null;
  url: string | null;
};

export type ConstructorRef = {
  constructorId: string;
  name: string;
  nationality: string;
};

export type CircuitRef = {
  circuitId: string;
  name: string;
  locality: string;
  country: string;
  lat: number;
  lng: number;
  url: string | null;
};

export type SessionSchedule = {
  name: string;
  dateTimeUtc: string | null;
};

export type Race = {
  season: number;
  round: number;
  raceName: string;
  circuit: CircuitRef;
  /** Race start; null for early seasons without recorded times. */
  dateTimeUtc: string | null;
  date: string;
  sprint: boolean;
  sessions: SessionSchedule[];
  url: string | null;
};

export type FastestLap = {
  rank: number;
  lap: number;
  time: string;
};

export type RaceResultRow = {
  position: number;
  positionText: string;
  driver: DriverRef;
  constructor: ConstructorRef;
  grid: number;
  laps: number;
  status: string;
  points: number;
  /** Finishing time or gap text, e.g. "1:40:52.554" / "+13.773"; null for DNF. */
  timeText: string | null;
  fastestLap: FastestLap | null;
};

export type QualifyingRow = {
  position: number;
  driver: DriverRef;
  constructor: ConstructorRef;
  q1: string | null;
  q2: string | null;
  q3: string | null;
};

export type DriverStanding = {
  position: number;
  points: number;
  wins: number;
  driver: DriverRef;
  constructors: ConstructorRef[];
};

export type ConstructorStanding = {
  position: number;
  points: number;
  wins: number;
  constructor: ConstructorRef;
};

export type SeasonSummary = {
  year: number;
  url: string | null;
};
