import { Card, Rank, Suit } from "./card"

const rankMap: Record<string, Rank> = {
  '2': Rank.Two,
  '3': Rank.Three,
  '4': Rank.Four,
  '5': Rank.Five,
  '6': Rank.Six,
  '7': Rank.Seven,
  '8': Rank.Eight,
  '9': Rank.Nine,
  'T': Rank.Ten,
  'J': Rank.Jack,
  'Q': Rank.Queen,
  'K': Rank.King,
  'A': Rank.Ace
}

const suitMap: Record<string, Suit> = {
  'c': Suit.Clubs,
  'd': Suit.Diamonds,
  'h': Suit.Hearts,
  's': Suit.Spades
}

export function parseCard(input: string): Card {
  if (input.length !== 2) {
    throw new Error(`Invalid card format: ${input}`)
  }

  const [rankChar, suitChar] = input

  const rank = rankMap[rankChar.toUpperCase()]
  const suit = suitMap[suitChar.toLowerCase()]

  if (!rank || !suit) {
    throw new Error(`Invalid card: ${input}`)
  }

  return new Card(rank, suit)
}
