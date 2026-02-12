"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const pair_1 = require("./pair");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket A1 - A3 : Poker Hands", () => {
    // ... previous tests ...
    // Re-adding previous tests for completeness + new ones
    (0, vitest_1.it)("evaluates High Card", () => {
        const cards = ["Ah", "Kd", "Js", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.HighCard);
    });
    (0, vitest_1.it)("evaluates Pair", () => {
        const cards = ["Jh", "Jd", "Ks", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.Pair);
    });
    (0, vitest_1.it)("evaluates Two Pair", () => {
        const cards = ["Jh", "Jd", "9c", "9s", "8h"].map(parser_1.parseCard);
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.TwoPair);
    });
    (0, vitest_1.it)("evaluates Three of a Kind", () => {
        const cards = ["Jh", "Jd", "Js", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.ThreeOfAKind);
    });
    (0, vitest_1.it)("evaluates Full House", () => {
        const cards = ["7h", "7d", "7s", "3c", "3h"].map(parser_1.parseCard); // 7s full of 3s
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.FullHouse);
        // Sort: Triples first, then Pair
        (0, vitest_1.expect)(result.cards.map(c => c.rank)).toEqual([7, 7, 7, 3, 3]);
    });
    (0, vitest_1.it)("evaluates Four of a Kind", () => {
        const cards = ["7h", "7d", "7s", "7c", "3h"].map(parser_1.parseCard); // 4 7s
        const result = (0, pair_1.evaluate)(cards);
        (0, vitest_1.expect)(result.category).toBe(pair_1.Category.FourOfAKind);
        // Sort: Quads first, then Kicker
        (0, vitest_1.expect)(result.cards.map(c => c.rank)).toEqual([7, 7, 7, 7, 3]);
    });
    (0, vitest_1.it)("Full House beats Flush (if we implemented Flush in evaluate, but we haven't yet. Flush > Straight > Three. Full House > Flush)", () => {
        // Wait, Flush is not in Category enum yet.
        // Current order: High(0) < Pair(1) < TwoPair(2) < Three(3) < FullHouse(4) < Four(5).
        // Standard: ... Three < Straight < Flush < FullHouse ...
        // So Full House > Three.
        const fh = ["7h", "7d", "7s", "3c", "3h"].map(parser_1.parseCard);
        const trips = ["Ah", "Ad", "As", "Kc", "Qh"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(fh), (0, pair_1.evaluate)(trips))).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("Four of a Kind beats Full House", () => {
        const quads = ["2h", "2d", "2s", "2c", "3h"].map(parser_1.parseCard);
        const fh = ["Ah", "Ad", "As", "Kc", "Kh"].map(parser_1.parseCard); // Aces full of Kings
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(quads), (0, pair_1.evaluate)(fh))).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("Higher Full House beats Lower Full House (by Triple)", () => {
        const fhHigh = ["7h", "7d", "7s", "2c", "2h"].map(parser_1.parseCard); // 7s full of 2s
        const fhLow = ["6h", "6d", "6s", "Ah", "Ad"].map(parser_1.parseCard); // 6s full of Aces
        // 7 > 6, so fhHigh wins
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(fhHigh), (0, pair_1.evaluate)(fhLow))).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("Equal Triple Full House decided by Pair", () => {
        const fhHigh = ["7h", "7d", "7s", "3c", "3h"].map(parser_1.parseCard); // 7s full of 3s
        const fhLow = ["7c", "7h", "7d", "2c", "2h"].map(parser_1.parseCard); // 7s full of 2s
        // 3 > 2
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(fhHigh), (0, pair_1.evaluate)(fhLow))).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("Higher Four of a Kind beats Lower Four of a Kind", () => {
        const qHigh = ["3h", "3d", "3s", "3c", "2h"].map(parser_1.parseCard);
        const qLow = ["2h", "2d", "2s", "2c", "Ah"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(qHigh), (0, pair_1.evaluate)(qLow))).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("Equal Four of a Kind decided by Kicker", () => {
        const qHigh = ["3h", "3d", "3s", "3c", "Ah"].map(parser_1.parseCard);
        const qLow = ["3h", "3d", "3s", "3c", "Kh"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, pair_1.compare)((0, pair_1.evaluate)(qHigh), (0, pair_1.evaluate)(qLow))).toBeGreaterThan(0);
    });
});
