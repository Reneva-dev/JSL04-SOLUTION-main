// main.js

import { loadTasks, saveTasks } from './storage.js';
import { openTaskModal, setupModalCloseHandler } from './modal.js';
import { renderTasks, clearExistingTasks } from './render.js';
import { initialTasks } from './initialData.js';


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

