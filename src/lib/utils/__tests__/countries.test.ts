import { describe, expect, it } from "vitest";
import { countryToIso, nationalityToIso } from "@/lib/utils/countries";

describe("nationalityToIso", () => {
  it("maps common F1 nationalities", () => {
    expect(nationalityToIso("Dutch")).toBe("nl");
    expect(nationalityToIso("British")).toBe("gb");
    expect(nationalityToIso("Monegasque")).toBe("mc");
    expect(nationalityToIso("New Zealander")).toBe("nz");
    expect(nationalityToIso("American")).toBe("us");
    expect(nationalityToIso("Argentine")).toBe("ar");
  });

  it("returns null for unknown nationalities", () => {
    expect(nationalityToIso("Martian")).toBeNull();
  });
});

describe("countryToIso", () => {
  it("maps race host countries including aliases", () => {
    expect(countryToIso("United Kingdom")).toBe("gb");
    expect(countryToIso("UK")).toBe("gb");
    expect(countryToIso("USA")).toBe("us");
    expect(countryToIso("United States")).toBe("us");
    expect(countryToIso("Monaco")).toBe("mc");
    expect(countryToIso("UAE")).toBe("ae");
    expect(countryToIso("Azerbaijan")).toBe("az");
  });

  it("returns null for unknown countries", () => {
    expect(countryToIso("Atlantis")).toBeNull();
  });
});
