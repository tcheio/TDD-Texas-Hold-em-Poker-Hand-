"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const four_1 = require("./four");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket A3 - Four of a Kind", () => {
    (0, vitest_1.it)("detects four of a kind when present", () => {
        // 7, 7, 7, 7, 3
        const cards = ["7h", "7d", "7s", "7c", "3h"].map(parser_1.parseCard);
        const result = (0, four_1.bestFourOfAKind)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.rank).toBe(7);
        (0, vitest_1.expect)(result.kicker.rank).toBe(3);
        (0, vitest_1.expect)(result.cards.length).toBe(5);
    });
    (0, vitest_1.it)("detects four of a kind with best kicker", () => {
        // 7, 7, 7, 7, 3, A
        const cards = ["7h", "7d", "7s", "7c", "3h", "Ah"].map(parser_1.parseCard);
        const result = (0, four_1.bestFourOfAKind)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.rank).toBe(7);
        (0, vitest_1.expect)(result.kicker.rank).toBe(14); // Ace
    });
    (0, vitest_1.it)("returns null when no four of a kind", () => {
        // 7, 7, 7, 3, 3, 2
        const cards = ["7h", "7d", "7s", "3c", "3h", "2d"].map(parser_1.parseCard);
        const result = (0, four_1.bestFourOfAKind)(cards);
        (0, vitest_1.expect)(result).toBeNull();
    });
});
