import { describe, it, expect } from "vitest";
import { bestFlush } from "./flush";
import { parseCard } from "./parser";

describe("Ticket B1 - Flush detection", () => {
  it("detects a flush when there are exactly 5 cards of the same suit", () => {
    const cards = ["Ah", "Jh", "9h", "6h", "4h"].map(parseCard);

    const res = bestFlush(cards);

    expect(res).not.toBeNull();
    expect(res!.suit).toBe("h");
    expect(res!.cards.map((c) => [c.rank, c.suit])).toEqual([
      [14, "h"],
      [11, "h"],
      [9, "h"],
      [6, "h"],
      [4, "h"],
    ]);
  });

  it("returns null when there is no flush", () => {
    const cards = ["Ah", "Jd", "9h", "6s", "4c"].map(parseCard);

    const res = bestFlush(cards);

    expect(res).toBeNull();
  });

  it("when more than 5 suited cards exist, returns the best five of that suit", () => {
    const cards = ["Ah", "Kh", "Jh", "9h", "6h", "4h", "2c"].map(parseCard);

    const res = bestFlush(cards);

    expect(res).not.toBeNull();
    expect(res!.suit).toBe("h");
    expect(res!.cards.map((c) => [c.rank, c.suit])).toEqual([
      [14, "h"],
      [13, "h"],
      [11, "h"],
      [9, "h"],
      [6, "h"],
    ]);
  });
});
