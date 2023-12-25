"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var utils_ts_1 = require("./utils.ts");
var ids = [];
var Task = /** @class */ (function () {
    function Task(title, description) {
        if (description === void 0) { description = ""; }
        while (true) {
            var randomId = (0, utils_ts_1.getRandomId)();
            if (!ids.includes(randomId)) {
                this.id = randomId;
                break;
            }
        }
        ids.push(this.id);
        this.title = title;
        this.description = description;
        this.isCompleted = false;
    }
    Task.prototype.toggleCompleted = function () {
        this.isCompleted = !this.isCompleted;
    };
    return Task;
}());
exports.Task = Task;
