import project from "../models/project";

class Storage {
  static saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static getProjects() {
    const projectsData = JSON.parse(localStorage.getItem('projects')) || [];

    return projectsData.map((projectData) => {
      const Project = new project(projectData.name);
      Project.tasks = projectData.tasks || [];
      return Project;

    })
  }
}

export default Storage;