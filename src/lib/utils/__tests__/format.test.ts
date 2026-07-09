import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatGapSeconds,
  formatLapSeconds,
  ordinal,
  readableTextOn,
} from "@/lib/utils/format";

describe("formatLapSeconds", () => {
  it("formats seconds into m:ss.mmm", () => {
    expect(formatLapSeconds(98.406)).toBe("1:38.406");
    expect(formatLapSeconds(59.999)).toBe("59.999");
    expect(formatLapSeconds(125.05)).toBe("2:05.050");
  });

  it("returns em dash for null", () => {
    expect(formatLapSeconds(null)).toBe("—");
  });
});

describe("formatGapSeconds", () => {
  it("prefixes positive gaps and passes through text gaps", () => {
    expect(formatGapSeconds(1.234)).toBe("+1.234");
    expect(formatGapSeconds(0)).toBe("Leader");
    expect(formatGapSeconds("+1 LAP")).toBe("+1 LAP");
    expect(formatGapSeconds(null)).toBe("—");
  });
});

describe("ordinal", () => {
  it("handles standard and teen edge cases", () => {
    expect(ordinal(1)).toBe("1st");
    expect(ordinal(2)).toBe("2nd");
    expect(ordinal(3)).toBe("3rd");
    expect(ordinal(4)).toBe("4th");
    expect(ordinal(11)).toBe("11th");
    expect(ordinal(12)).toBe("12th");
    expect(ordinal(13)).toBe("13th");
    expect(ordinal(21)).toBe("21st");
    expect(ordinal(22)).toBe("22nd");
  });
});

describe("formatDate", () => {
  it("formats an ISO date human-readably in UTC", () => {
    expect(formatDate("2026-07-05T14:00:00Z")).toBe("Jul 5, 2026");
  });

  it("returns em dash for invalid input", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate("garbage")).toBe("—");
  });
});

describe("readableTextOn", () => {
  it("returns dark text for light backgrounds and vice versa", () => {
    expect(readableTextOn("#FFF200")).toBe("#111111");
    expect(readableTextOn("#00205B")).toBe("#FFFFFF");
    expect(readableTextOn("#E8002D")).toBe("#FFFFFF");
  });
});
