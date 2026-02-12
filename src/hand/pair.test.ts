import { describe, it, expect } from "vitest";
import { evaluate, Category, compare } from "./pair";
import { parseCard } from "../core/parser";

describe("Ticket A1 - A3 : Poker Hands", () => {
  // ... previous tests ...
  // Re-adding previous tests for completeness + new ones

  it("evaluates High Card", () => {
    const cards = ["Ah", "Kd", "Js", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.HighCard);
  });

  it("evaluates Pair", () => {
    const cards = ["Jh", "Jd", "Ks", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.Pair);
  });

  it("evaluates Two Pair", () => {
    const cards = ["Jh", "Jd", "9c", "9s", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.TwoPair);
  });

  it("evaluates Three of a Kind", () => {
    const cards = ["Jh", "Jd", "Js", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.ThreeOfAKind);
  });

  it("evaluates Full House", () => {
    const cards = ["7h", "7d", "7s", "3c", "3h"].map(parseCard); // 7s full of 3s
    const result = evaluate(cards);
    expect(result.category).toBe(Category.FullHouse);
    // Sort: Triples first, then Pair
    expect(result.cards.map(c => c.rank)).toEqual([7, 7, 7, 3, 3]);
  });

  it("evaluates Four of a Kind", () => {
    const cards = ["7h", "7d", "7s", "7c", "3h"].map(parseCard); // 4 7s
    const result = evaluate(cards);
    expect(result.category).toBe(Category.FourOfAKind);
    // Sort: Quads first, then Kicker
    expect(result.cards.map(c => c.rank)).toEqual([7, 7, 7, 7, 3]);
  });

  it("Full House beats Flush (if we implemented Flush in evaluate, but we haven't yet. Flush > Straight > Three. Full House > Flush)", () => {
      // Wait, Flush is not in Category enum yet.
      // Current order: High(0) < Pair(1) < TwoPair(2) < Three(3) < FullHouse(4) < Four(5).
      // Standard: ... Three < Straight < Flush < FullHouse ...
      // So Full House > Three.
      const fh = ["7h", "7d", "7s", "3c", "3h"].map(parseCard);
      const trips = ["Ah", "Ad", "As", "Kc", "Qh"].map(parseCard);

      expect(compare(evaluate(fh), evaluate(trips))).toBeGreaterThan(0);
  });

  it("Four of a Kind beats Full House", () => {
      const quads = ["2h", "2d", "2s", "2c", "3h"].map(parseCard);
      const fh = ["Ah", "Ad", "As", "Kc", "Kh"].map(parseCard); // Aces full of Kings

      expect(compare(evaluate(quads), evaluate(fh))).toBeGreaterThan(0);
  });

  it("Higher Full House beats Lower Full House (by Triple)", () => {
      const fhHigh = ["7h", "7d", "7s", "2c", "2h"].map(parseCard); // 7s full of 2s
      const fhLow = ["6h", "6d", "6s", "Ah", "Ad"].map(parseCard); // 6s full of Aces

      // 7 > 6, so fhHigh wins
      expect(compare(evaluate(fhHigh), evaluate(fhLow))).toBeGreaterThan(0);
  });

  it("Equal Triple Full House decided by Pair", () => {
      const fhHigh = ["7h", "7d", "7s", "3c", "3h"].map(parseCard); // 7s full of 3s
      const fhLow = ["7c", "7h", "7d", "2c", "2h"].map(parseCard); // 7s full of 2s

      // 3 > 2
      expect(compare(evaluate(fhHigh), evaluate(fhLow))).toBeGreaterThan(0);
  });

  it("Higher Four of a Kind beats Lower Four of a Kind", () => {
      const qHigh = ["3h", "3d", "3s", "3c", "2h"].map(parseCard);
      const qLow = ["2h", "2d", "2s", "2c", "Ah"].map(parseCard);

      expect(compare(evaluate(qHigh), evaluate(qLow))).toBeGreaterThan(0);
  });

  it("Equal Four of a Kind decided by Kicker", () => {
      const qHigh = ["3h", "3d", "3s", "3c", "Ah"].map(parseCard);
      const qLow = ["3h", "3d", "3s", "3c", "Kh"].map(parseCard);

      expect(compare(evaluate(qHigh), evaluate(qLow))).toBeGreaterThan(0);
  });
});
