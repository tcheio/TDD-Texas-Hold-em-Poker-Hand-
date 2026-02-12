"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestHand = getBestHand;
const pair_1 = require("./pair");
const flush_1 = require("./flush");
const straight_1 = require("./straight");
const four_1 = require("./four");
const full_house_1 = require("./full-house");
const three_1 = require("./three");
const two_pair_1 = require("./two-pair");
const straightFlush_1 = require("./straightFlush");
function getBestHand(cards) {
    const sfRes = (0, straightFlush_1.bestStraightFlush)(cards);
    if (sfRes) {
        return {
            category: pair_1.Category.StraightFlush,
            cards: sfRes.cards
        };
    }
    const fourRes = (0, four_1.bestFourOfAKind)(cards);
    if (fourRes) {
        return {
            category: pair_1.Category.FourOfAKind,
            cards: fourRes.cards
        };
    }
    const fullRes = (0, full_house_1.bestFullHouse)(cards);
    if (fullRes) {
        return {
            category: pair_1.Category.FullHouse,
            cards: fullRes.cards
        };
    }
    const flushRes = (0, flush_1.bestFlush)(cards);
    if (flushRes) {
        return {
            category: pair_1.Category.Flush,
            cards: flushRes.cards
        };
    }
    const straightRes = (0, straight_1.bestStraight)(cards);
    if (straightRes) {
        return {
            category: pair_1.Category.Straight,
            cards: straightRes.cards
        };
    }
    const threeRes = (0, three_1.bestThreeOfAKind)(cards);
    if (threeRes) {
        return {
            category: pair_1.Category.ThreeOfAKind,
            cards: threeRes.cards
        };
    }
    const twoPairRes = (0, two_pair_1.bestTwoPair)(cards);
    if (twoPairRes) {
        return {
            category: pair_1.Category.TwoPair,
            cards: twoPairRes.cards
        };
    }
    const rankBased = (0, pair_1.evaluate)(cards);
    return {
        category: rankBased.category,
        cards: rankBased.cards.slice(0, 5)
    };
}
