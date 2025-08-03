// main.js

import { loadTasks, saveTasks } from './storage.js';
import { openTaskModal, setupModalCloseHandler } from './modal.js';
import { renderTasks, clearExistingTasks } from './render.js';




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

import { setupModalCloseHandler, setupAddTaskModal } from './modal.js';
//...
function init() {
  clearExistingTasks();
  renderTasks(loadTasks());
  setupModalCloseHandler();
  setupAddTaskModal();  // <--- this must be called
}

