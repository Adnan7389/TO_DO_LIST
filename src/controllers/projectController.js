import project from '../models/project.js';

class projectController {
  constructor() {
    this.Projects = [];
  }

  addProject(projectName) {
    const newProject = new project(projectName);
    this.Projects.push(newProject);
  }

  deleteProject(projectName) {
    this.Projects = this.Projects.filter(project => project.name !== projectName);
  }

  getProjectByName(name) {
    return this.Projects.find(project.name == name);
  }
}

export default projectController;