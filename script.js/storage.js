// storage.js

import { initialTasks } from "./initialData.js";

const STORAGE_KEY = "kanbanTasks";

/**
 * Load tasks from localStorage or fallback to initial tasks.
 * @returns {Array<Object>} Array of task objects.
 */
export function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
}

/**
 * Save the tasks to localStorage.
 * @param {Array<Object>} tasks - Array of task objects.
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
