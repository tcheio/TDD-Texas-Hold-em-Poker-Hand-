import { Card } from "./card";
import { evaluate as evaluateRankBased, Category } from "./pair";
import { bestFlush } from "./flush";
import { bestStraight } from "./straight";
import { bestFourOfAKind } from "./four";
import { bestFullHouse } from "./full-house";
import { bestThreeOfAKind } from "./three";
import { bestTwoPair } from "./two-pair";

export interface Hand {
  category: Category;
  cards: Card[];
}

export function getBestHand(cards: readonly Card[]): Hand {
  // 1. Check Straight Flush
  // Find flush suit first
  const flushRes = bestFlush(cards);
  if (flushRes) {
    // Check for straight using all cards of that suit
    const suitedCards = cards.filter(c => c.suit === flushRes.suit);
    const straightRes = bestStraight(suitedCards);
    if (straightRes) {
      return {
        category: Category.StraightFlush,
        cards: straightRes.cards
      };
    }
  }

  // 2. Check Four of a Kind
  const fourRes = bestFourOfAKind(cards);
  if (fourRes) {
      return {
          category: Category.FourOfAKind,
          cards: fourRes.cards
      };
  }

  // 3. Check Full House
  const fullRes = bestFullHouse(cards);
  if (fullRes) {
      return {
          category: Category.FullHouse,
          cards: fullRes.cards
      };
  }

  // 4. Check Flush
  if (flushRes) {
    return {
      category: Category.Flush,
      cards: flushRes.cards
    };
  }

  // 5. Check Straight
  const straightRes = bestStraight(cards);
  if (straightRes) {
    return {
      category: Category.Straight,
      cards: straightRes.cards
    };
  }

  // 6. Check Three of a Kind
  const threeRes = bestThreeOfAKind(cards);
  if (threeRes) {
    return {
      category: Category.ThreeOfAKind,
      cards: threeRes.cards
    };
  }

  // 7. Check Two Pair
  const twoPairRes = bestTwoPair(cards);
  if (twoPairRes) {
    return {
      category: Category.TwoPair,
      cards: twoPairRes.cards
    };
  }

  // 8. Rank based (Pair, High Card)
  const rankBased = evaluateRankBased(cards);
  // Truncate to 5 cards
  return {
    category: rankBased.category,
    cards: rankBased.cards.slice(0, 5)
  };
}
