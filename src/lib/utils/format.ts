/** Formatting helpers for timing data, dates and colors. */

const EM_DASH = "—";

/** Seconds → "m:ss.mmm" (or "ss.mmm" under a minute). */
export function formatLapSeconds(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return EM_DASH;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds - minutes * 60;
  const restText = rest.toFixed(3).padStart(6, "0");
  return minutes > 0 ? `${minutes}:${restText}` : rest.toFixed(3);
}

/** Gap to leader: 0 → "Leader", numbers → "+s.mmm", strings pass through. */
export function formatGapSeconds(
  gap: number | string | null | undefined,
): string {
  if (gap == null) return EM_DASH;
  if (typeof gap === "string") return gap;
  if (gap === 0) return "Leader";
  return `+${gap.toFixed(3)}`;
}

export function ordinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

/** ISO string → "Jul 5, 2026" (UTC), or em dash when missing/invalid. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return EM_DASH;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return EM_DASH;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** ISO string → "Sun, Jul 5 · 14:00 UTC". */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return EM_DASH;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return EM_DASH;
  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
  return `${day} · ${time} UTC`;
}

/** WCAG-ish contrast heuristic: pick black or white text for a hex bg. */
export function readableTextOn(bgHex: string): "#111111" | "#FFFFFF" {
  const hex = bgHex.replace("#", "");
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;
  const channel = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.4 ? "#111111" : "#FFFFFF";
}
