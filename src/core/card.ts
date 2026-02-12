export enum Suit {
  Clubs = 'c',
  Diamonds = 'd',
  Hearts = 'h',
  Spades = 's'
}

export enum Rank {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14
}

export class Card {
  constructor(
    public readonly rank: Rank,
    public readonly suit: Suit
  ) {}

  compare(other: Card): number {
    return this.rank - other.rank
  }

  toString(): string {
    return `${Rank[this.rank]} of ${this.suit}`
  }
}
