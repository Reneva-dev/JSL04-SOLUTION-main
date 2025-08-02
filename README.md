# My Kanban Board

A dynamic and responsive web-based task management tool inspired by the Kanban methodology. This project allows users to visually organize their tasks across three progress states: **To Do**, **Doing**, and **Done** — enabling a clear overview of productivity in real-time.

---

## 📝 Description

**My Kanban Board** is built with simplicity, usability, and responsiveness in mind. Users can easily add, edit, and categorize tasks using an intuitive drag-and-drop-like interface. The design is mobile-friendly and references a modern UI inspired by a provided Figma design system.

This project is suitable for individual use or as a base for expanding into a multi-user productivity app.

---

## ⚙️ Technologies Used

- **HTML5** – Semantic structure and accessibility
- **CSS3** – Custom styling with responsive design
- **JavaScript (ES6+)** – Interactive functionality and logic
- **LocalStorage API** – Persistent task data across sessions
- **Google Fonts** – Plus Jakarta Sans typography
- **Figma** (design reference)

---

## 🚀 Features

- ✅ Add new tasks via a modal form
- ✅ Edit existing tasks with pre-filled modal data
- ✅ Categorize tasks into **To Do**, **Doing**, and **Done**
- ✅ Delete tasks (optional via edit mode)
- ✅ Responsive layout with mobile and desktop views
- ✅ LocalStorage support for data persistence
- ✅ Adaptive button behavior:
  - On desktop: `+ Add New Task`
  - On mobile: circular "+" button only
- ✅ Modal with form validation and custom error prompts
- ✅ Close modal with a red “X” button
- ✅ Clear, accessible UI with hover states and intuitive design

---

## 🆕 Recent Updates

- **Add New Task Modal:**  
  Introduced a modal popup to create new tasks seamlessly. The modal includes input fields for task title, description, and status selection. Validation ensures required fields are filled before submission. The interface updates in real-time and persists tasks in local storage.

---

## 📦 Setup Instructions

To run this project locally:

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/my-kanban-board.git
   ```

2. **Navigate to the project folder**  
   ```bash
   cd my-kanban-board
   ```

3. **Open the project in your browser**  
   Open `index.html` directly in your browser, or use Live Server (VSCode extension) for automatic refresh on changes.

> ✅ No build tools or dependencies required.

---

## 💡 Usage Example

1. Click **“+ Add New Task”** to open the task creation modal.
2. Fill in the **Title**, **Description**, and select a **Status**.
3. Click **“Create Task”** — your task appears in the appropriate column.
4. Click a task to **edit** or **reassign** it to a different status.
5. On mobile, use the circular `+` button to open the same modal.

---

## 📱 Interaction Notes

- **Mobile view:** Header text is hidden and replaced by a compact layout. The Add Task button becomes a floating round icon.
- **Modal accessibility:** Tasks can be dismissed or saved easily via keyboard or mouse.
- **Validation:** Empty Title or Description fields trigger a red exclamation prompt.

---

## 🧑‍💻 Author

Developed by Reneva Newman 
© 2025 – All rights reserved.

---
