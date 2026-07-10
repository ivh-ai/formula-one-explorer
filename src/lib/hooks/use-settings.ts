"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ThemeSetting = "system" | "light" | "dark";

export type AppSettings = {
  theme: ThemeSetting;
  reducedMotion: boolean;
};

const STORAGE_KEY = "f1x-settings";
const CHANGE_EVENT = "f1x-settings-changed";

const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  reducedMotion: false,
};

let cachedRaw: string | null = null;
let cachedSettings: AppSettings = DEFAULT_SETTINGS;

function parseSettings(raw: string | null): AppSettings {
  if (!raw) return DEFAULT_SETTINGS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_SETTINGS;
    const candidate = parsed as Partial<AppSettings>;
    return {
      theme:
        candidate.theme === "light" || candidate.theme === "dark"
          ? candidate.theme
          : "system",
      reducedMotion: candidate.reducedMotion === true,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Snapshot must be referentially stable between changes for useSyncExternalStore. */
function getSnapshot(): AppSettings {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSettings = parseSettings(raw);
  }
  return cachedSettings;
}

function getServerSnapshot(): AppSettings {
  return DEFAULT_SETTINGS;
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function applyTheme(theme: ThemeSetting) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", dark);
}

/** App-wide user preferences persisted to localStorage. */
export function useSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((next: Partial<AppSettings>) => {
    const merged = { ...getSnapshot(), ...next };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    applyTheme(merged.theme);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const setTheme = useCallback(
    (theme: ThemeSetting) => update({ theme }),
    [update],
  );
  const setReducedMotion = useCallback(
    (reducedMotion: boolean) => update({ reducedMotion }),
    [update],
  );

  return { settings, setTheme, setReducedMotion };
}

function subscribeMedia(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getMediaSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when motion should be minimized — either the OS preference or the
 * in-app setting asks for it.
 */
export function useReducedMotionPreference(): boolean {
  const { settings } = useSettings();
  const osPref = useSyncExternalStore(subscribeMedia, getMediaSnapshot, () => false);
  return osPref || settings.reducedMotion;
}
