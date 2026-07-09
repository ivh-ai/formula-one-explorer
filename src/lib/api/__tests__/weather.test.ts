import { describe, expect, it } from "vitest";
import { mapForecast, weatherCodeToLabel } from "@/lib/api/weather";

describe("mapForecast", () => {
  it("maps current and daily arrays into forecasts", () => {
    const mapped = mapForecast({
      current: {
        temperature_2m: 24.3,
        precipitation: 0.2,
        wind_speed_10m: 11.5,
        weather_code: 61,
      },
      daily: {
        time: ["2026-07-09", "2026-07-10"],
        temperature_2m_max: [26.1, 22.4],
        temperature_2m_min: [15.0, 13.2],
        precipitation_probability_max: [20, 80],
        weather_code: [2, 63],
      },
    });

    expect(mapped.currentTempC).toBe(24.3);
    expect(mapped.weatherCode).toBe(61);
    expect(mapped.daily).toHaveLength(2);
    expect(mapped.daily[1]).toEqual({
      date: "2026-07-10",
      maxTempC: 22.4,
      minTempC: 13.2,
      precipProbability: 80,
      weatherCode: 63,
    });
  });

  it("tolerates missing fields", () => {
    const mapped = mapForecast({});
    expect(mapped.currentTempC).toBe(0);
    expect(mapped.daily).toEqual([]);
  });
});

describe("weatherCodeToLabel", () => {
  it("buckets WMO codes", () => {
    expect(weatherCodeToLabel(0)).toEqual({ label: "Clear", icon: "sun" });
    expect(weatherCodeToLabel(3).icon).toBe("cloud");
    expect(weatherCodeToLabel(48).icon).toBe("fog");
    expect(weatherCodeToLabel(63).icon).toBe("rain");
    expect(weatherCodeToLabel(75).icon).toBe("snow");
    expect(weatherCodeToLabel(95).icon).toBe("storm");
    expect(weatherCodeToLabel(82).icon).toBe("rain");
  });
});
