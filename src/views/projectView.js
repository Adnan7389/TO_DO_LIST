// projectView.js
class ProjectView {
  static renderProjects(projects) {
    // This just generates the markup for projects
    const projectContainer = document.querySelector('#project-list');
    projectContainer.innerHTML = ''; // Clear the container

    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project-item');
      projectElement.setAttribute('data-name', project.name);
      projectElement.textContent = project.name;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteProjectBtn');
      deleteButton.textContent = 'Delete';
      projectElement.appendChild(deleteButton);

      deleteButton.style.display = 'none';

      projectElement.addEventListener('click', () => {
        // Show the delete button when a project is selected
        document.querySelectorAll('.project-item').forEach(item => {
          item.classList.remove('selected');
          item.querySelector('.deleteProjectBtn').style.display = 'none'; // Hide delete button on other projects
        });

        projectElement.classList.add('selected');
        deleteButton.style.display = 'block'; // Show the delete button for the selected project
      });

      // Just render the project elements
      projectContainer.appendChild(projectElement);
    });
  }
}

export default ProjectView;
