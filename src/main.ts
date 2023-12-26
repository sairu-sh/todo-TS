import { Task } from "./TASK.ts";
import { TaskList } from "./TASKLIST.ts";

//control divs
const searchBox = document.getElementById("search-word") as HTMLInputElement;
const taskDiv = document.getElementById("task-list") as HTMLDivElement;
const newTaskControl = document.getElementById(
  "new-task-controls"
) as HTMLInputElement;
const taskAdderControl = document.getElementById("task-adder");

//modal divs
const newTaskModal = document.getElementById(
  "task-title-modal"
) as HTMLInputElement;
const taskDescriptionModal = document.getElementById(
  "task-description"
) as HTMLTextAreaElement;
const taskAdderModal = document.getElementById(
  "task-adder-modal"
) as HTMLButtonElement;

const overlay = document.getElementById("overlay") as HTMLDivElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const expander = document.getElementById("expander");
const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;

//navbar DOM manipulation
const navHome = document.getElementById("home") as HTMLUListElement;
const navCompleted = document.getElementById("completed") as HTMLUListElement;
const navRemaining = document.getElementById("remaining") as HTMLUListElement;

//clear the navBar active elements
function clearNav() {
  navHome.classList.remove("active");
  navRemaining.classList.remove("active");
  navCompleted.classList.remove("active");
}

function setActiveNav(navElement: HTMLUListElement, navName: string) {
  clearNav();
  navElement.classList.add("active");
  activeNav = navName;
  searchFnxn("");
}

//modal window manipulation
function hideOverlay() {
  overlay?.classList.add("hidden");
  modal?.classList.add("hidden");
}

function displayOverlay() {
  overlay?.classList.remove("hidden");
  modal?.classList.remove("hidden");
}

// Event listeners
navHome?.addEventListener("click", () => setActiveNav(navHome, "task"));
navCompleted?.addEventListener("click", () =>
  setActiveNav(navCompleted, "completed")
);
navRemaining?.addEventListener("click", () =>
  setActiveNav(navRemaining, "remaining")
);

expander?.addEventListener("click", displayOverlay);
overlay.addEventListener("click", hideOverlay);
cancelBtn.addEventListener("click", hideOverlay);

//three types of taskList
const taskList = new TaskList();
const completedList = new TaskList();
const remainingList = new TaskList();

let activeNav = "task";
let currentList: TaskList = taskList;

function setActiveList() {
  //choose which tasklist to render tasks from
  switch (activeNav) {
    case "completed":
      currentList = completedList;
      break;

    case "remaining":
      currentList = remainingList;
      break;
    default:
      currentList = taskList;
      break;
  }
}

//searching mechanism
function searchFnxn(searchParam: string = "") {
  setActiveList();
  const matchingTasks = currentList.list.filter((task) =>
    task.title.includes(searchParam)
  );
  const list = new TaskList(matchingTasks);
  renderTasks(list);
}

searchBox?.addEventListener("input", (e) => {
  const searchParam = (e.target as HTMLInputElement).value;
  searchFnxn(searchParam);
});

searchFnxn("");

//task creation and manipulation
function createTask(title: string, description: string = "") {
  const task = new Task(title, description);
  taskList.addToList(task);
  remainingList.addToList(task);
}

function pushToCompleted(task: Task) {
  completedList.addToList(task);
  remainingList.removeFromList(task.id);
}

function popFromCompleted(task: Task) {
  completedList.removeFromList(task.id);
  remainingList.addToList(task);
}

function toggleCompleted(id: string) {
  const task = taskList.getTaskById(id);

  if (task) {
    const isCompleted = task?.toggleCompleted();
    if (isCompleted) {
      pushToCompleted(task);
    } else {
      popFromCompleted(task);
    }
  }

  renderTasks(currentList);
}

function renderTasks(taskList: TaskList) {
  const listContainer = taskDiv?.querySelector(".container") as HTMLDivElement;
  if (listContainer) listContainer.innerHTML = "";

  if (taskList.list.length > 0) {
    taskList.list.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task--item");
      listContainer?.appendChild(taskItem);

      const title = document.createElement("p");
      title.classList.add("task--title");
      title.textContent = task.title;

      const description = document.createElement("p");
      description.classList.add("task--description");
      description.textContent = task.description;

      const inputField = document.createElement("input");
      inputField.setAttribute("type", "checkbox");
      inputField.checked = task.isCompleted;

      inputField.addEventListener("change", (e) => {
        toggleCompleted(task.id);

        if (e.target) {
          const targetElement = e.target as Element;
          const parentId = targetElement.closest(".task--item");
          if (parentId) {
            parentId.classList.remove("completed");
            if (task.isCompleted) parentId.classList.add("completed");
          }
        }
      });

      taskItem.appendChild(title);
      taskItem.appendChild(description);
      taskItem.appendChild(inputField);
    });
  } else {
    const emptyHtml = `<div class="empty">
                          <img src="/assets/images/bullets.svg" alt="" />
                            <p>You don't have any tasks</p>
                      </div>`;

    listContainer.insertAdjacentHTML("afterbegin", emptyHtml);
  }
}

//create a new task and immediately render the newly added task
function taskAdderRenderer(source: string = "control") {
  let taskTitle;
  let taskDescription;
  if (source === "control") {
    taskTitle = newTaskControl?.value;
    taskDescription = "";
  } else if (source === "modal") {
    taskTitle = newTaskModal?.value;
    taskDescription = taskDescriptionModal?.value;
  }

  if (taskTitle) {
    createTask(taskTitle, taskDescription);
    renderTasks(taskList);
    newTaskControl.value = "";
    hideOverlay();
  }
}

//eventListeners listening for adding mechanisms
taskAdderControl?.addEventListener("click", () => taskAdderRenderer());

newTaskControl?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") taskAdderRenderer();
});

taskAdderModal?.addEventListener("click", () => taskAdderRenderer("modal"));
