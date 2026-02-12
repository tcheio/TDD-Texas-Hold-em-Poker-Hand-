"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winner = void 0;
exports.comparePlayers = comparePlayers;
const evaluator_1 = require("../hand/evaluator");
const pair_1 = require("../hand/pair");
var Winner;
(function (Winner) {
    Winner[Winner["Player1"] = 1] = "Player1";
    Winner[Winner["Player2"] = 2] = "Player2";
    Winner[Winner["Split"] = 0] = "Split";
})(Winner || (exports.Winner = Winner = {}));
function comparePlayers(p1, p2, board) {
    const h1 = (0, evaluator_1.getBestHand)([...p1, ...board]);
    const h2 = (0, evaluator_1.getBestHand)([...p2, ...board]);
    const diff = (0, pair_1.compare)(h1, h2);
    if (diff > 0)
        return Winner.Player1;
    if (diff < 0)
        return Winner.Player2;
    return Winner.Split;
}
