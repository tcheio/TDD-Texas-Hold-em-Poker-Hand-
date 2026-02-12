"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const chosen5_1 = require("./chosen5");
const parser_1 = require("../core/parser");
(0, vitest_1.describe)("Ticket B4 - Chosen5 formatting / ordering", () => {
    (0, vitest_1.it)("orders a wheel straight as 5,4,3,2,A", () => {
        const chosen = ["Ac", "2d", "3h", "4s", "5c"].map(parser_1.parseCard);
        const ordered = (0, chosen5_1.orderChosen5)(chosen);
        (0, vitest_1.expect)(ordered.map((c) => [c.rank, c.suit])).toEqual([
            [5, "c"],
            [4, "s"],
            [3, "h"],
            [2, "d"],
            [14, "c"],
        ]);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["5c", "4s", "3h", "2d", "Ac"]);
    });
    (0, vitest_1.it)("orders one pair as: pair first, then kickers desc", () => {
        const chosen = ["9c", "9d", "Ah", "Ks", "2c"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["9c", "9d", "Ah", "Ks", "2c"]);
    });
    (0, vitest_1.it)("orders two pair as: higher pair, lower pair, kicker", () => {
        const chosen = ["Kc", "Kd", "Ac", "Ad", "2h"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["Ac", "Ad", "Kc", "Kd", "2h"]);
    });
    (0, vitest_1.it)("orders three of a kind as: trips first, then kickers desc", () => {
        const chosen = ["7c", "7d", "7h", "9s", "Ah"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["7c", "7d", "7h", "Ah", "9s"]);
    });
    (0, vitest_1.it)("orders four of a kind as: quads first, then kicker", () => {
        const chosen = ["4c", "4d", "4h", "4s", "Ah"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["4c", "4d", "4h", "4s", "Ah"]);
    });
    (0, vitest_1.it)("orders full house as: trips first, then pair", () => {
        const chosen = ["8c", "8d", "8h", "Kc", "Kd"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["8c", "8d", "8h", "Kc", "Kd"]);
    });
    (0, vitest_1.it)("orders high card / flush-like as ranks desc", () => {
        const chosen = ["Ah", "Jd", "9c", "6s", "4h"].map(parser_1.parseCard);
        (0, vitest_1.expect)((0, chosen5_1.formatChosen5Short)(chosen)).toEqual(["Ah", "Jd", "9c", "6s", "4h"]);
    });
});
