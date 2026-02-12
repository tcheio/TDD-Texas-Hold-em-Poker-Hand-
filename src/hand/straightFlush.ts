import type { Card, Suit } from "./card";
import { bestStraight } from "./straight";

export function bestStraightFlush(
  cards: readonly Card[]
): { suit: Suit; high: number; cards: Card[] } | null {
  if (cards.length < 5) return null;

  const bySuit = new Map<Suit, Card[]>();
  for (const c of cards) {
    const arr = bySuit.get(c.suit) ?? [];
    arr.push(c);
    bySuit.set(c.suit, arr);
  }

  let best: { suit: Suit; high: number; cards: Card[] } | null = null;

  for (const [suit, suited] of bySuit.entries()) {
    if (suited.length < 5) continue;

    const straight = bestStraight(suited);
    if (!straight) continue;

    const candidate = { suit, high: straight.high, cards: straight.cards };

    if (!best || candidate.high > best.high) {
      best = candidate;
    }
  }

  return best;
}
