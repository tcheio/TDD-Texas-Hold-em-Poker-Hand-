import { describe, it, expect } from "vitest";
import { comparePlayers, Winner } from "./showdown";
import { parseCard } from "./parser";

function parseCards(input: string[]): any[] {
  return input.map(parseCard);
}

describe("Ticket A4 - Compare Players", () => {
  it("Player 1 wins with Higher Pair", () => {
    // P1: AA, P2: KK, Board: 2 3 4 5 9
    const p1 = parseCards(["Ah", "Ad"]);
    const p2 = parseCards(["Kh", "Kd"]);
    const board = parseCards(["2s", "3c", "4h", "5d", "9s"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });

  it("Player 2 wins with Flush vs Straight", () => {
    // P1: Straight (5-9), P2: Flush (Hearts)
    // Board: 5h 6h 7h 8c 2d
    // P1: 9s 4c -> 5,6,7,8,9 Straight
    // P2: Ah Kh -> A,K,7,6,5 Hearts Flush
    
    const p1 = parseCards(["9s", "4c"]);
    const p2 = parseCards(["Ah", "Kh"]);
    const board = parseCards(["5h", "6h", "7h", "8c", "2d"]); // 3 hearts on board

    // P2 has 5 hearts? Ah, Kh, 5h, 6h, 7h. Yes.
    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player2);
  });

  it("Split pot (same hand)", () => {
    // Board: A K Q J T (Royal Flush on board)
    // P1: 2 3
    // P2: 4 5
    // Both play the board.
    const p1 = parseCards(["2s", "3c"]);
    const p2 = parseCards(["4h", "5d"]);
    const board = parseCards(["Ah", "Kh", "Qh", "Jh", "Th"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Split);
  });

  it("Split pot (same pair, same kickers)", () => {
    // P1: A 2
    // P2: A 3
    // Board: K K Q J 9
    // P1: K K A Q J
    // P2: K K A Q J
    // 2 and 3 are kickers but 6th card. Not used.
    const p1 = parseCards(["As", "2c"]);
    const p2 = parseCards(["Ah", "3d"]);
    const board = parseCards(["Ks", "Kc", "Qh", "Jh", "9d"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Split);
  });

  it("Player 1 wins by kicker", () => {
    // P1: A 9
    // P2: A 8
    // Board: K K Q J 7
    // P1: K K A Q J (Best 5)
    // P2: K K A Q J (Best 5)
    // Wait, K K A Q J. 9 and 8 are not used.
    // Let's change board to use kicker.
    // Board: K K Q 5 4
    // P1: A 9 -> K K A Q 9
    // P2: A 8 -> K K A Q 8
    // P1 wins.
    const p1 = parseCards(["As", "9c"]);
    const p2 = parseCards(["Ah", "8d"]);
    const board = parseCards(["Ks", "Kc", "Qh", "5d", "4s"]);

    expect(comparePlayers(p1, p2, board)).toBe(Winner.Player1);
  });
});
