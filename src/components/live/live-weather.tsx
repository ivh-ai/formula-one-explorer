import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import type { SessionWeather } from "@/lib/models/live";

export function LiveWeather({ weather }: { weather: SessionWeather | null }) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Trackside conditions
      </h2>
      {!weather ? (
        <p className="text-sm text-muted-foreground">No weather data for this session.</p>
      ) : (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="size-4 text-orange-500" aria-hidden />
            <div>
              <dt className="text-xs text-muted-foreground">Air</dt>
              <dd className="timing-mono font-bold">{weather.airTemp.toFixed(1)}°C</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="size-4 text-red-500" aria-hidden />
            <div>
              <dt className="text-xs text-muted-foreground">Track</dt>
              <dd className="timing-mono font-bold">{weather.trackTemp.toFixed(1)}°C</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="size-4 text-blue-400" aria-hidden />
            <div>
              <dt className="text-xs text-muted-foreground">Humidity</dt>
              <dd className="timing-mono font-bold">{Math.round(weather.humidity)}%</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="size-4 text-teal-500" aria-hidden />
            <div>
              <dt className="text-xs text-muted-foreground">Wind</dt>
              <dd className="timing-mono font-bold">{weather.windSpeed.toFixed(1)} m/s</dd>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <CloudRain className="size-4 text-blue-500" aria-hidden />
            <div>
              <dt className="text-xs text-muted-foreground">Rainfall</dt>
              <dd className="font-medium">
                {weather.rainfall > 0 ? "Rain falling" : "Dry"}
              </dd>
            </div>
          </div>
        </dl>
      )}
    </div>
  );
}
