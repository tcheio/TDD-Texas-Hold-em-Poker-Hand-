import { Card, Rank } from "../core/card";

export enum Category {
  HighCard = 0,
  Pair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  Straight = 4,
  Flush = 5,
  FullHouse = 6,
  FourOfAKind = 7,
  StraightFlush = 8,
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

  const sortedCards = [...cards].sort((a, b) => {
    const countA = rankCounts.get(a.rank)!;
    const countB = rankCounts.get(b.rank)!;

    const countDiff = countB - countA;
    if (countDiff !== 0) return countDiff;

    return b.rank - a.rank;
  });

  const counts = Array.from(rankCounts.values());
  const maxCount = Math.max(...counts);
  const pairCount = counts.filter(c => c === 2).length;
  const tripleCount = counts.filter(c => c === 3).length;

  let category = Category.HighCard;

  if (maxCount === 4) {
    category = Category.FourOfAKind;
  } else if (maxCount === 3) {
    if (tripleCount >= 2 || pairCount >= 1) {
      category = Category.FullHouse;
    } else {
      category = Category.ThreeOfAKind;
    }
  } else if (maxCount === 2) {
    if (pairCount >= 2) {
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
