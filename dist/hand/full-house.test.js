"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const full_house_1 = require("./full-house");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket A3 - Full House", () => {
    (0, vitest_1.it)("detects a full house (3+2)", () => {
        // 7, 7, 7, 3, 3
        const cards = ["7h", "7d", "7s", "3c", "3h"].map(parser_1.parseCard);
        const result = (0, full_house_1.bestFullHouse)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.threeRank).toBe(7);
        (0, vitest_1.expect)(result.pairRank).toBe(3);
        (0, vitest_1.expect)(result.cards.length).toBe(5);
    });
    (0, vitest_1.it)("detects a full house (3+3)", () => {
        // K, K, K, Q, Q, Q (in 7 cards, picking best 5)
        // Here 6 cards.
        const cards = ["Kh", "Kd", "Ks", "Qc", "Qh", "Qs"].map(parser_1.parseCard);
        const result = (0, full_house_1.bestFullHouse)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.threeRank).toBe(13); // King
        (0, vitest_1.expect)(result.pairRank).toBe(12); // Queen
        (0, vitest_1.expect)(result.cards.length).toBe(5);
    });
    (0, vitest_1.it)("detects a full house (3+2) with extra cards", () => {
        // 7, 7, 7, 3, 3, 2, A
        const cards = ["7h", "7d", "7s", "3c", "3h", "2d", "Ah"].map(parser_1.parseCard);
        const result = (0, full_house_1.bestFullHouse)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.threeRank).toBe(7);
        (0, vitest_1.expect)(result.pairRank).toBe(3);
    });
    (0, vitest_1.it)("returns null when no full house", () => {
        // 7, 7, 7, 3, 2
        const cards = ["7h", "7d", "7s", "3c", "2h"].map(parser_1.parseCard);
        const result = (0, full_house_1.bestFullHouse)(cards);
        (0, vitest_1.expect)(result).toBeNull();
    });
});
