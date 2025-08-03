// main.js

import { loadTasks, saveTasks } from './js/storage.js';
import { openTaskModal, setupModalCloseHandler } from './js/modal.js';
import { renderTasks, clearExistingTasks } from './js/render.js';




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

import { setupModalCloseHandler, setupAddTaskModal } from './js/modal.js';
//...
function init() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
  setupAddTaskModal();  // <--- this must be called
}

