import { Card, Rank } from "./card";

export function bestThreeOfAKind(cards: readonly Card[]): { rank: Rank; kickers: Card[]; cards: Card[] } | null {
  const rankCounts = new Map<Rank, Card[]>();
  for (const card of cards) {
    const arr = rankCounts.get(card.rank) ?? [];
    arr.push(card);
    rankCounts.set(card.rank, arr);
  }

  let best: { rank: Rank; kickers: Card[]; cards: Card[] } | null = null;

  for (const [rank, group] of rankCounts.entries()) {
    if (group.length < 3) continue;

    const remaining = cards.filter(c => c.rank !== rank).sort((a, b) => b.rank - a.rank);
    const kickers = remaining.slice(0, 2);
    const trips = group.slice(0, 3);
    
    if (!best || rank > best.rank) {
      best = { rank, kickers, cards: [...trips, ...kickers] };
    }
  }

  return best;
}
