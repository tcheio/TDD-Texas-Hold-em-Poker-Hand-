import { Card, Rank } from "./card";

export enum Category {
  HighCard = 0,
  Pair = 1,
}

export interface Hand {
  category: Category;
  cards: Card[];
}

export function evaluate(cards: readonly Card[]): Hand {
  const rankCounts = new Map<Rank, number>();
  for (const card of cards) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
  }

  // Sort the cards based on the count of their rank, then by rank value
  const sortedCards = [...cards].sort((a, b) => {
    const countA = rankCounts.get(a.rank)!;
    const countB = rankCounts.get(b.rank)!;
    const countDiff = countB - countA;
    if (countDiff !== 0) return countDiff;
    return b.rank - a.rank;
  });

  // Determine category
  // For 5 cards, if we have a pair, the max count is 2.
  // Note: Two Pair, 3 of a kind etc are not yet handled.
  const maxCount = Math.max(...rankCounts.values());
  const category = maxCount === 2 ? Category.Pair : Category.HighCard;

  return {
    category,
    cards: sortedCards
  };
}

export function compare(a: Hand, b: Hand): number {
  if (a.category !== b.category) {
    return a.category - b.category;
  }
  return compareRankVector(a.cards, b.cards);
}

function compareRankDesc(a: Card, b: Card): number {
  return b.rank - a.rank;
}

function compareRankVector(a: readonly Card[], b: readonly Card[]): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const diff = a[i].rank - b[i].rank;
    if (diff !== 0) return diff;
  }
  return a.length - b.length;
}
