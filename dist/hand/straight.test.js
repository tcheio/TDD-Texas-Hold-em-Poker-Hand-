"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const straight_1 = require("./straight");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket B2 - Straight detection", () => {
    (0, vitest_1.it)("detects Ace-low straight (wheel A-2-3-4-5) with high=5 and correct ordering", () => {
        const cards = ["Ac", "2d", "3h", "4s", "9d", "5c", "Kd"].map(parser_1.parseCard);
        const res = (0, straight_1.bestStraight)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.high).toBe(5);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [5, "c"],
            [4, "s"],
            [3, "h"],
            [2, "d"],
            [14, "c"],
        ]);
    });
    (0, vitest_1.it)("detects Ace-high straight (10-J-Q-K-A) with high=14 and correct ordering", () => {
        const cards = ["Tc", "Jd", "Qh", "Ks", "2d", "Ac", "3d"].map(parser_1.parseCard);
        const res = (0, straight_1.bestStraight)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.high).toBe(14);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [14, "c"],
            [13, "s"],
            [12, "h"],
            [11, "d"],
            [10, "c"],
        ]);
    });
    (0, vitest_1.it)("does not allow wrap-around straights (Q-K-A-2-3 is invalid)", () => {
        const cards = ["Qh", "Ks", "Ac", "2d", "3d", "9c", "7s"].map(parser_1.parseCard);
        const res = (0, straight_1.bestStraight)(cards);
        (0, vitest_1.expect)(res).toBeNull();
    });
    (0, vitest_1.it)("chooses the best straight when multiple are possible", () => {
        const cards = ["5c", "6d", "7h", "8s", "9d", "Tc", "2h"].map(parser_1.parseCard);
        const res = (0, straight_1.bestStraight)(cards);
        (0, vitest_1.expect)(res).not.toBeNull();
        (0, vitest_1.expect)(res.high).toBe(10);
        (0, vitest_1.expect)(res.cards.map((c) => [c.rank, c.suit])).toEqual([
            [10, "c"],
            [9, "d"],
            [8, "s"],
            [7, "h"],
            [6, "d"],
        ]);
    });
    (0, vitest_1.it)("returns null when there is no straight", () => {
        const cards = ["Ah", "Jd", "9h", "6s", "4c", "2d", "Kd"].map(parser_1.parseCard);
        const res = (0, straight_1.bestStraight)(cards);
        (0, vitest_1.expect)(res).toBeNull();
    });
});
