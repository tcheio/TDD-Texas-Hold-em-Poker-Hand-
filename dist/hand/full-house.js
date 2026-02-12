"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestFullHouse = bestFullHouse;
function bestFullHouse(cards) {
    const rankCounts = new Map();
    for (const card of cards) {
        const arr = rankCounts.get(card.rank) ?? [];
        arr.push(card);
        rankCounts.set(card.rank, arr);
    }
    const triples = [];
    const pairs = [];
    for (const [rank, group] of rankCounts.entries()) {
        if (group.length >= 3) {
            triples.push(rank);
        }
        if (group.length >= 2) {
            pairs.push(rank);
        }
    }
    // Sort triples descending
    triples.sort((a, b) => b - a);
    if (triples.length === 0)
        return null;
    const threeRank = triples[0];
    // Find the best pair excluding the threeRank
    // Note: pairs includes triples too (since count >= 2 covers >= 3).
    // We just need the highest pair rank that is not threeRank.
    pairs.sort((a, b) => b - a);
    const pairRank = pairs.find(r => r !== threeRank);
    if (!pairRank)
        return null;
    // Construct the hand
    const tCards = rankCounts.get(threeRank).slice(0, 3);
    const pCards = rankCounts.get(pairRank).slice(0, 2);
    return {
        threeRank,
        pairRank,
        cards: [...tCards, ...pCards]
    };
}
