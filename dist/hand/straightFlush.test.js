"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const straightFlush_1 = require("./straightFlush");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket B3 - Straight Flush detection", () => {
    (0, vitest_1.it)("detects a straight flush (non-wheel) and returns ordered cards", () => {
        const cards = ["9h", "8h", "7h", "6h", "5h", "Ac", "Kd"].map(parser_1.parseCard);
        const res = (0, straightFlush_1.bestStraightFlush)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.suit).toBe("h");
        (0, vitest_1.expect)(res.high).toBe(9);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [9, "h"],
            [8, "h"],
            [7, "h"],
            [6, "h"],
            [5, "h"],
        ]);
    });
    (0, vitest_1.it)("detects a wheel straight flush (A-2-3-4-5) with high=5 and correct ordering", () => {
        const cards = ["Ac", "2c", "3c", "4c", "5c", "Kh", "9d"].map(parser_1.parseCard);
        const res = (0, straightFlush_1.bestStraightFlush)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.suit).toBe("c");
        (0, vitest_1.expect)(res.high).toBe(5);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [5, "c"],
            [4, "c"],
            [3, "c"],
            [2, "c"],
            [14, "c"],
        ]);
    });
    (0, vitest_1.it)("detects the best straight flush when multiple suited straights exist", () => {
        const cards = ["9h", "8h", "7h", "6h", "5h", "4h", "2d"].map(parser_1.parseCard);
        const res = (0, straightFlush_1.bestStraightFlush)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.suit).toBe("h");
        (0, vitest_1.expect)(res.high).toBe(9);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [9, "h"],
            [8, "h"],
            [7, "h"],
            [6, "h"],
            [5, "h"],
        ]);
    });
    (0, vitest_1.it)("returns null if there is a flush but no straight flush", () => {
        const cards = ["Ah", "Jh", "9h", "6h", "4h", "2c", "Kd"].map(parser_1.parseCard);
        const res = (0, straightFlush_1.bestStraightFlush)(cards);
        (0, vitest_1.expect)(res).toBeNull();
    });
    (0, vitest_1.it)("returns null if there is a straight but no flush", () => {
        const cards = ["9h", "8d", "7h", "6s", "5h", "Ac", "Kd"].map(parser_1.parseCard);
        const res = (0, straightFlush_1.bestStraightFlush)(cards);
        (0, vitest_1.expect)(res).toBeNull();
    });
});
