"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const three_1 = require("./three");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket A2 - Three of a Kind", () => {
    (0, vitest_1.it)("detects three of a kind when present", () => {
        const cards = ["Jh", "Jd", "Js", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, three_1.bestThreeOfAKind)(cards);
        (0, vitest_1.expect)(result).not.toBeNull();
        (0, vitest_1.expect)(result.rank).toBe(11);
        (0, vitest_1.expect)(result.kickers.map(c => c.rank)).toEqual([9, 8]);
    });
    (0, vitest_1.it)("returns null when no three of a kind", () => {
        const cards = ["Jh", "Jd", "Qs", "9c", "8h"].map(parser_1.parseCard);
        const result = (0, three_1.bestThreeOfAKind)(cards);
        (0, vitest_1.expect)(result).toBeNull();
    });
});
