import { describe, it, expect } from "vitest";
import { orderChosen5, formatChosen5Short } from "./chosen5";
import { parseCard } from "../core/parser";

describe("Ticket B4 - Chosen5 formatting / ordering", () => {
  it("orders a wheel straight as 5,4,3,2,A", () => {
    const chosen = ["Ac", "2d", "3h", "4s", "5c"].map(parseCard);

    const ordered = orderChosen5(chosen);

    expect(ordered.map((c) => [c.rank, c.suit])).toEqual([
      [5, "c"],
      [4, "s"],
      [3, "h"],
      [2, "d"],
      [14, "c"],
    ]);

    expect(formatChosen5Short(chosen)).toEqual(["5c", "4s", "3h", "2d", "Ac"]);
  });

  it("orders one pair as: pair first, then kickers desc", () => {
    const chosen = ["9c", "9d", "Ah", "Ks", "2c"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["9c", "9d", "Ah", "Ks", "2c"]);
  });

  it("orders two pair as: higher pair, lower pair, kicker", () => {
    const chosen = ["Kc", "Kd", "Ac", "Ad", "2h"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["Ac", "Ad", "Kc", "Kd", "2h"]);
  });

  it("orders three of a kind as: trips first, then kickers desc", () => {
    const chosen = ["7c", "7d", "7h", "9s", "Ah"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["7c", "7d", "7h", "Ah", "9s"]);
  });

  it("orders four of a kind as: quads first, then kicker", () => {

    const chosen = ["4c", "4d", "4h", "4s", "Ah"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["4c", "4d", "4h", "4s", "Ah"]);
  });

  it("orders full house as: trips first, then pair", () => {
    const chosen = ["8c", "8d", "8h", "Kc", "Kd"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["8c", "8d", "8h", "Kc", "Kd"]);
  });

  it("orders high card / flush-like as ranks desc", () => {
    const chosen = ["Ah", "Jd", "9c", "6s", "4h"].map(parseCard);

    expect(formatChosen5Short(chosen)).toEqual(["Ah", "Jd", "9c", "6s", "4h"]);
  });
});
