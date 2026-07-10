/** Raw Jolpica (Ergast-compatible) response shapes. Internal to src/lib/api. */

export type RawDriver = {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url?: string;
  givenName: string;
  familyName: string;
  dateOfBirth?: string;
  nationality?: string;
};

export type RawConstructor = {
  constructorId: string;
  url?: string;
  name: string;
  nationality?: string;
};

export type RawCircuit = {
  circuitId: string;
  url?: string;
  circuitName: string;
  Location?: {
    lat?: string;
    long?: string;
    locality?: string;
    country?: string;
  };
};

export type RawSession = { date?: string; time?: string };

export type RawRace = {
  season: string;
  round: string;
  url?: string;
  raceName: string;
  Circuit: RawCircuit;
  date: string;
  time?: string;
  FirstPractice?: RawSession;
  SecondPractice?: RawSession;
  ThirdPractice?: RawSession;
  Qualifying?: RawSession;
  Sprint?: RawSession;
  SprintQualifying?: RawSession;
  SprintShootout?: RawSession;
  Results?: RawResult[];
  QualifyingResults?: RawQualifyingResult[];
  SprintResults?: RawResult[];
};

export type RawResult = {
  number?: string;
  position: string;
  positionText: string;
  points: string;
  Driver: RawDriver;
  Constructor: RawConstructor;
  grid?: string;
  laps?: string;
  status?: string;
  Time?: { millis?: string; time?: string };
  FastestLap?: {
    rank?: string;
    lap?: string;
    Time?: { time?: string };
  };
};

export type RawQualifyingResult = {
  number?: string;
  position: string;
  Driver: RawDriver;
  Constructor: RawConstructor;
  Q1?: string;
  Q2?: string;
  Q3?: string;
};

export type RawDriverStanding = {
  position?: string;
  positionText?: string;
  points: string;
  wins?: string;
  Driver: RawDriver;
  Constructors: RawConstructor[];
};

export type RawConstructorStanding = {
  position?: string;
  positionText?: string;
  points: string;
  wins?: string;
  Constructor: RawConstructor;
};

export type MRData<T> = {
  MRData: {
    total: string;
    limit: string;
    offset: string;
  } & T;
};

export type RaceTableResponse = MRData<{ RaceTable: { Races: RawRace[] } }>;
export type SeasonTableResponse = MRData<{
  SeasonTable: { Seasons: { season: string; url?: string }[] };
}>;
export type DriverTableResponse = MRData<{ DriverTable: { Drivers: RawDriver[] } }>;
export type ConstructorTableResponse = MRData<{
  ConstructorTable: { Constructors: RawConstructor[] };
}>;
export type CircuitTableResponse = MRData<{ CircuitTable: { Circuits: RawCircuit[] } }>;
export type StandingsResponse = MRData<{
  StandingsTable: {
    StandingsLists: {
      season: string;
      round: string;
      DriverStandings?: RawDriverStanding[];
      ConstructorStandings?: RawConstructorStanding[];
    }[];
  };
}>;
