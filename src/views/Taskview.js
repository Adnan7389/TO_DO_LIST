class TaskView {
  static rendeTask() {

    const taskContainer = document.querySelector("#task-list")
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
      const taskElement = document.createElement("div");
      taskElement.textContent = task.title;
      taskContainer.appendChild(taskElement);
    });
  }
}

export default TaskView;