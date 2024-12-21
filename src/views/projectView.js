class ProjectView {
  static renderProjects(projects) {
    const projectContainer = document.querySelector('#project-list');
    projectContainer.innerHTML = '';

    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.textContent = project.name;
      projectContainer.appendChild(projectElement);
    });
  }
}

export default ProjectView;