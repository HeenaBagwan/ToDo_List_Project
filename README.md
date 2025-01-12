# ToDo_List_Project

A simple and interactive **To-Do List Application** built using **HTML**, **CSS**, and **JavaScript**. The app allows users to add, update, delete, and mark tasks as completed, along with priority levels and due dates. All tasks are saved locally using **localStorage**, making it persistent even after the browser is refreshed.

## Features

- Add tasks with a description, priority level, and due date.
- Update existing tasks.
- Delete tasks with a confirmation prompt.
- Mark tasks as completed by double-clicking on them.
- Completed tasks are visually distinguished with a strikethrough and a checkmark.
- Tasks are saved in `localStorage`, so the list is persistent across browser sessions.
- Simple and responsive UI with animations for alerts.

## How It Works

1. **Adding a Task**:
   - Enter the task description.
   - Select a priority level (Low, Medium, or High).
   - Choose a due date.
   - Click the **Add (+)** button to add the task.

2. **Updating a Task**:
   - Click the **Edit** icon (pencil) next to a task.
   - Modify the description, priority, or due date.
   - Click the **Refresh** icon to save the changes.

3. **Deleting a Task**:
   - Click the **Delete** icon (trash can) next to a task.
   - Confirm the deletion to remove the task from the list.

4. **Marking a Task as Completed**:
   - Double-click on a task to mark it as completed.
   - The task will be crossed out and marked with a checkmark.

## Project Structure
o-Do Application/ ├── index.html # HTML structure of the app ├── style.css # Stylesheet for the app ├── script.js # JavaScript for app functionality ├── images/ # Folder for icons and GIFs │ ├── notebook.gif # Notebook icon for the header │ ├── plus.png # Add/refresh button icon │ ├── pencil.png # Edit icon │ ├── delete.png # Delete icon │ ├── check-mark.png # Completed task icon └── README.md # Documentation file

## Technologies Used

- **HTML5**: Structure of the application.
- **CSS3**: Styling for the UI.
- **JavaScript**: Logic for adding, updating, deleting, and completing tasks.
- **LocalStorage**: Persistent data storage.
