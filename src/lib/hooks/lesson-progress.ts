"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "f1x-lessons-completed";
const CHANGE_EVENT = "f1x-lessons-changed";

let cachedRaw: string | null = null;
let cachedSet: ReadonlySet<string> = new Set();

function getSnapshot(): ReadonlySet<string> {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cachedSet = new Set(
        Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === "string") : [],
      );
    } catch {
      cachedSet = new Set();
    }
  }
  return cachedSet;
}

const EMPTY: ReadonlySet<string> = new Set();

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Which lessons the user has marked complete (device-local). */
export function useLessonProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const toggleComplete = useCallback((slug: string) => {
    const next = new Set(getSnapshot());
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { completed, toggleComplete };
}
