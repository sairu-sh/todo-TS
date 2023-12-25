"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TASK_ts_1 = require("./TASK.ts");
var TASKLIST_ts_1 = require("./TASKLIST.ts");
var searchBox = document.getElementById("search-word");
var taskDiv = document.getElementById("task-list");
var newTaskControl = document.getElementById("new-task-control");
var taskAdderControl = document.getElementById("task-adder-control");
var overlay = document.getElementById("overlay");
var modal = document.getElementById("modal");
var expander = document.getElementById("expander");
//modal window manipulation
function hideOverlay() {
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.add("hidden");
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
}
function displayOverlay() {
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("hidden");
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("hidden");
}
overlay.addEventListener("click", hideOverlay);
expander === null || expander === void 0 ? void 0 : expander.addEventListener("click", displayOverlay);
var taskList = new TASKLIST_ts_1.TaskList();
function createTask(title, description) {
    if (description === void 0) { description = ""; }
    var task = new TASK_ts_1.Task(title, description);
    taskList.addToList(task);
}
function toggleCompleted(id) {
    var task = taskList.getTaskById(id);
    task === null || task === void 0 ? void 0 : task.toggleCompleted();
}
function renderTasks(taskList) {
    var listContainer = taskDiv === null || taskDiv === void 0 ? void 0 : taskDiv.querySelector(".container");
    if (listContainer)
        listContainer.innerHTML = "";
    if (taskList.list.length > 0) {
        taskList.list.forEach(function (task) {
            var taskItem = document.createElement("div");
            taskItem.classList.add("task--item");
            listContainer === null || listContainer === void 0 ? void 0 : listContainer.appendChild(taskItem);
            var title = document.createElement("p");
            title.classList.add("task--title");
            title.textContent = task.title;
            var description = document.createElement("p");
            description.classList.add("task--description");
            description.textContent = task.description;
            var inputField = document.createElement("input");
            inputField.setAttribute("type", "checkbox");
            inputField.checked = task.isCompleted;
            inputField.addEventListener("change", function (e) {
                toggleCompleted(task.id);
                if (e.target) {
                    var targetElement = e.target;
                    var parentId = targetElement.closest(".task--item");
                    if (parentId) {
                        parentId.classList.remove("completed");
                        if (task.isCompleted)
                            parentId.classList.add("completed");
                    }
                }
            });
            taskItem.appendChild(title);
            taskItem.appendChild(description);
            taskItem.appendChild(inputField);
        });
    }
    else {
        var emptyHtml = "<div class=\"empty\">\n                          <img src=\"/assets/images/bullets.svg\" alt=\"\" />\n                            <p>You don't have any tasks</p>\n                      </div>";
        listContainer.insertAdjacentHTML("afterbegin", emptyHtml);
    }
}
renderTasks(taskList);
function taskAdderRenderer() {
    var taskTitle = newTaskControl === null || newTaskControl === void 0 ? void 0 : newTaskControl.value;
    if (taskTitle) {
        createTask(taskTitle);
        renderTasks(taskList);
        newTaskControl.value = "";
    }
}
taskAdderControl === null || taskAdderControl === void 0 ? void 0 : taskAdderControl.addEventListener("click", taskAdderRenderer);
newTaskControl === null || newTaskControl === void 0 ? void 0 : newTaskControl.addEventListener("keydown", function (e) {
    if (e.key === "Enter")
        taskAdderRenderer();
});
searchBox === null || searchBox === void 0 ? void 0 : searchBox.addEventListener("input", function (e) {
    var searchParam = e.target.value;
    searchFnxn(searchParam);
});
function searchFnxn(searchParam) {
    if (searchParam === void 0) { searchParam = ""; }
    var matchingTasks = taskList.list.filter(function (task) {
        return task.title.includes(searchParam);
    });
    var list = new TASKLIST_ts_1.TaskList(matchingTasks);
    renderTasks(list);
}
