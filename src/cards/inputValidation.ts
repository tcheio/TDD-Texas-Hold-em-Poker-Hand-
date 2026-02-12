import type { Card } from "./card";

export class DuplicateCardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateCardError";
  }
}

export function cardKey(card: Card): string {
  return `${card.rank}-${String(card.suit)}`;
}

export function assertNoDuplicateCards(cards: readonly Card[], context = "cards"): void {
  const seen = new Set<string>();
  const duplicates: string[] = [];

  for (const c of cards) {
    const k = cardKey(c);
    if (seen.has(k)) duplicates.push(k);
    else seen.add(k);
  }

  if (duplicates.length > 0) {
    duplicates.sort();
    throw new DuplicateCardError(
      `Duplicate card(s) detected in ${context}: ${duplicates.join(", ")}`
    );
  }
}

export function assertValidHoldemInput(board: readonly Card[], hole: readonly Card[]): void {
  if (board.length !== 5) {
    throw new Error(`board must contain 5 cards, got ${board.length}`);
  }
  if (hole.length !== 2) {
    throw new Error(`hole must contain 2 cards, got ${hole.length}`);
  }

  assertNoDuplicateCards([...board, ...hole], "board+hole");
}

export function assertValidHoldemTable(
  board: readonly Card[],
  playersHoles: readonly (readonly Card[])[]
): void {
  if (board.length !== 5) {
    throw new Error(`board must contain 5 cards, got ${board.length}`);
  }
  for (let i = 0; i < playersHoles.length; i++) {
    if (playersHoles[i].length !== 2) {
      throw new Error(`player ${i} hole must contain 2 cards, got ${playersHoles[i].length}`);
    }
  }

  const all: Card[] = [...board];
  for (const hole of playersHoles) all.push(...hole);

  assertNoDuplicateCards(all, "board+players");
}
