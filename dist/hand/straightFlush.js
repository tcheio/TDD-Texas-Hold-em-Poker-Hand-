"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestStraightFlush = bestStraightFlush;
const straight_1 = require("./straight");
function bestStraightFlush(cards) {
    if (cards.length < 5)
        return null;
    const bySuit = new Map();
    for (const c of cards) {
        const arr = bySuit.get(c.suit) ?? [];
        arr.push(c);
        bySuit.set(c.suit, arr);
    }
    let best = null;
    for (const [suit, suited] of bySuit.entries()) {
        if (suited.length < 5)
            continue;
        const straight = (0, straight_1.bestStraight)(suited);
        if (!straight)
            continue;
        const candidate = { suit, high: straight.high, cards: straight.cards };
        if (!best || candidate.high > best.high) {
            best = candidate;
        }
    }
    return best;
}
