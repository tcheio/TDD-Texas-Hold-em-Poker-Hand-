import { describe, it, expect } from "vitest";
import { bestFourOfAKind } from "./four";
import { parseCard } from "../core/parser";

describe("Ticket A3 - Four of a Kind", () => {
  it("detects four of a kind when present", () => {
    // 7, 7, 7, 7, 3
    const cards = ["7h", "7d", "7s", "7c", "3h"].map(parseCard);
    const result = bestFourOfAKind(cards);

    expect(result).not.toBeNull();
    expect(result!.rank).toBe(7);
    expect(result!.kicker.rank).toBe(3);
    expect(result!.cards.length).toBe(5);
  });

  it("detects four of a kind with best kicker", () => {
    // 7, 7, 7, 7, 3, A
    const cards = ["7h", "7d", "7s", "7c", "3h", "Ah"].map(parseCard);
    const result = bestFourOfAKind(cards);

    expect(result).not.toBeNull();
    expect(result!.rank).toBe(7);
    expect(result!.kicker.rank).toBe(14); // Ace
  });

  it("returns null when no four of a kind", () => {
    // 7, 7, 7, 3, 3, 2
    const cards = ["7h", "7d", "7s", "3c", "3h", "2d"].map(parseCard);
    const result = bestFourOfAKind(cards);

    expect(result).toBeNull();
  });
});
