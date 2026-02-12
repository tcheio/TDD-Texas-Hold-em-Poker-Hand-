"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderChosen5 = orderChosen5;
exports.formatCardShort = formatCardShort;
exports.formatChosen5Short = formatChosen5Short;
function orderChosen5(cards) {
    if (cards.length !== 5) {
        throw new Error(`orderChosen5 expects exactly 5 cards, got ${cards.length}`);
    }
    const straightSeq = straightSequenceIfAny(cards);
    if (straightSeq) {
        return straightSeq.map((rank) => pickDeterministicCard(cards, rank));
    }
    const groups = groupByRank(cards);
    groups.sort((a, b) => {
        if (b.count !== a.count)
            return b.count - a.count;
        return b.rank - a.rank;
    });
    const out = [];
    for (const g of groups) {
        const within = [...g.cards].sort(compareSuitAsc);
        out.push(...within);
    }
    return out;
}
function formatCardShort(card) {
    return `${rankToSymbol(card.rank)}${card.suit}`;
}
function formatChosen5Short(cards) {
    return orderChosen5(cards).map(formatCardShort);
}
function rankToSymbol(rank) {
    switch (rank) {
        case 14:
            return "A";
        case 13:
            return "K";
        case 12:
            return "Q";
        case 11:
            return "J";
        case 10:
            return "T";
        default:
            return String(rank);
    }
}
function compareSuitAsc(a, b) {
    return a.suit < b.suit ? -1 : a.suit > b.suit ? 1 : 0;
}
function pickDeterministicCard(cards, rank) {
    const candidates = cards.filter((c) => c.rank === rank);
    if (candidates.length === 0) {
        throw new Error(`Missing rank ${rank} to build ordered chosen5`);
    }
    return [...candidates].sort(compareSuitAsc)[0];
}
function groupByRank(cards) {
    const map = new Map();
    for (const c of cards) {
        const arr = map.get(c.rank) ?? [];
        arr.push(c);
        map.set(c.rank, arr);
    }
    const groups = [];
    for (const [rank, list] of map.entries()) {
        groups.push({ rank, count: list.length, cards: list });
    }
    return groups;
}
function straightSequenceIfAny(cards) {
    const ranks = [...new Set(cards.map((c) => c.rank))].sort((a, b) => b - a);
    if (ranks.length !== 5)
        return null;
    const isWheel = ranks[0] === 14 &&
        ranks.includes(5) &&
        ranks.includes(4) &&
        ranks.includes(3) &&
        ranks.includes(2);
    if (isWheel)
        return [5, 4, 3, 2, 14];
    for (let i = 0; i < 4; i++) {
        if (ranks[i] - 1 !== ranks[i + 1])
            return null;
    }
    return ranks;
}
