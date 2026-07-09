/**
 * OpenF1 client — session-level timing for live and recent sessions.
 * Live endpoints are fetched with revalidate 0 and polled client-side.
 */
import { fetchJson, type ApiResult } from "@/lib/api/fetch-json";
import type {
  IntervalEntry,
  LapEntry,
  LiveDriver,
  LiveSession,
  PitEntry,
  PositionEntry,
  RaceControlMessage,
  SessionStatus,
  SessionWeather,
  StintEntry,
  TeamRadioEntry,
} from "@/lib/models/live";

const BASE = "https://api.openf1.org/v1";

/* ------------------------------- raw shapes ------------------------------ */

type RawSession = {
  session_key: number;
  meeting_key: number;
  session_name: string;
  session_type: string;
  circuit_short_name: string;
  country_name: string;
  date_start: string;
  date_end: string;
  year: number;
};

type RawDriver = {
  driver_number: number;
  name_acronym?: string;
  full_name?: string;
  team_name?: string;
  team_colour?: string;
};

type RawPosition = { driver_number: number; position: number; date: string };
type RawInterval = {
  driver_number: number;
  gap_to_leader: number | string | null;
  interval: number | string | null;
  date: string;
};
type RawLap = {
  driver_number: number;
  lap_number: number;
  lap_duration: number | null;
  duration_sector_1: number | null;
  duration_sector_2: number | null;
  duration_sector_3: number | null;
  is_pit_out_lap?: boolean;
};
type RawPit = { driver_number: number; lap_number: number; pit_duration: number | null };
type RawStint = {
  driver_number: number;
  stint_number: number;
  compound: string | null;
  lap_start: number;
  lap_end: number | null;
  tyre_age_at_start: number | null;
};
type RawRaceControl = {
  date: string;
  category: string;
  flag: string | null;
  message: string;
  scope: string | null;
};
type RawWeather = {
  air_temperature: number;
  track_temperature: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  date: string;
};
type RawTeamRadio = { driver_number: number; date: string; recording_url: string };

/* -------------------------------- mappers -------------------------------- */

export function mapSession(raw: RawSession): LiveSession {
  return {
    sessionKey: raw.session_key,
    meetingKey: raw.meeting_key,
    name: raw.session_name,
    type: raw.session_type,
    circuitShortName: raw.circuit_short_name,
    countryName: raw.country_name,
    dateStartUtc: raw.date_start,
    dateEndUtc: raw.date_end,
    year: raw.year,
  };
}

export function mapLiveDriver(raw: RawDriver): LiveDriver {
  return {
    driverNumber: raw.driver_number,
    acronym: raw.name_acronym ?? String(raw.driver_number),
    fullName: raw.full_name ?? `#${raw.driver_number}`,
    teamName: raw.team_name ?? "",
    teamColor: raw.team_colour ?? "",
  };
}

export function mapStint(raw: RawStint): StintEntry {
  return {
    driverNumber: raw.driver_number,
    stintNumber: raw.stint_number,
    compound: raw.compound ?? "UNKNOWN",
    lapStart: raw.lap_start,
    lapEnd: raw.lap_end ?? raw.lap_start,
    tyreAgeAtStart: raw.tyre_age_at_start ?? 0,
  };
}

/* -------------------------------- status --------------------------------- */

const LIVE_LEAD_MS = 10 * 60 * 1000;
const LIVE_TAIL_MS = 30 * 60 * 1000;
const RECENT_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

export function deriveSessionStatus(
  session: LiveSession,
  nowUtc: Date,
): SessionStatus {
  const start = new Date(session.dateStartUtc).getTime();
  const end = new Date(session.dateEndUtc).getTime();
  const now = nowUtc.getTime();

  if (now >= start - LIVE_LEAD_MS && now <= end + LIVE_TAIL_MS) return "live";
  if (now > end && now - end <= RECENT_WINDOW_MS) return "recent";
  return "none";
}

/* -------------------------------- client --------------------------------- */

