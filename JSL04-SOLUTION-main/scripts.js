import { initialTasks } from "./initialData.js";

let currentTaskId = null;

const STORAGE_KEY = "kanbanTasks";

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  currentTaskId = task.id;

  // Set modal button label
  const submitBtn = document.getElementById("submit-task-btn");
  if (submitBtn) submitBtn.textContent = "Update Task";

  modal.showModal();
}

function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

function refreshBoard() {
  clearExistingTasks();
  renderTasks(loadTasks());
}

function initTaskBoard() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);

const addTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");

addTaskBtn.addEventListener("click", () => {
  currentTaskId = null;
  taskForm.reset();

  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-status").value = "todo";

  const submitBtn = document.getElementById("submit-task-btn");
  if (submitBtn) submitBtn.textContent = "Create Task";

  document.getElementById("task-modal").showModal();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const status = document.getElementById("task-status").value;

  if (!title || !status) return;

  const tasks = loadTasks();

  if (currentTaskId !== null) {
    const taskIndex = tasks.findIndex((t) => t.id === currentTaskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].description = description;
      tasks[taskIndex].status = status;
    }
  } else {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };
    tasks.push(newTask);
  }

  saveTasks(tasks);
  document.getElementById("task-modal").close();
  refreshBoard();
  currentTaskId = null;
});

