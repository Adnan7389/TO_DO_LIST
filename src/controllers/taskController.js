import Task from '../models/Task.js';
// import project from '../models/project.js';
const generateId = () => "_" + crypto.randomUUID();

class TaskController {
  constructor(project) {
    this.project = project;
  }

  addTask(taskData) {
    const id = generateId();
    console.log("Generated Task ID:", id);
    const { title, description, dueDate, priority } = taskData;
    const newTask = new Task(title, description, dueDate, priority, id);
    this.project.addTask(newTask);
    console.log("Task Data Input:", taskData);
    console.log("Generated Task ID:", id);
    console.log("New Task Object:", newTask);

  }

  deleteTask(taskId) {
    this.project.deleteTask(taskId);
  }

  editTask(taskId, updatedData) {
    const taskToEdit = this.project.tasks.find(task => task.id === taskId);
    if (!taskToEdit) {
      console.error(`Task with ID ${taskId} not found.`);
      return;
    }

    // Update the task properties
    taskToEdit.title = updatedData.title || taskToEdit.title;
    taskToEdit.description = updatedData.description || taskToEdit.description;
    taskToEdit.dueDate = updatedData.dueDate || taskToEdit.dueDate;
    taskToEdit.priority = updatedData.priority || taskToEdit.priority;
  }

  toggleTaskCompletion(taskId) {
    const task = this.project.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
}

export default TaskController;