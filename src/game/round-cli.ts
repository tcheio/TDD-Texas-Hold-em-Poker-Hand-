import { Deck } from "./deck";
import { getBestHand, Hand } from "../hand/evaluator";
import { compare, Category } from "../hand/pair";
import { Card } from "../core/card";

function formatCategory(cat: Category): string {
  return Category[cat].replace(/([A-Z])/g, ' $1').trim(); // "FullHouse" -> "Full House"
}

function printCards(label: string, cards: readonly Card[]) {
  console.log(`${label}: ${cards.map(c => c.toString()).join(", ")}`);
}

function main() {
  const deck = new Deck();
  deck.shuffle();

  const p1Cards = deck.deal(2);
  const p2Cards = deck.deal(2);
  const board = deck.deal(5);

  console.log("=== Texas Hold'em Round ===\n");

  printCards("Player 1 Hole Cards", p1Cards);
  printCards("Player 2 Hole Cards", p2Cards);
  printCards("Community Board    ", board);

  console.log("\n" + "-".repeat(30) + "\n");

  const h1 = getBestHand([...p1Cards, ...board]);
  const h2 = getBestHand([...p2Cards, ...board]);

  const diff = compare(h1, h2);

  if (diff > 0) {
    console.log(`🏆 Winner: Player 1`);
    console.log(`   Hand: ${formatCategory(h1.category)}`);
    printCards("   Best 5", h1.cards);
    console.log(`   (vs Player 2's ${formatCategory(h2.category)})`);
  } else if (diff < 0) {
    console.log(`🏆 Winner: Player 2`);
    console.log(`   Hand: ${formatCategory(h2.category)}`);
    printCards("   Best 5", h2.cards);
    console.log(`   (vs Player 1's ${formatCategory(h1.category)})`);
  } else {
    console.log(`🤝 Result: Tie / Split Pot`);
    console.log(`   Hand: ${formatCategory(h1.category)}`);
    printCards("   Best 5", h1.cards);
  }
}

main();
