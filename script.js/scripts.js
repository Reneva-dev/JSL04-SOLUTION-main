import { initialTasks } from "./initialData.js";

let currentTaskId = null;

const STORAGE_KEY = "kanbanTasks";

/**
 * Loads tasks from localStorage. If none are found, it initializes with default tasks.
 * @returns {Array<Object>} The array of task objects.
 */
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
}

/**
 * Saves the given tasks array to localStorage.
 * @param {Array<Object>} tasks - The list of task objects to save.
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Creates a DOM element representing a single task.
 * @param {Object} task - The task object to render.
 * @param {number} task.id - The unique task ID.
 * @param {string} task.title - The title of the task.
 * @param {string} task.status - The task's current status (e.g., "todo", "doing", "done").
 * @returns {HTMLElement} The task DOM element.
 */
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

/**
 * Finds the appropriate column container based on task status.
 * @param {string} status - The status to match ("todo", "doing", or "done").
 * @returns {HTMLElement|null} The container element for the given status.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task elements from the board.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders an array of tasks into the appropriate columns.
 * @param {Array<Object>} tasks - The list of tasks to render.
 */
function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * Opens the modal with task data pre-filled for editing.
 * @param {Object} task - The task to edit.
 */
function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  currentTaskId = task.id;

  const submitBtn = document.getElementById("submit-task-btn");
  if (submitBtn) submitBtn.textContent = "Update Task";

  modal.showModal();
}

/**
 * Sets up the modal close button to close the dialog when clicked.
 */
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Refreshes the board by clearing and re-rendering all tasks.
 */
function refreshBoard() {
  clearExistingTasks();
  renderTasks(loadTasks());
}

/**
 * Initializes the task board when the page is first loaded.
 */
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
}

// Setup when DOM is ready
document.addEventListener("DOMContentLoaded", initTaskBoard);

const addTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");

/**
 * Opens a blank modal form to create a new task.
 */
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

/**
 * Handles form submission for both new and edited tasks.
 * Validates input, updates local storage, and refreshes the UI.
 */
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const status = document.getElementById("task-status").value;

  if (!title || !status) return;

  const tasks = loadTasks();

  if (currentTaskId !== null) {
    // Update existing task
    const taskIndex = tasks.findIndex((t) => t.id === currentTaskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].description = description;
      tasks[taskIndex].status = status;
    }
  } else {
    // Create new task
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
