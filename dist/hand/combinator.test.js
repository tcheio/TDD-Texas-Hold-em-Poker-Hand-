"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const combinator_1 = require("./combinator");
const parser_1 = require("../core/parser");
const straight_1 = require("./straight");
const flush_1 = require("./flush");
(0, vitest_1.describe)("Combinator - 7 cards => best 5 cards", () => {
    (0, vitest_1.it)("generates exactly 21 combinations of 5 from 7", () => {
        const cards7 = ["Ah", "Kh", "Qh", "Jh", "Th", "2c", "3d"].map(parser_1.parseCard);
        const combos = (0, combinator_1.combinationsOf5From7)(cards7);
        (0, vitest_1.expect)(combos.length).toBe(21);
        for (const c5 of combos) {
            (0, vitest_1.expect)(c5.length).toBe(5);
            const key = c5.map((c) => `${c.rank}${c.suit}`);
            (0, vitest_1.expect)(new Set(key).size).toBe(5);
        }
    });
    (0, vitest_1.it)("picks the best 5 using an evaluator + comparator", () => {
        const cards7 = ["Ah", "Jh", "9h", "6h", "4h", "Tc", "8d"].map(parser_1.parseCard);
        const evaluate5 = (cards5) => {
            const flush = (0, flush_1.bestFlush)(cards5);
            if (flush) {
                const ranksDesc = [...flush.cards].map((c) => c.rank);
                return [6, ...ranksDesc];
            }
            const straight = (0, straight_1.bestStraight)(cards5);
            if (straight) {
                return [5, straight.high];
            }
            const ranks = [...cards5].map((c) => c.rank).sort((a, b) => b - a);
            return [1, ...ranks];
        };
        const { best5, score } = (0, combinator_1.pickBest5)(cards7, evaluate5, combinator_1.compareScoreVector);
        const bestKey = best5.map((c) => `${c.rank}${c.suit}`).sort();
        (0, vitest_1.expect)(bestKey).toEqual(["14h", "11h", "9h", "6h", "4h"].sort());
        (0, vitest_1.expect)(score[0]).toBe(6);
    });
    (0, vitest_1.it)("board plays example: best-of-7 can return a straight entirely from the board", () => {
        const cards7 = ["5c", "6d", "7h", "8s", "9d", "Ac", "Ad"].map(parser_1.parseCard);
        const evaluate5 = (cards5) => {
            const straight = (0, straight_1.bestStraight)(cards5);
            if (straight)
                return [5, straight.high];
            const ranks = [...cards5].map((c) => c.rank).sort((a, b) => b - a);
            return [1, ...ranks];
        };
        const { best5, score } = (0, combinator_1.pickBest5)(cards7, evaluate5, combinator_1.compareScoreVector);
        (0, vitest_1.expect)(score).toEqual([5, 9]);
        const bestRanks = best5.map((c) => c.rank).sort((a, b) => b - a);
        (0, vitest_1.expect)(bestRanks).toEqual([9, 8, 7, 6, 5]);
    });
});