function live<T>(path: string): Promise<ApiResult<T>> {
  return fetchJson<T>(`${BASE}${path}`, { revalidate: 0, retries: 1, timeoutMs: 8000 });
}

export async function getLatestSession(): Promise<ApiResult<LiveSession | null>> {
  const result = await live<RawSession[]>("/sessions?session_key=latest");
  if (!result.ok) return result;
  const raw = result.data[0];
  return { ok: true, data: raw ? mapSession(raw) : null };
}

export async function getSessionsForYear(
  year: number,
): Promise<ApiResult<LiveSession[]>> {
  const result = await live<RawSession[]>(`/sessions?year=${year}`);
  if (!result.ok) return result;
  return { ok: true, data: result.data.map(mapSession) };
}

export async function getSessionDrivers(
  sessionKey: number,
): Promise<ApiResult<LiveDriver[]>> {
  const result = await live<RawDriver[]>(`/drivers?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return { ok: true, data: result.data.map(mapLiveDriver) };
}

export async function getPositions(
  sessionKey: number,
): Promise<ApiResult<PositionEntry[]>> {
  const result = await live<RawPosition[]>(`/position?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      driverNumber: raw.driver_number,
      position: raw.position,
      dateUtc: raw.date,
    })),
  };
}

export async function getIntervals(
  sessionKey: number,
): Promise<ApiResult<IntervalEntry[]>> {
  const result = await live<RawInterval[]>(`/intervals?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      driverNumber: raw.driver_number,
      gapToLeader: raw.gap_to_leader,
      interval: raw.interval,
      dateUtc: raw.date,
    })),
  };
}

export async function getLaps(sessionKey: number): Promise<ApiResult<LapEntry[]>> {
  const result = await live<RawLap[]>(`/laps?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      driverNumber: raw.driver_number,
      lapNumber: raw.lap_number,
      lapDuration: raw.lap_duration,
      sector1: raw.duration_sector_1,
      sector2: raw.duration_sector_2,
      sector3: raw.duration_sector_3,
      isPitOutLap: raw.is_pit_out_lap === true,
    })),
  };
}

export async function getPits(sessionKey: number): Promise<ApiResult<PitEntry[]>> {
  const result = await live<RawPit[]>(`/pit?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      driverNumber: raw.driver_number,
      lapNumber: raw.lap_number,
      pitDuration: raw.pit_duration,
    })),
  };
}

export async function getStints(sessionKey: number): Promise<ApiResult<StintEntry[]>> {
  const result = await live<RawStint[]>(`/stints?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return { ok: true, data: result.data.map(mapStint) };
}

export async function getRaceControl(
  sessionKey: number,
): Promise<ApiResult<RaceControlMessage[]>> {
  const result = await live<RawRaceControl[]>(
    `/race_control?session_key=${sessionKey}`,
  );
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      dateUtc: raw.date,
      category: raw.category,
      flag: raw.flag,
      message: raw.message,
      scope: raw.scope,
    })),
  };
}

export async function getSessionWeather(
  sessionKey: number,
): Promise<ApiResult<SessionWeather | null>> {
  const result = await live<RawWeather[]>(`/weather?session_key=${sessionKey}`);
  if (!result.ok) return result;
  const latest = result.data.at(-1);
  return {
    ok: true,
    data: latest
      ? {
          airTemp: latest.air_temperature,
          trackTemp: latest.track_temperature,
          humidity: latest.humidity,
          rainfall: latest.rainfall,
          windSpeed: latest.wind_speed,
          dateUtc: latest.date,
        }
      : null,
  };
}

export async function getTeamRadio(
  sessionKey: number,
): Promise<ApiResult<TeamRadioEntry[]>> {
  const result = await live<RawTeamRadio[]>(`/team_radio?session_key=${sessionKey}`);
  if (!result.ok) return result;
  return {
    ok: true,
    data: result.data.map((raw) => ({
      driverNumber: raw.driver_number,
      dateUtc: raw.date,
      recordingUrl: raw.recording_url,
    })),
  };
}
