"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
exports.evaluate = evaluate;
exports.compare = compare;
var Category;
(function (Category) {
    Category[Category["HighCard"] = 0] = "HighCard";
    Category[Category["Pair"] = 1] = "Pair";
    Category[Category["TwoPair"] = 2] = "TwoPair";
    Category[Category["ThreeOfAKind"] = 3] = "ThreeOfAKind";
    Category[Category["Straight"] = 4] = "Straight";
    Category[Category["Flush"] = 5] = "Flush";
    Category[Category["FullHouse"] = 6] = "FullHouse";
    Category[Category["FourOfAKind"] = 7] = "FourOfAKind";
    Category[Category["StraightFlush"] = 8] = "StraightFlush";
})(Category || (exports.Category = Category = {}));
function evaluate(cards) {
    const rankCounts = new Map();
    for (const card of cards) {
        rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
    }
    const sortedCards = [...cards].sort((a, b) => {
        const countA = rankCounts.get(a.rank);
        const countB = rankCounts.get(b.rank);
        const countDiff = countB - countA;
        if (countDiff !== 0)
            return countDiff;
        return b.rank - a.rank;
    });
    const counts = Array.from(rankCounts.values());
    const maxCount = Math.max(...counts);
    const pairCount = counts.filter(c => c === 2).length;
    const tripleCount = counts.filter(c => c === 3).length;
    let category = Category.HighCard;
    if (maxCount === 4) {
        category = Category.FourOfAKind;
    }
    else if (maxCount === 3) {
        if (tripleCount >= 2 || pairCount >= 1) {
            category = Category.FullHouse;
        }
        else {
            category = Category.ThreeOfAKind;
        }
    }
    else if (maxCount === 2) {
        if (pairCount >= 2) {
            category = Category.TwoPair;
        }
        else {
            category = Category.Pair;
        }
    }
    return {
        category,
        cards: sortedCards
    };
}
function compare(a, b) {
    if (a.category !== b.category) {
        return a.category - b.category;
    }
    return compareRankVector(a.cards, b.cards);
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
