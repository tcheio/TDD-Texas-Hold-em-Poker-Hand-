import { describe, it, expect } from "vitest";
import { evaluate, Category, compare } from "./pair";
import { parseCard } from "./parser";

describe("Ticket A1 - High Card & Pair", () => {
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

  it("Pair beats High Card", () => {
    const pairHand = ["2h", "2d", "3s", "4c", "5h"].map(parseCard); // Pair of 2s
    const highCardHand = ["Ah", "Kd", "Qs", "Jc", "9h"].map(parseCard); // High Card Ace

    const valPair = evaluate(pairHand);
    const valHigh = evaluate(highCardHand);

    expect(compare(valPair, valHigh)).toBeGreaterThan(0);
  });

  it("Higher Pair beats Lower Pair", () => {
    const pairJacks = ["Jh", "Jd", "2s", "3c", "4h"].map(parseCard);
    const pairTens = ["Th", "Td", "As", "Kc", "Qh"].map(parseCard);

    const valJacks = evaluate(pairJacks);
    const valTens = evaluate(pairTens);

    expect(compare(valJacks, valTens)).toBeGreaterThan(0);
  });

  it("Equal Pair is decided by kickers", () => {
    const pairJacksHighKicker = ["Jh", "Jd", "Ks", "9c", "8h"].map(parseCard);
    const pairJacksLowKicker = ["Jh", "Jd", "Qs", "9c", "8h"].map(parseCard);

    const valHigh = evaluate(pairJacksHighKicker);
    const valLow = evaluate(pairJacksLowKicker);

    expect(compare(valHigh, valLow)).toBeGreaterThan(0);
  });
});
