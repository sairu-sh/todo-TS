"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskList = void 0;
var TaskList = /** @class */ (function () {
    function TaskList(tasks) {
        this.list = tasks || [];
    }
    TaskList.prototype.addToList = function (task) {
        this.list.push(task);
    };
    TaskList.prototype.getTaskById = function (id) {
        return this.list.find(function (task) { return task.id === id; }) || null;
    };
    return TaskList;
}());
exports.TaskList = TaskList;
