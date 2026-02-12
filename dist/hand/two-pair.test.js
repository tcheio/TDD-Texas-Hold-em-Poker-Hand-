"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const two_pair_1 = require("./two-pair");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket A2 - Two Pair", () => {
    (0, vitest_1.it)("detects two pair when present", () => {
        const cards = ["Jh", "Jd", "9c", "9s", "8h"].map(parser_1.parseCard);
        const result = (0, two_pair_1.bestTwoPair)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.highRank).toBe(11); // Jack
        (0, vitest_1.expect)(result.lowRank).toBe(9); // 9
        (0, vitest_1.expect)(result.kicker.rank).toBe(8); // 8
    });
    (0, vitest_1.it)("returns null when no two pair", () => {
        const cards = ["Jh", "Jd", "Qs", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, two_pair_1.bestTwoPair)(cards);
        (0, vitest_1.expect)(result).toBeNull();
    });
    (0, vitest_1.it)("chooses higher pair as high rank", () => {
        const cards = ["9c", "9s", "Ah", "Ad", "8h"].map(parser_1.parseCard);
        const result = (0, two_pair_1.bestTwoPair)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.highRank).toBe(14); // Ace
        (0, vitest_1.expect)(result.lowRank).toBe(9); // 9
        (0, vitest_1.expect)(result.kicker.rank).toBe(8); // 8
    });
});
