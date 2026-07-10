import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchJson } from "@/lib/api/fetch-json";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("fetchJson", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("returns ok:true with parsed data on success", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ hello: "world" }));

    const result = await fetchJson<{ hello: string }>("https://example.test/api");

    expect(result).toEqual({ ok: true, data: { hello: "world" } });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns an http error without retrying on 404", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ message: "nope" }, 404));

    const result = await fetchJson("https://example.test/missing");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe("http");
      expect(result.error.status).toBe(404);
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries on 500 and fails after retries are exhausted", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ message: "boom" }, 500));

    const promise = fetchJson("https://example.test/flaky", { retries: 2 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe("http");
      expect(result.error.status).toBe(500);
    }
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("retries a 429 rate limit and succeeds on the second attempt", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ message: "slow down" }, 429))
      .mockResolvedValueOnce(jsonResponse({ recovered: true }));

    const promise = fetchJson<{ recovered: boolean }>("https://example.test/limited");
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ ok: true, data: { recovered: true } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries a network failure and succeeds on the second attempt", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(jsonResponse({ recovered: true }));

    const promise = fetchJson<{ recovered: boolean }>("https://example.test/net");
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ ok: true, data: { recovered: true } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns a parse error for invalid JSON", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("<html>not json</html>", { status: 200 }),
    );

    const result = await fetchJson("https://example.test/html");

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("parse");
  });

  it("returns a timeout error when the request exceeds timeoutMs", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          );
        }),
    );

    const promise = fetchJson("https://example.test/slow", {
      timeoutMs: 50,
      retries: 0,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.kind).toBe("timeout");
  });
});
