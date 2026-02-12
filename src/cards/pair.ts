import { Card, Rank } from "./card";

export enum Category {
  HighCard = 0,
  Pair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
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
    
    // Sort by count (descending)
    const countDiff = countB - countA;
    if (countDiff !== 0) return countDiff;
    
    // Sort by rank (descending)
    return b.rank - a.rank;
  });

  // Determine category
  const counts = Array.from(rankCounts.values());
  const maxCount = Math.max(...counts);
  const pairCount = counts.filter(c => c === 2).length;

  let category = Category.HighCard;
  if (maxCount === 3) {
    category = Category.ThreeOfAKind;
  } else if (maxCount === 2) {
    if (pairCount === 2) {
      category = Category.TwoPair;
    } else {
      category = Category.Pair;
    }
  }

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

function compareRankVector(a: readonly Card[], b: readonly Card[]): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const diff = a[i].rank - b[i].rank;
    if (diff !== 0) return diff;
  }
  return a.length - b.length;
}
