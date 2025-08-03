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
 * @param*


