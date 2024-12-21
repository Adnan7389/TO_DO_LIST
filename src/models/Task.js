
class task {
  constructor(title, description = '', dueDate = null, priority, id, completed = false) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
    this.id = id;
    this.priority = priority;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export default task;