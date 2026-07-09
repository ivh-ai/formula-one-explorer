import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  Snowflake,
  Sun,
  Wind,
} from "lucide-react";
import { getCircuitWeather, weatherCodeToLabel, type WeatherIcon } from "@/lib/api/weather";

const ICONS: Record<WeatherIcon, typeof Sun> = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
  fog: CloudFog,
};

function WeatherGlyph({ icon, className }: { icon: WeatherIcon; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}

/** Server component — current conditions + short forecast for a circuit. */
export async function CircuitWeather({ lat, lng }: { lat: number; lng: number }) {
  const weather = await getCircuitWeather(lat, lng);
  if (!weather.ok) {
    return (
      <p className="text-sm text-muted-foreground">Weather is unavailable right now.</p>
    );
  }

  const current = weatherCodeToLabel(weather.data.weatherCode);

  return (
    <div>
      <div className="flex items-center gap-4">
        <WeatherGlyph icon={current.icon} className="size-10 text-primary" />
        <div>
          <p className="timing-mono text-3xl font-bold">
            {Math.round(weather.data.currentTempC)}°C
          </p>
          <p className="text-sm text-muted-foreground">
            {current.label} · <Wind className="inline size-3.5" aria-hidden />{" "}
            {Math.round(weather.data.windSpeedKmh)} km/h
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {weather.data.daily.slice(1, 4).map((day) => {
          const label = weatherCodeToLabel(day.weatherCode);
          return (
            <div key={day.date} className="rounded-lg border p-2 text-center">
              <p className="text-xs text-muted-foreground">
                {new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
                  weekday: "short",
                  timeZone: "UTC",
                })}
              </p>
              <WeatherGlyph icon={label.icon} className="mx-auto my-1 size-4" />
              <p className="timing-mono text-xs">
                {Math.round(day.maxTempC)}° / {Math.round(day.minTempC)}°
              </p>
              <p className="text-[10px] text-muted-foreground">{day.precipProbability}% rain</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
