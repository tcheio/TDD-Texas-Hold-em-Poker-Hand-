import { describe, it, expect } from "vitest";
import { bestTwoPair } from "./two-pair";
import { parseCard } from "./parser";

describe("Ticket A2 - Two Pair", () => {
  it("detects two pair when present", () => {
    const cards = ["Jh", "Jd", "9c", "9s", "8h"].map(parseCard);
    const result = bestTwoPair(cards);
    
    expect(result).not.toBeNull();
    expect(result!.highRank).toBe(11); // Jack
    expect(result!.lowRank).toBe(9);   // 9
    expect(result!.kicker.rank).toBe(8); // 8
  });

  it("returns null when no two pair", () => {
    const cards = ["Jh", "Jd", "Qs", "9c", "8h"].map(parseCard);
    const result = bestTwoPair(cards);
    
    expect(result).toBeNull();
  });

  it("chooses higher pair as high rank", () => {
    const cards = ["9c", "9s", "Ah", "Ad", "8h"].map(parseCard);
    const result = bestTwoPair(cards);
    
    expect(result).not.toBeNull();
    expect(result!.highRank).toBe(14); // Ace
    expect(result!.lowRank).toBe(9);   // 9
    expect(result!.kicker.rank).toBe(8); // 8
  });
});
