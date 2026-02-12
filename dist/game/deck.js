"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const card_1 = require("../core/card");
class Deck {
    constructor() {
        this.cards = [];
        this.reset();
    }
    reset() {
        this.cards = [];
        const suits = [card_1.Suit.Clubs, card_1.Suit.Diamonds, card_1.Suit.Hearts, card_1.Suit.Spades];
        const ranks = [
            card_1.Rank.Two, card_1.Rank.Three, card_1.Rank.Four, card_1.Rank.Five, card_1.Rank.Six, card_1.Rank.Seven,
            card_1.Rank.Eight, card_1.Rank.Nine, card_1.Rank.Ten, card_1.Rank.Jack, card_1.Rank.Queen, card_1.Rank.King, card_1.Rank.Ace
        ];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new card_1.Card(rank, suit));
            }
        }
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    deal(count) {
        if (this.cards.length < count) {
            throw new Error("Not enough cards in deck");
        }
        return this.cards.splice(0, count);
    }
}
exports.Deck = Deck;
