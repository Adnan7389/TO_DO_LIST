import project from '../models/project.js';

class ProjectController {
  constructor() {
    this.Projects = [];
  }

  addProject(projectName) {
    const newProject = new project(projectName);
    this.Projects.push(newProject);
  }

  deleteProject(projectName) {
    console.log(`Deleting project: ${projectName}`);
    this.Projects = this.Projects.filter(project => project.name !== projectName);
    console.log("Updated Projects:", this.Projects);
  }

  getProjectByName(name) {
    return this.Projects.find(project => project.name === name);
  }
}

export default ProjectController;