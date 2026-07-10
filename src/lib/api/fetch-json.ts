/**
 * Resilient JSON fetcher used by every API client in the app. Adds timeout,
 * retry with exponential backoff, and a typed result so callers never throw.
 */

export type ApiError = {
  kind: "http" | "network" | "timeout" | "parse";
  status?: number;
  message: string;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export type FetchJsonOptions = {
  /** Next.js cache revalidation in seconds; `false` caches indefinitely. */
  revalidate?: number | false;
  timeoutMs?: number;
  /** Additional attempts after the first (network/timeout/5xx only). */
  retries?: number;
  tags?: string[];
};

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 2;
const BACKOFF_BASE_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type AttemptOutcome<T> =
  | { done: true; result: ApiResult<T> }
  | { done: false; error: ApiError };

async function attempt<T>(
  url: string,
  opts: FetchJsonOptions,
): Promise<AttemptOutcome<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: {
        revalidate: opts.revalidate,
        tags: opts.tags,
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        kind: "http",
        status: response.status,
        message: `HTTP ${response.status} for ${url}`,
      };
      // Server errors and rate limits are worth retrying; other client
      // errors are not.
      if (response.status >= 500 || response.status === 429) {
        return { done: false, error };
      }
      return { done: true, result: { ok: false, error } };
    }

    try {
      const data = (await response.json()) as T;
      return { done: true, result: { ok: true, data } };
    } catch {
      return {
        done: true,
        result: {
          ok: false,
          error: { kind: "parse", message: `Invalid JSON from ${url}` },
        },
      };
    }
  } catch (cause) {
    const aborted =
      cause instanceof DOMException
        ? cause.name === "AbortError"
        : controller.signal.aborted;
    const error: ApiError = aborted
      ? { kind: "timeout", message: `Timed out fetching ${url}` }
      : {
          kind: "network",
          message: cause instanceof Error ? cause.message : `Network error for ${url}`,
        };
    return { done: false, error };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson<T>(
  url: string,
  opts: FetchJsonOptions = {},
): Promise<ApiResult<T>> {
  const retries = opts.retries ?? DEFAULT_RETRIES;
  let lastError: ApiError = { kind: "network", message: `Failed to fetch ${url}` };

  for (let attemptIndex = 0; attemptIndex <= retries; attemptIndex += 1) {
    if (attemptIndex > 0) {
      await delay(BACKOFF_BASE_MS * 2 ** (attemptIndex - 1));
    }
    const outcome = await attempt<T>(url, opts);
    if (outcome.done) return outcome.result;
    lastError = outcome.error;
  }

  return { ok: false, error: lastError };
}
