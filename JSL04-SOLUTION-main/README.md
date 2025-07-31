# JSL04 Challenge – Solution Code

## Overview

This solution refactors JSL03 by **removing all hard‑coded tasks from the HTML** and generating the board entirely through JavaScript. It also introduces a **modal dialog** that lets the user inspect (and later extend to edit) an individual task. The result is a cleaner, fully data‑driven task board that is easier to maintain and extend.

## Learning goals

By studying the JSL04 solution you will:

- Learn how to keep UI data in external modules (separation of concerns).
- Practice **DOM creation** and **querying** with `document.createElement()` and `querySelector()`.
- Wire up **event listeners** to dynamically created elements.
- Manage **dialog (`<dialog>`) components** for richer UX.
- Organise code into small, single‑purpose functions.

## File structure

├── `index.html` # Contains empty column shells & modal markup

├── `styles.css` # Flex layout & dialog styling

├── `initialData.js` # Array of task objects (id, title, description, status)

├── `scripts.js` # Board initialisation & modal logic

└── `README.md #` ← you are here

### `scripts.js` at a glance

| Function                           | Responsibility                                         |
| ---------------------------------- | ------------------------------------------------------ |
| `createTaskElement(task)`          | Builds one `.task-div`, binds click handler            |
| `getTaskContainerByStatus(status)` | Finds the `.tasks-container` inside the correct column |
| `clearExistingTasks()`             | Empties all columns before re‑rendering                |
| `renderTasks(tasks)`               | Loops over the dataset and appends each element        |
| `openTaskModal(task)`              | Prefills and shows the `<dialog>` with task details    |
| `setupModalCloseHandler()`         | Hooks the **Close** button                             |
| `initTaskBoard()`                  | Bootstrap: clear → render → hook modal                 |

## Running the solution

1. **Clone / download** the repo.
2. Open `index.html` with **Live Server** or any modern browser.
3. Explore:
   - Click a task card to open the modal.

## License

Provided for **educational purposes only**.
