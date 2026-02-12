"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.Rank = exports.Suit = void 0;
var Suit;
(function (Suit) {
    Suit["Clubs"] = "c";
    Suit["Diamonds"] = "d";
    Suit["Hearts"] = "h";
    Suit["Spades"] = "s";
})(Suit || (exports.Suit = Suit = {}));
var Rank;
(function (Rank) {
    Rank[Rank["Two"] = 2] = "Two";
    Rank[Rank["Three"] = 3] = "Three";
    Rank[Rank["Four"] = 4] = "Four";
    Rank[Rank["Five"] = 5] = "Five";
    Rank[Rank["Six"] = 6] = "Six";
    Rank[Rank["Seven"] = 7] = "Seven";
    Rank[Rank["Eight"] = 8] = "Eight";
    Rank[Rank["Nine"] = 9] = "Nine";
    Rank[Rank["Ten"] = 10] = "Ten";
    Rank[Rank["Jack"] = 11] = "Jack";
    Rank[Rank["Queen"] = 12] = "Queen";
    Rank[Rank["King"] = 13] = "King";
    Rank[Rank["Ace"] = 14] = "Ace";
})(Rank || (exports.Rank = Rank = {}));
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    compare(other) {
        return this.rank - other.rank;
    }
    toString() {
        const suitIcons = {
            [Suit.Clubs]: '♣️',
            [Suit.Diamonds]: '♦️',
            [Suit.Hearts]: '♥️',
            [Suit.Spades]: '♠️'
        };
        const rankStr = {
            14: 'A', 13: 'K', 12: 'Q', 11: 'J', 10: '10',
            9: '9', 8: '8', 7: '7', 6: '6', 5: '5', 4: '4', 3: '3', 2: '2'
        };
        return `${rankStr[this.rank]}${suitIcons[this.suit]}`;
    }
}
exports.Card = Card;
