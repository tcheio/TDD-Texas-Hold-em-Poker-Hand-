import { evaluate as evaluateRankBased, Category } from "./pair";
import { bestFlush } from "./flush";
import { bestStraight } from "./straight";
import { bestFourOfAKind } from "./four";
import { bestFullHouse } from "./full-house";
import { bestThreeOfAKind } from "./three";
import { bestTwoPair } from "./two-pair";
import { bestStraightFlush } from "./straightFlush";
import { Card } from "../core/card";

export interface Hand {
  category: Category;
  cards: Card[];
}

export function getBestHand(cards: readonly Card[]): Hand {
  const sfRes = bestStraightFlush(cards);
  if (sfRes) {
    return {
      category: Category.StraightFlush,
      cards: sfRes.cards
    };
  }

  const fourRes = bestFourOfAKind(cards);
  if (fourRes) {
      return {
          category: Category.FourOfAKind,
          cards: fourRes.cards
      };
  }

  const fullRes = bestFullHouse(cards);
  if (fullRes) {
      return {
          category: Category.FullHouse,
          cards: fullRes.cards
      };
  }

  const flushRes = bestFlush(cards);
  if (flushRes) {
    return {
      category: Category.Flush,
      cards: flushRes.cards
    };
  }

  const straightRes = bestStraight(cards);
  if (straightRes) {
    return {
      category: Category.Straight,
      cards: straightRes.cards
    };
  }

  const threeRes = bestThreeOfAKind(cards);
  if (threeRes) {
    return {
      category: Category.ThreeOfAKind,
      cards: threeRes.cards
    };
  }

  const twoPairRes = bestTwoPair(cards);
  if (twoPairRes) {
    return {
      category: Category.TwoPair,
      cards: twoPairRes.cards
    };
  }

  const rankBased = evaluateRankBased(cards);
  return {
    category: rankBased.category,
    cards: rankBased.cards.slice(0, 5)
  };
}
