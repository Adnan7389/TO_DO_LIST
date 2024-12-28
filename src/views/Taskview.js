class TaskView {
  static renderTask(tasks = [], project) {

    const taskContainer = document.querySelector("#task-list")
    taskContainer.innerHTML = '';

    if (!project || !Array.isArray(project.tasks)) {
      console.error("Project or project.tasks is undefined or invalid:", project);
      return;
    }

    if (tasks.length === 0) {
      taskContainer.innerHTML = "<p>No tasks available.</p>";
      return;
    }

    console.log("Rendering Task IDs:", project.tasks.map(task => task.id));

    if (!Array.isArray(tasks)) {
      console.error("Expected tasks to be an array, but got:", tasks);
      return;
    }

    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-item");
      taskElement.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.description || "No description provided"}</p>
        <p>Due: ${task.dueDate || "No due date"}</p>
        <small>Priority: ${task.priority}</small>
        <button class="edit-task-btn" data-id="${task.id}">Edit</button>
        <button class="delete-task-btn" data-id="${task.id}">Delete</button>
      `;

      taskContainer.appendChild(taskElement);
    });
  }
}

export default TaskView;