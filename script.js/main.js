// main.js

import { loadTasks } from "./storage.js";
import { clearExistingTasks, renderTasks } from "./render.js";
import { setupModalCloseHandler, setupAddTaskModal } from "./modal.js";

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

