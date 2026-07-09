/** Open-Meteo weather client — keyless circuit forecasts. */
import { fetchJson, type ApiResult } from "@/lib/api/fetch-json";

const BASE = "https://api.open-meteo.com/v1/forecast";

export type DailyForecast = {
  date: string;
  maxTempC: number;
  minTempC: number;
  precipProbability: number;
  weatherCode: number;
};

export type CircuitWeather = {
  currentTempC: number;
  precipitationMm: number;
  windSpeedKmh: number;
  weatherCode: number;
  daily: DailyForecast[];
};

type RawForecast = {
  current?: {
    temperature_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
  };
};

export function mapForecast(raw: RawForecast): CircuitWeather {
  const daily: DailyForecast[] = (raw.daily?.time ?? []).map((date, index) => ({
    date,
    maxTempC: raw.daily?.temperature_2m_max?.[index] ?? 0,
    minTempC: raw.daily?.temperature_2m_min?.[index] ?? 0,
    precipProbability: raw.daily?.precipitation_probability_max?.[index] ?? 0,
    weatherCode: raw.daily?.weather_code?.[index] ?? 0,
  }));

  return {
    currentTempC: raw.current?.temperature_2m ?? 0,
    precipitationMm: raw.current?.precipitation ?? 0,
    windSpeedKmh: raw.current?.wind_speed_10m ?? 0,
    weatherCode: raw.current?.weather_code ?? 0,
    daily,
  };
}

export async function getCircuitWeather(
  lat: number,
  lng: number,
): Promise<ApiResult<CircuitWeather>> {
  const url =
    `${BASE}?latitude=${lat}&longitude=${lng}` +
    "&current=temperature_2m,precipitation,wind_speed_10m,weather_code" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code" +
    "&forecast_days=4&timezone=UTC";
  const result = await fetchJson<RawForecast>(url, { revalidate: 1800 });
  if (!result.ok) return result;
  return { ok: true, data: mapForecast(result.data) };
}

export type WeatherIcon = "sun" | "cloud" | "rain" | "storm" | "snow" | "fog";

/** WMO weather interpretation codes → label + icon bucket. */
export function weatherCodeToLabel(code: number): { label: string; icon: WeatherIcon } {
  if (code === 0) return { label: "Clear", icon: "sun" };
  if (code <= 2) return { label: "Partly cloudy", icon: "sun" };
  if (code === 3) return { label: "Overcast", icon: "cloud" };
  if (code === 45 || code === 48) return { label: "Fog", icon: "fog" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: "rain" };
  if (code >= 61 && code <= 67) return { label: "Rain", icon: "rain" };
  if (code >= 71 && code <= 77) return { label: "Snow", icon: "snow" };
  if (code >= 80 && code <= 82) return { label: "Showers", icon: "rain" };
  if (code >= 85 && code <= 86) return { label: "Snow showers", icon: "snow" };
  if (code >= 95) return { label: "Thunderstorm", icon: "storm" };
  return { label: "Unsettled", icon: "cloud" };
}
