"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const card_1 = require("./card");
const parser_1 = require("./parser");
(0, vitest_1.describe)('parseCard', () => {
    (0, vitest_1.it)('parses Ace of Hearts (Ah)', () => {
        const card = (0, parser_1.parseCard)('Ah');
        (0, vitest_1.expect)(card.rank).toBe(card_1.Rank.Ace);
        (0, vitest_1.expect)(card.suit).toBe(card_1.Suit.Hearts);
    });
    (0, vitest_1.it)('parses Ten of Diamonds (Td)', () => {
        const card = (0, parser_1.parseCard)('Td');
        (0, vitest_1.expect)(card.rank).toBe(card_1.Rank.Ten);
        (0, vitest_1.expect)(card.suit).toBe(card_1.Suit.Diamonds);
    });
    (0, vitest_1.it)('is case insensitive', () => {
        const card = (0, parser_1.parseCard)('aH');
        (0, vitest_1.expect)(card.rank).toBe(card_1.Rank.Ace);
        (0, vitest_1.expect)(card.suit).toBe(card_1.Suit.Hearts);
    });
    (0, vitest_1.it)('throws if format is invalid length', () => {
        (0, vitest_1.expect)(() => (0, parser_1.parseCard)('AAA')).toThrow();
        (0, vitest_1.expect)(() => (0, parser_1.parseCard)('A')).toThrow();
    });
    (0, vitest_1.it)('throws if rank is invalid', () => {
        (0, vitest_1.expect)(() => (0, parser_1.parseCard)('Xh')).toThrow();
    });
    (0, vitest_1.it)('throws if suit is invalid', () => {
        (0, vitest_1.expect)(() => (0, parser_1.parseCard)('Ax')).toThrow();
    });
});
