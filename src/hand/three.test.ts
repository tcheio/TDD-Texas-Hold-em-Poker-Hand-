import { describe, it, expect } from "vitest";
import { bestThreeOfAKind } from "./three";
import { parseCard } from "../core/parser";

describe("Ticket A2 - Three of a Kind", () => {
  it("detects three of a kind when present", () => {
    const cards = ["Jh", "Jd", "Js", "9c", "8h"].map(parseCard);
    const result = bestThreeOfAKind(cards);

    expect(result).not.toBeNull();
    expect(result!.rank).toBe(11);
    expect(result!.kickers.map(c => c.rank)).toEqual([9, 8]);
  });

  it("returns null when no three of a kind", () => {
    const cards = ["Jh", "Jd", "Qs", "9c", "8h"].map(parseCard);
    const result = bestThreeOfAKind(cards);

    expect(result).toBeNull();
  });
});
