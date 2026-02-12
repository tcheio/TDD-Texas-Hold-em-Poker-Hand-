"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestFlush = bestFlush;
function bestFlush(cards) {
    const bySuit = new Map();
    for (const c of cards) {
        const arr = bySuit.get(c.suit) ?? [];
        arr.push(c);
        bySuit.set(c.suit, arr);
    }
    let best = null;
    for (const [suit, suitedCards] of bySuit.entries()) {
        if (suitedCards.length < 5)
            continue;
        const sorted = [...suitedCards].sort(compareRankDesc);
        const top5 = sorted.slice(0, 5);
        if (!best) {
            best = { suit, cards: top5 };
            continue;
        }
        if (compareRankVector(top5, best.cards) > 0) {
            best = { suit, cards: top5 };
        }
    }
    return best;
}
function compareRankDesc(a, b) {
    return b.rank - a.rank;
}
function compareRankVector(a, b) {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        const diff = a[i].rank - b[i].rank;
        if (diff !== 0)
            return diff;
    }
    return a.length - b.length;
}
