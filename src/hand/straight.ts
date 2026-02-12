import type { Card } from "./card";

export function bestStraight(cards: readonly Card[]): { high: number; cards: Card[] } | null {
  if (cards.length < 5) return null;

  const ranksPresent = new Set<number>();
  for (const c of cards) ranksPresent.add(c.rank);

  const hasStraightFromHigh = (high: number): boolean => {
    for (let r = high; r >= high - 4; r--) {
      if (!ranksPresent.has(r)) return false;
    }
    return true;
  };

  for (let high = 14; high >= 5; high--) {
    if (high === 5) {
      const wheel =
        ranksPresent.has(14) &&
        ranksPresent.has(2) &&
        ranksPresent.has(3) &&
        ranksPresent.has(4) &&
        ranksPresent.has(5);

      if (wheel) {
        const seq = [5, 4, 3, 2, 14];
        return { high: 5, cards: seq.map((r) => pickDeterministicCard(cards, r)) };
      }

      continue;
    }

    if (!hasStraightFromHigh(high)) continue;

    const seq = [high, high - 1, high - 2, high - 3, high - 4];
    return { high, cards: seq.map((r) => pickDeterministicCard(cards, r)) };
  }

  return null;
}

function pickDeterministicCard(cards: readonly Card[], rank: number): Card {
  const candidates = cards.filter((c) => c.rank === rank);
  if (candidates.length === 0) {
    throw new Error(`No card found for required straight rank ${rank}`);
  }
  return [...candidates].sort((a, b) => (a.suit < b.suit ? -1 : a.suit > b.suit ? 1 : 0))[0];
}
