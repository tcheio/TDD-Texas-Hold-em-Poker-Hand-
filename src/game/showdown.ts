import { Card } from "../core/card";
import { getBestHand } from "../hand/evaluator";
import { compare } from "../hand/pair";


export enum Winner {
  Player1 = 1,
  Player2 = 2,
  Split = 0,
}

export function comparePlayers(p1: readonly Card[], p2: readonly Card[], board: readonly Card[]): Winner {
  const h1 = getBestHand([...p1, ...board]);
  const h2 = getBestHand([...p2, ...board]);

  const diff = compare(h1, h2);
  if (diff > 0) return Winner.Player1;
  if (diff < 0) return Winner.Player2;
  return Winner.Split;
}
