// main.js

import { loadTasks, saveTasks } from './Kanban Productivity Main.js/js/storage.js';
import { openTaskModal, setupModalCloseHandler } from './Kanban Productivity Main.js/js/modal.js';
import { renderTasks, clearExistingTasks } from './Kanban Productivity Main.js/js/render.js';




/**
 * Initialize the Kanban board.
 */
function init() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
  setupAddTaskModal();
}

document.addEventListener("DOMContentLoaded", init);

import { setupModalCloseHandler, setupAddTaskModal } from './Kanban Productivity Main.js/js/modal.js';
//...
function init() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
  setupAddTaskModal();  // <--- this must be called
}

