import { describe, it, expect } from "vitest";
import {
  DuplicateCardError,
  assertNoDuplicateCards,
  assertValidHoldemInput,
  assertValidHoldemTable,
} from "./inputValidation";
import { parseCard } from "./parser";

describe("Ticket B5 - Input validation (duplicates)", () => {
  it("does not throw when there are no duplicates", () => {
    const cards = ["Ah", "Kd", "Qs", "Jc", "9h"].map(parseCard);
    expect(() => assertNoDuplicateCards(cards)).not.toThrow();
  });

  it("throws DuplicateCardError when the same card appears twice in a list", () => {
    const cards = ["Ah", "Kd", "Ah", "Jc", "9h"].map(parseCard);

    expect(() => assertNoDuplicateCards(cards, "test-list")).toThrow(DuplicateCardError);
    expect(() => assertNoDuplicateCards(cards, "test-list")).toThrow(
      /Duplicate card\(s\) detected/
    );
  });

  it("throws when board+hole contains a duplicate (same card on board and in hole)", () => {
    const board = ["Ah", "2d", "3h", "4s", "9d"].map(parseCard);
    const hole = ["Ah", "Kd"].map(parseCard);

    expect(() => assertValidHoldemInput(board, hole)).toThrow(DuplicateCardError);
  });

  it("throws when duplicates exist across multiple players", () => {
    const board = ["Ah", "2d", "3h", "4s", "9d"].map(parseCard);

    const p1 = ["Kc", "Qd"].map(parseCard);
    const p2 = ["Kc", "Js"].map(parseCard);

    expect(() => assertValidHoldemTable(board, [p1, p2])).toThrow(DuplicateCardError);
  });

  it("does not throw for valid multi-player input", () => {
    const board = ["Ah", "2d", "3h", "4s", "9d"].map(parseCard);

    const p1 = ["Kc", "Qd"].map(parseCard);
    const p2 = ["Tc", "Js"].map(parseCard);

    expect(() => assertValidHoldemTable(board, [p1, p2])).not.toThrow();
  });
});
