"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestTwoPair = bestTwoPair;
function bestTwoPair(cards) {
    const rankCounts = new Map();
    for (const card of cards) {
        const arr = rankCounts.get(card.rank) ?? [];
        arr.push(card);
        rankCounts.set(card.rank, arr);
    }
    const pairs = [];
    for (const [rank, group] of rankCounts.entries()) {
        if (group.length >= 2) {
            pairs.push(rank);
        }
    }
    if (pairs.length < 2)
        return null;
    pairs.sort((a, b) => b - a);
    const highRank = pairs[0];
    const lowRank = pairs[1];
    const remaining = cards.filter(c => c.rank !== highRank && c.rank !== lowRank).sort((a, b) => b.rank - a.rank);
    const kicker = remaining[0];
    const highPairCards = rankCounts.get(highRank).slice(0, 2);
    const lowPairCards = rankCounts.get(lowRank).slice(0, 2);
    return {
        highRank,
        lowRank,
        kicker,
        cards: [...highPairCards, ...lowPairCards, kicker]
    };
}
