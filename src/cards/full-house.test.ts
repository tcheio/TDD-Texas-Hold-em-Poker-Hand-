import { describe, it, expect } from "vitest";
import { bestFullHouse } from "./full-house";
import { parseCard } from "./parser";

describe("Ticket A3 - Full House", () => {
  it("detects a full house (3+2)", () => {
    // 7, 7, 7, 3, 3
    const cards = ["7h", "7d", "7s", "3c", "3h"].map(parseCard);
    const result = bestFullHouse(cards);
    
    expect(result).not.toBeNull();
    expect(result!.threeRank).toBe(7);
    expect(result!.pairRank).toBe(3);
    expect(result!.cards.length).toBe(5);
  });

  it("detects a full house (3+3)", () => {
    // K, K, K, Q, Q, Q (in 7 cards, picking best 5)
    // Here 6 cards.
    const cards = ["Kh", "Kd", "Ks", "Qc", "Qh", "Qs"].map(parseCard);
    const result = bestFullHouse(cards);
    
    expect(result).not.toBeNull();
    expect(result!.threeRank).toBe(13); // King
    expect(result!.pairRank).toBe(12); // Queen
    expect(result!.cards.length).toBe(5);
  });

  it("detects a full house (3+2) with extra cards", () => {
    // 7, 7, 7, 3, 3, 2, A
    const cards = ["7h", "7d", "7s", "3c", "3h", "2d", "Ah"].map(parseCard);
    const result = bestFullHouse(cards);
    
    expect(result).not.toBeNull();
    expect(result!.threeRank).toBe(7);
    expect(result!.pairRank).toBe(3);
  });

  it("returns null when no full house", () => {
    // 7, 7, 7, 3, 2
    const cards = ["7h", "7d", "7s", "3c", "2h"].map(parseCard);
    const result = bestFullHouse(cards);
    
    expect(result).toBeNull();
  });
});
