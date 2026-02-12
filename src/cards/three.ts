import { Card, Rank } from "./card";

export function bestThreeOfAKind(cards: readonly Card[]): { rank: Rank; kickers: Card[] } | null {
  const rankCounts = new Map<Rank, Card[]>();
  for (const card of cards) {
    const arr = rankCounts.get(card.rank) ?? [];
    arr.push(card);
    rankCounts.set(card.rank, arr);
  }

  let best: { rank: Rank; kickers: Card[] } | null = null;

  for (const [rank, group] of rankCounts.entries()) {
    if (group.length < 3) continue;

    // We have at least 3 cards of this rank.
    // Kickers are the best 2 other cards.
    const remaining = cards.filter(c => c.rank !== rank).sort((a, b) => b.rank - a.rank);
    const kickers = remaining.slice(0, 2);
    
    // Create the hand with the 3 cards + 2 kickers
    // But wait, the return type asks for rank and kickers.
    // The "best" three of a kind is the one with highest rank.
    // If multiple (e.g. 2 sets of 3 in 7 cards - extremely rare/impossible in 5 cards, but possible in 7), 
    // we pick the highest rank.
    
    if (!best || rank > best.rank) {
      best = { rank, kickers };
    }
  }

  return best;
}
