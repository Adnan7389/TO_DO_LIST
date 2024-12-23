import "./styles.css";
import ProjectController from "./controllers/projectController.js";
import ProjectView from "./views/projectView.js";
import Storage from "./utils/storage.js";
import TaskView from "./views/Taskview.js";

document.addEventListener("DOMContentLoaded", () => {

  const Controller = new ProjectController();

  Controller.addProject("Work");
  Controller.addProject("Personal");

  ProjectView.renderProjects(Controller.Projects);

  const showFormButton = document.querySelector("#add-project-btn");
  const projectForm = document.querySelector("#project-form")
  const projectNameInput = document.querySelector("#project-name")

  showFormButton.addEventListener("click", () => {
    projectForm.style.display = projectForm.style.display === "none" ? "block" : "none";
    showFormButton.style.display = "none";
  })

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value.trim();

    if (projectName) {

      Controller.addProject(projectName);
      Storage.saveProjects(Controller.Projects);
      ProjectView.renderProjects(Controller.Projects);

      projectNameInput.value = "";
      projectForm.style.display = "none";
    }
    else {
      alert("Project name cannot be empty.");
    }
    showFormButton.style.display = "block";
  });


  const storedProjects = Storage.getProjects();

  if (storedProjects) {
    Controller.Projects = storedProjects;
    ProjectView.renderProjects(Controller.Projects);
  }

});