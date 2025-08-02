import { initialTasks } from "./initialData.js";

let currentTaskId = null; // Global variable to track currently edited task

const STORAGE_KEY = "kanbanTasks";

/**
 * Load tasks from localStorage or fall back to initialTasks.
 * Also ensures localStorage has data on first run.
 * @returns {Array<Object>} Array of tasks
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
 * Save tasks array to localStorage.
 * @param {Array<Object>} tasks - The array of task objects to store.
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}



/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 * @returns {HTMLElement} The created task div element.
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
 * Finds the task container element based on task status.
 * @param {string} status - The task status ('todo', 'doing', or 'done').
 * @returns {HTMLElement|null} The container element, or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders all tasks from initial data to the UI.
 * Groups tasks by status and appends them to their respective columns.
 * @param {Array<Object>} tasks - Array of task objects.
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
 * Opens the modal dialog with pre-filled task details.
 * @param {Object} task - The task object to display in the modal.
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

  modal.showModal();
}

const deleteTaskBtn = document.getElementById("delete-task-btn");

deleteTaskBtn.addEventListener("click", () => {
  if (currentTaskId === null) return; // Nothing to delete

  let tasks = loadTasks();
  tasks = tasks.filter((task) => task.id !== currentTaskId);

  saveTasks(tasks);
  document.getElementById("task-modal").close();
  refreshBoard();
  currentTaskId = null;
});

const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => {
  currentTaskId = null; // Indicate this is a new task

  // Clear form fields for new input
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-status").value = "todo"; // Default to To Do

  // Open the modal
  document.getElementById("task-modal").showModal();
});

/**
 * Sets up modal close behavior.
 */
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Initializes the task board and modal handlers.
 */
function initTaskBoard() {
  clearExistingTasks();
  const tasks = loadTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);

addTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");

addTaskBtn.addEventListener("click", () => {
  // Reset form for new task
  taskForm.reset();
  document.getElementById("task-modal").showModal();
  currentTaskId = null;

document.getElementById("task-title").value = "";
document.getElementById("task-desc").value = "";
document.getElementById("task-status").value = "todo";

document.getElementById("task-modal").showModal();

// Hide delete button and update submit button text
const deleteBtn = document.getElementById("delete-task-btn");
if (deleteBtn) deleteBtn.style.display = "none";

const submitBtn = document.getElementById("submit-task-btn");
if (submitBtn) submitBtn.textContent = "Create Task";

});

// Handle form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const status = document.getElementById("task-status").value;

  if (!title || !status) return; // Basic validation
const tasks = loadTasks();

if (currentTaskId !== null) {
  // Editing an existing task
  const taskIndex = tasks.findIndex((t) => t.id === currentTaskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].title = title;
    tasks[taskIndex].description = description;
    tasks[taskIndex].status = status;
  }
} else {
  // Creating a new task
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
currentTaskId = null; // Reset after submit


  tasks.push(newTask);
  saveTasks(tasks);
  document.getElementById("task-modal").close();
  refreshBoard(); // Rerender UI
});

function refreshBoard() {
  clearExistingTasks();
  renderTasks(loadTasks());
}
