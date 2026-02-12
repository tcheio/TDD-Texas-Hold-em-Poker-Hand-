import { Card } from "./card";
import { evaluate as evaluateRankBased, Category } from "./pair";
import { bestFlush } from "./flush";
import { bestStraight } from "./straight";
import { bestFourOfAKind } from "./four";
import { bestFullHouse } from "./full-house";
// Note: importing specific detectors if needed, but evaluateRankBased covers Four/Full/Three/Two/Pair/High

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
    // We need to re-find all cards of that suit because bestFlush returns top 5
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
          cards: fourRes.cards // already 5 cards
      };
  }

  // 3. Check Full House
  const fullRes = bestFullHouse(cards);
  if (fullRes) {
      return {
          category: Category.FullHouse,
          cards: fullRes.cards // already 5 cards
      };
  }

  // 4. Check Flush
  if (flushRes) {
    return {
      category: Category.Flush,
      cards: flushRes.cards // already 5 cards
    };
  }

  // 5. Check Straight
  const straightRes = bestStraight(cards);
  if (straightRes) {
    return {
      category: Category.Straight,
      cards: straightRes.cards // already 5 cards
    };
  }

  // 6. Rank based (Three, Two, Pair, High)
  const rankBased = evaluateRankBased(cards);
  // Truncate to 5 cards
  return {
    category: rankBased.category,
    cards: rankBased.cards.slice(0, 5)
  };
}
