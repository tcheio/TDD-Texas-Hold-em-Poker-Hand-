import { Card, Rank } from "./card";

export interface FourOfAKind {
  rank: Rank;
  kicker: Card;
  cards: Card[];
}

export function bestFourOfAKind(cards: readonly Card[]): FourOfAKind | null {
  const rankCounts = new Map<Rank, Card[]>();
  for (const card of cards) {
    const arr = rankCounts.get(card.rank) ?? [];
    arr.push(card);
    rankCounts.set(card.rank, arr);
  }

  let bestRank: Rank | null = null;
  
  for (const [rank, group] of rankCounts.entries()) {
    if (group.length >= 4) {
      // In a standard deck, max 1 quad is possible in <= 7 cards.
      // But if we support > 7 cards or multiple decks, we should take the highest.
      if (!bestRank || rank > bestRank) {
        bestRank = rank;
      }
    }
  }

  if (!bestRank) return null;

  const quads = rankCounts.get(bestRank)!.slice(0, 4);
  
  // Find best kicker
  const remaining = cards.filter(c => c.rank !== bestRank).sort((a, b) => b.rank - a.rank);
  
  if (remaining.length === 0) {
      // Should not happen in standard 5+ card hand if we look for 5 cards, unless we have exactly 4 cards passed?
      // But the function expects 5 cards output.
      // If only 4 cards provided and they are quads, we can't form a 5 card hand.
      // Assume input >= 5 cards for valid hand.
      return null;
  }
  
  const kicker = remaining[0];
  
  return {
    rank: bestRank,
    kicker,
    cards: [...quads, kicker]
  };
}
