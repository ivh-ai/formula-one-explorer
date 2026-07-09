import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("tooling smoke test", () => {
  it("resolves the @ alias and merges classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
