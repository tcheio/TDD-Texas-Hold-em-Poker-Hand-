"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCard = parseCard;
const card_1 = require("./card");
const rankMap = {
    '2': card_1.Rank.Two,
    '3': card_1.Rank.Three,
    '4': card_1.Rank.Four,
    '5': card_1.Rank.Five,
    '6': card_1.Rank.Six,
    '7': card_1.Rank.Seven,
    '8': card_1.Rank.Eight,
    '9': card_1.Rank.Nine,
    'T': card_1.Rank.Ten,
    'J': card_1.Rank.Jack,
    'Q': card_1.Rank.Queen,
    'K': card_1.Rank.King,
    'A': card_1.Rank.Ace
};
const suitMap = {
    'c': card_1.Suit.Clubs,
    'd': card_1.Suit.Diamonds,
    'h': card_1.Suit.Hearts,
    's': card_1.Suit.Spades
};
function parseCard(input) {
    if (input.length !== 2) {
        throw new Error(`Invalid card format: ${input}`);
    }
    const [rankChar, suitChar] = input;
    const rank = rankMap[rankChar.toUpperCase()];
    const suit = suitMap[suitChar.toLowerCase()];
    if (!rank || !suit) {
        throw new Error(`Invalid card: ${input}`);
    }
    return new card_1.Card(rank, suit);
}
