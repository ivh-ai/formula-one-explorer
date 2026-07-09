"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useSettings, type ThemeSetting } from "@/lib/hooks/use-settings";

export default function SettingsPage() {
  const { settings, setTheme, setReducedMotion } = useSettings();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="heading-editorial text-4xl">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Preferences are stored on this device only.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Theme and motion preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Follow your system or pick a side of the garage.
              </p>
            </div>
            <Select
              value={settings.theme}
              onValueChange={(value) => setTheme(value as ThemeSetting)}
            >
              <SelectTrigger className="w-36" aria-label="Theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Reduce motion</p>
              <p className="text-sm text-muted-foreground">
                Minimize animations across the app. Your operating system
                preference is always respected.
              </p>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={setReducedMotion}
              aria-label="Reduce motion"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data sources</CardTitle>
          <CardDescription>
            F1 Explorer is an unofficial fan project built on free public APIs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <a className="font-medium underline" href="https://jolpi.ca">Jolpica F1</a>{" "}
            — historical and current results, standings and schedules (successor to
            the Ergast API), covering every season since 1950.
          </p>
          <p>
            <a className="font-medium underline" href="https://openf1.org">OpenF1</a>{" "}
            — session-level timing, positions, tires, pit stops, race control and
            weather for recent and live sessions.
          </p>
          <p>
            <a className="font-medium underline" href="https://open-meteo.com">Open-Meteo</a>{" "}
            — circuit weather forecasts.
          </p>
          <p className="text-muted-foreground">
            Data may lag official timing. This site is not associated with
            Formula 1 companies; F1 and related marks are trademarks of Formula
            One Licensing B.V.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
