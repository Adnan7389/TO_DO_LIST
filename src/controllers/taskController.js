import Task from '../models/Task.js';

class taskController {
  constructor(project) {
    this.project = project;
  }

  addTask(taskData) {
    const id = Date.now();
    const newTask = new Task(id, ...taskData);
    this.project.addTask(newTask);
  }

  deleteTask(taskId) {
    this.project.deleteTask(taskId);
  }
}

export default taskController;