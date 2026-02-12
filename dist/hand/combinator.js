"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinationsOf5From7 = combinationsOf5From7;
exports.pickBest5 = pickBest5;
exports.compareScoreVector = compareScoreVector;
function combinationsOf5From7(cards7) {
    if (cards7.length !== 7) {
        throw new Error(`combinationsOf5From7 expects exactly 7 cards, got ${cards7.length}`);
    }
    const res = [];
    for (let a = 0; a < 7 - 4; a++) {
        for (let b = a + 1; b < 7 - 3; b++) {
            for (let c = b + 1; c < 7 - 2; c++) {
                for (let d = c + 1; d < 7 - 1; d++) {
                    for (let e = d + 1; e < 7; e++) {
                        res.push([cards7[a], cards7[b], cards7[c], cards7[d], cards7[e]]);
                    }
                }
            }
        }
    }
    return res;
}
function pickBest5(cards7, evaluate5, compareScore) {
    if (cards7.length !== 7) {
        throw new Error(`pickBest5 expects exactly 7 cards, got ${cards7.length}`);
    }
    const combos = combinationsOf5From7(cards7);
    let best5 = null;
    let bestScore = null;
    for (const c5 of combos) {
        const score = evaluate5(c5);
        if (bestScore === null || compareScore(score, bestScore) > 0) {
            bestScore = score;
            best5 = c5;
        }
    }
    return { best5: best5, score: bestScore };
}
function compareScoreVector(a, b) {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        const diff = a[i] - b[i];
        if (diff !== 0)
            return diff;
    }
    return a.length - b.length;
}
