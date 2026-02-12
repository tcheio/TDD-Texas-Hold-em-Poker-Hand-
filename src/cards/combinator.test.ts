import { describe, it, expect } from "vitest";
import { combinationsOf5From7, pickBest5, compareScoreVector } from "./combinator";
import { parseCard } from "./parser";
import { bestStraight } from "./straight";
import { bestFlush } from "./flush";

describe("Combinator - 7 cards => best 5 cards", () => {
  it("generates exactly 21 combinations of 5 from 7", () => {
    const cards7 = ["Ah", "Kh", "Qh", "Jh", "Th", "2c", "3d"].map(parseCard);

    const combos = combinationsOf5From7(cards7);

    expect(combos.length).toBe(21);
    for (const c5 of combos) {
      expect(c5.length).toBe(5);
      const key = c5.map((c) => `${c.rank}${c.suit}`);
      expect(new Set(key).size).toBe(5);
    }
  });

  it("picks the best 5 using an evaluator + comparator", () => {
    const cards7 = ["Ah", "Jh", "9h", "6h", "4h", "Tc", "8d"].map(parseCard);

    const evaluate5 = (cards5: readonly any[]) => {
      const flush = bestFlush(cards5);
      if (flush) {
        const ranksDesc = [...flush.cards].map((c) => c.rank);
        return [6, ...ranksDesc];
      }

      const straight = bestStraight(cards5);
      if (straight) {
        return [5, straight.high];
      }

      const ranks = [...cards5].map((c: any) => c.rank).sort((a, b) => b - a);
      return [1, ...ranks];
    };

    const { best5, score } = pickBest5(cards7, evaluate5, compareScoreVector);

    const bestKey = best5.map((c: any) => `${c.rank}${c.suit}`).sort();
    expect(bestKey).toEqual(["14h", "11h", "9h", "6h", "4h"].sort());

    expect(score[0]).toBe(6);
  });

  it("board plays example: best-of-7 can return a straight entirely from the board", () => {
    const cards7 = ["5c", "6d", "7h", "8s", "9d", "Ac", "Ad"].map(parseCard);

    const evaluate5 = (cards5: readonly any[]) => {
      const straight = bestStraight(cards5);
      if (straight) return [5, straight.high];
      const ranks = [...cards5].map((c: any) => c.rank).sort((a, b) => b - a);
      return [1, ...ranks];
    };

    const { best5, score } = pickBest5(cards7, evaluate5, compareScoreVector);

    expect(score).toEqual([5, 9]);

    const bestRanks = best5.map((c: any) => c.rank).sort((a, b) => b - a);
    expect(bestRanks).toEqual([9, 8, 7, 6, 5]);
  });
});
