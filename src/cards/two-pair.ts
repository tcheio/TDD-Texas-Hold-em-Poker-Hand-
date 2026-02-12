import { Card, Rank } from "./card";

export function bestTwoPair(cards: readonly Card[]): { highRank: Rank; lowRank: Rank; kicker: Card } | null {
  const rankCounts = new Map<Rank, Card[]>();
  for (const card of cards) {
    const arr = rankCounts.get(card.rank) ?? [];
    arr.push(card);
    rankCounts.set(card.rank, arr);
  }

  const pairs: Rank[] = [];
  for (const [rank, group] of rankCounts.entries()) {
    if (group.length >= 2) {
      pairs.push(rank);
    }
  }

  if (pairs.length < 2) return null;

  // Sort pairs descending
  pairs.sort((a, b) => b - a);

  const highRank = pairs[0];
  const lowRank = pairs[1];

  // Find kicker: best card not in the two pairs
  // Note: if one of the pairs was actually a set of 3 (in 7 cards), we use 2 of them.
  // The kicker should not be any of the cards used in the pairs.
  // In 5 cards, this is simple.
  
  const remaining = cards.filter(c => c.rank !== highRank && c.rank !== lowRank).sort((a, b) => b.rank - a.rank);
  
  // If we have 3 pairs (in 7 cards), the 3rd pair's cards are candidates for kicker.
  const kicker = remaining[0];
  
  return { highRank, lowRank, kicker };
}
