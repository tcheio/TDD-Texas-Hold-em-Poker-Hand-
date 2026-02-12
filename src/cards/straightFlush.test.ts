import { describe, it, expect } from "vitest";
import { bestStraightFlush } from "./straightFlush";
import { parseCard } from "./parser";

describe("Ticket B3 - Straight Flush detection", () => {
  it("detects a straight flush (non-wheel) and returns ordered cards", () => {
    const cards = ["9h", "8h", "7h", "6h", "5h", "Ac", "Kd"].map(parseCard);

    const res = bestStraightFlush(cards);

    expect(res).not.toBeNull();
    expect(res!.suit).toBe("h");
    expect(res!.high).toBe(9);
    expect(res!.cards.map((c) => [c.rank, c.suit])).toEqual([
      [9, "h"],
      [8, "h"],
      [7, "h"],
      [6, "h"],
      [5, "h"],
    ]);
  });

  it("detects a wheel straight flush (A-2-3-4-5) with high=5 and correct ordering", () => {
    const cards = ["Ac", "2c", "3c", "4c", "5c", "Kh", "9d"].map(parseCard);

    const res = bestStraightFlush(cards);

    expect(res).not.toBeNull();
    expect(res!.suit).toBe("c");
    expect(res!.high).toBe(5);
    expect(res!.cards.map((c) => [c.rank, c.suit])).toEqual([
      [5, "c"],
      [4, "c"],
      [3, "c"],
      [2, "c"],
      [14, "c"],
    ]);
  });

  it("detects the best straight flush when multiple suited straights exist", () => {
    const cards = ["9h", "8h", "7h", "6h", "5h", "4h", "2d"].map(parseCard);

    const res = bestStraightFlush(cards);

    expect(res).not.toBeNull();
    expect(res!.suit).toBe("h");
    expect(res!.high).toBe(9);
    expect(res!.cards.map((c) => [c.rank, c.suit])).toEqual([
      [9, "h"],
      [8, "h"],
      [7, "h"],
      [6, "h"],
      [5, "h"],
    ]);
  });

  it("returns null if there is a flush but no straight flush", () => {
    const cards = ["Ah", "Jh", "9h", "6h", "4h", "2c", "Kd"].map(parseCard);

    const res = bestStraightFlush(cards);

    expect(res).toBeNull();
  });

  it("returns null if there is a straight but no flush", () => {
    const cards = ["9h", "8d", "7h", "6s", "5h", "Ac", "Kd"].map(parseCard);

    const res = bestStraightFlush(cards);

    expect(res).toBeNull();
  });
});
