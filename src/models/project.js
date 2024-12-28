class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    console.log("Before Deletion:", this.tasks);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    console.log("After Deletion:", this.tasks);
  }
}

export default Project;