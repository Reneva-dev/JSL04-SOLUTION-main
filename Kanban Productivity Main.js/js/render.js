// render.js

import { openTaskModal } from "./modal.js";

/**
 * Create a DOM element representing a single task.
 * @param {Object} task - Task object with id, title, and status.
 * @returns {HTMLElement} The task's DOM element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => openTaskModal(task));

  return taskDiv;
}

/**
 * Get the DOM container based on task status.
 * @param {string} status - Status of the task (todo, doing, done).
 * @returns {HTMLElement|null} DOM container or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clear all existing tasks from UI.
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Render tasks in the UI.
 * @param {Array<Object>} tasks - List of task objects.
 */
export function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}
