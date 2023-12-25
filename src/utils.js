"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomId = void 0;
var constants_ts_1 = require("./constants.ts");
function getRandomId() {
    var charSet = constants_ts_1.alphabetPool + constants_ts_1.numberPool;
    var id = "";
    for (var i = 0; i < constants_ts_1.idLength; i++) {
        id += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return id;
}
exports.getRandomId = getRandomId;
