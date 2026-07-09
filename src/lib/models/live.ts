/** Domain models for OpenF1 live/recent session data. */

export type LiveSession = {
  sessionKey: number;
  meetingKey: number;
  name: string;
  type: string;
  circuitShortName: string;
  countryName: string;
  dateStartUtc: string;
  dateEndUtc: string;
  year: number;
};

export type LiveDriver = {
  driverNumber: number;
  acronym: string;
  fullName: string;
  teamName: string;
  /** Hex color without '#', as provided by OpenF1; may be empty. */
  teamColor: string;
};

export type PositionEntry = {
  driverNumber: number;
  position: number;
  dateUtc: string;
};

export type IntervalEntry = {
  driverNumber: number;
  /** Seconds behind leader, or a text like "+1 LAP", or null early in a session. */
  gapToLeader: number | string | null;
  interval: number | string | null;
  dateUtc: string;
};

export type LapEntry = {
  driverNumber: number;
  lapNumber: number;
  lapDuration: number | null;
  sector1: number | null;
  sector2: number | null;
  sector3: number | null;
  isPitOutLap: boolean;
};

export type PitEntry = {
  driverNumber: number;
  lapNumber: number;
  pitDuration: number | null;
};

export type StintEntry = {
  driverNumber: number;
  stintNumber: number;
  compound: string;
  lapStart: number;
  lapEnd: number;
  tyreAgeAtStart: number;
};

export type RaceControlMessage = {
  dateUtc: string;
  category: string;
  flag: string | null;
  message: string;
  scope: string | null;
};

export type SessionWeather = {
  airTemp: number;
  trackTemp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  dateUtc: string;
};

export type TeamRadioEntry = {
  driverNumber: number;
  dateUtc: string;
  recordingUrl: string;
};

export type SessionStatus = "live" | "recent" | "none";
