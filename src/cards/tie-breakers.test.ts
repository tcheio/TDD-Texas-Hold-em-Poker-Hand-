import { describe, it, expect } from "vitest";
import { comparePlayers, Winner } from "./showdown";
import { parseCard } from "./parser";

function parseCards(input: string[]): any[] {
  return input.map(parseCard);
}

describe("Ticket A5 - Complex Tie-Breakers", () => {
  it("Flush vs Flush (High Card)", () => {
    // P1: Ah 9h
    // P2: Kh Qh
    // Board: 2h 4h 6h 8c 9d
    // P1: Ah 9h 6h 4h 2h (Ace High Flush)
    // P2: Kh Qh 6h 4h 2h (King High Flush)
    // P1 wins
    const p1 = parseCards(["Ah", "9h"]);
    const p2 = parseCards(["Kh", "Qh"]);
    const board = parseCards(["2h", "4h", "6h", "8c", "9d"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });

  it("Flush vs Flush (Kicker)", () => {
    // P1: Ah 9h
    // P2: Ah 8h
    // Board: 2h 4h 6h 8c 9d
    // P1: Ah 9h 6h 4h 2h
    // P2: Ah 8h 6h 4h 2h -> Wait, P2 has 8h? No board has 8c.
    // If P2 has 8h, board has 8c.
    // P1: A, 9, 6, 4, 2
    // P2: A, 8, 6, 4, 2
    // P1 wins by 2nd card.
    const p1 = parseCards(["Ah", "9h"]);
    const p2 = parseCards(["Ah", "8h"]);
    const board = parseCards(["2h", "4h", "6h", "8c", "9d"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });

  it("Straight vs Straight (High End)", () => {
    // P1: T 9
    // P2: 6 5
    // Board: 7 8 A K 2
    // P1: T 9 8 7 (No, needs 5 cards). 
    // Board: 7, 8. P1 has T, 9. Needs J or 6.
    // Let's make Board: 6 7 8 A K
    // P1: T 9 8 7 6 (Straight 6-T)
    // P2: 8 7 6 5 (Needs 4 or 9). 
    // Let's make Board: 4 5 6 7 8
    // P1: 9 T -> 6 7 8 9 T (Straight 6-T)
    // P2: 2 3 -> 4 5 6 7 8 (Straight 4-8)
    // P1 wins.
    const p1 = parseCards(["9s", "Th"]);
    const p2 = parseCards(["2c", "3d"]);
    const board = parseCards(["4h", "5d", "6s", "7c", "8h"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });

  it("Counterfeited Two Pair (Split)", () => {
    // P1: 3 3
    // P2: 2 2
    // Board: A A K K Q
    // P1: A A K K Q (Two Pair)
    // P2: A A K K Q (Two Pair)
    // Split
    const p1 = parseCards(["3s", "3d"]);
    const p2 = parseCards(["2c", "2h"]);
    const board = parseCards(["Ah", "Ad", "Ks", "Kd", "Qh"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Split);
  });

  it("Counterfeited Two Pair (Kicker Plays)", () => {
    // P1: Q Q
    // P2: J J
    // Board: A A K K 5
    // P1: A A K K Q (Two Pair, Q kicker)
    // P2: A A K K J (Two Pair, J kicker) (J J is pairs, but A A K K is better Two Pair. 5th card is J)
    // Wait. P2 has J J. Board A A K K.
    // Best 5 for P2: A A K K J (The J pair is broken to use one J as kicker? No, the J pair is a pair. But we can only use 2 pairs. A and K are higher. So we use A A K K. The 5th card is max(J, J, 5) = J).
    // So P2 has A A K K J.
    // P1 has A A K K Q.
    // P1 wins.
    const p1 = parseCards(["Qs", "Qd"]);
    const p2 = parseCards(["Jc", "Jh"]);
    const board = parseCards(["Ah", "Ad", "Ks", "Kd", "5h"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });

  it("Four of a Kind Kicker", () => {
    // P1: K 2
    // P2: K 3
    // Board: A A A A 5
    // P1: A A A A K
    // P2: A A A A K
    // Split (Both have same hand). 2 and 3 are ignored (6th card).
    const p1 = parseCards(["Kh", "2c"]);
    const p2 = parseCards(["Kd", "3s"]);
    const board = parseCards(["Ah", "Ad", "As", "Ac", "5h"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Split);
  });

  it("Four of a Kind Kicker (Winner)", () => {
    // P1: K 2
    // P2: Q 3
    // Board: A A A A 5
    // P1: A A A A K
    // P2: A A A A Q
    // P1 wins.
    const p1 = parseCards(["Kh", "2c"]);
    const p2 = parseCards(["Qd", "3s"]);
    const board = parseCards(["Ah", "Ad", "As", "Ac", "5h"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });
});
