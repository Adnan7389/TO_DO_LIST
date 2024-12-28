
class task {
  constructor(title, description = '', dueDate = null, priority, id, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export default task;