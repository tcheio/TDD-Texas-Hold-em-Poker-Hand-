import { describe, it, expect } from "vitest";
import { evaluate, Category, compare } from "./pair";
import { parseCard } from "./parser";

describe("Ticket A1 & A2 - Pairs & Three of a Kind", () => {
  it("evaluates a hand as High Card when there are no matching ranks", () => {
    // A, K, J, 9, 8 (High Card Ace)
    const cards = ["Ah", "Kd", "Js", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.HighCard);
    // Should contain ranks sorted descending
    expect(result.cards.map(c => c.rank)).toEqual([14, 13, 11, 9, 8]);
  });

  it("evaluates a hand as Pair when there are two cards of the same rank", () => {
    // Pair of Jacks
    const cards = ["Jh", "Jd", "Ks", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.Pair);
    // Rank of pair first, then kickers descending
    // Pair rank is 11 (Jack), kickers are 13 (King), 9, 8
    // With current sort logic, both Jacks will come first: [11, 11, 13, 9, 8]
    expect(result.cards.map(c => c.rank)).toEqual([11, 11, 13, 9, 8]);
  });

  it("evaluates a hand as Two Pair", () => {
    // Two Pair: Jacks and 9s, Kicker 8
    const cards = ["Jh", "Jd", "9c", "9s", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.TwoPair);
    // Should be sorted: Jacks, then 9s, then 8
    expect(result.cards.map(c => c.rank)).toEqual([11, 11, 9, 9, 8]);
  });

  it("evaluates a hand as Three of a Kind", () => {
    // Three Jacks, Kicker 9, 8
    const cards = ["Jh", "Jd", "Js", "9c", "8h"].map(parseCard);
    const result = evaluate(cards);
    expect(result.category).toBe(Category.ThreeOfAKind);
    // Triple first, then kickers sorted
    expect(result.cards.map(c => c.rank)).toEqual([11, 11, 11, 9, 8]);
  });

  it("Pair beats High Card", () => {
    const pairHand = ["2h", "2d", "3s", "4c", "5h"].map(parseCard); // Pair of 2s
    const highCardHand = ["Ah", "Kd", "Qs", "Jc", "9h"].map(parseCard); // High Card Ace

    const valPair = evaluate(pairHand);
    const valHigh = evaluate(highCardHand);

    expect(compare(valPair, valHigh)).toBeGreaterThan(0);
  });

  it("Two Pair beats Pair", () => {
    const twoPair = ["Jh", "Jd", "9c", "9s", "8h"].map(parseCard);
    const pair = ["Ah", "Ad", "Ks", "Qc", "Jh"].map(parseCard);

    expect(compare(evaluate(twoPair), evaluate(pair))).toBeGreaterThan(0);
  });

  it("Three of a Kind beats Two Pair", () => {
    const trips = ["2h", "2d", "2s", "3c", "4h"].map(parseCard); // Trips 2s
    const twoPair = ["Ah", "Ad", "Kh", "Kd", "Qc"].map(parseCard); // Two Pair Aces & Kings

    expect(compare(evaluate(trips), evaluate(twoPair))).toBeGreaterThan(0);
  });

  it("Higher Pair beats Lower Pair", () => {
    const pairJacks = ["Jh", "Jd", "2s", "3c", "4h"].map(parseCard);
    const pairTens = ["Th", "Td", "As", "Kc", "Qh"].map(parseCard);

    expect(compare(evaluate(pairJacks), evaluate(pairTens))).toBeGreaterThan(0);
  });

  it("Equal Pair is decided by kickers", () => {
    const pairJacksHighKicker = ["Jh", "Jd", "Ks", "9c", "8h"].map(parseCard);
    const pairJacksLowKicker = ["Jh", "Jd", "Qs", "9c", "8h"].map(parseCard);

    const valHigh = evaluate(pairJacksHighKicker);
    const valLow = evaluate(pairJacksLowKicker);

    expect(compare(valHigh, valLow)).toBeGreaterThan(0);
  });

  it("Higher Two Pair beats Lower Two Pair", () => {
    const jacksAndNines = ["Jh", "Jd", "9c", "9s", "8h"].map(parseCard); // Jacks & 9s
    const acesAndTens = ["Th", "Td", "As", "Ac", "8h"].map(parseCard); // Aces & Tens

    // Aces (14) > Jacks (11), so Aces & Tens is better
    expect(compare(evaluate(acesAndTens), evaluate(jacksAndNines))).toBeGreaterThan(0);
  });

  it("Equal Top Pair is decided by Second Pair", () => {
      const p1 = ["Ah", "Ad", "9c", "9s", "2h"].map(parseCard); // A, 9, 2
      const p2 = ["As", "Ac", "8h", "8d", "Kh"].map(parseCard); // A, 8, K
      
      // A == A, 9 > 8
      expect(compare(evaluate(p1), evaluate(p2))).toBeGreaterThan(0);
  });

  it("Equal Two Pair is decided by Kicker", () => {
      const p1 = ["Ah", "Ad", "9c", "9s", "Kh"].map(parseCard); // A, 9, K
      const p2 = ["As", "Ac", "9h", "9d", "Qh"].map(parseCard); // A, 9, Q
      
      expect(compare(evaluate(p1), evaluate(p2))).toBeGreaterThan(0);
  });
});
