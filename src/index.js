import "./styles.css";
import ProjectController from "./controllers/projectController.js";
import ProjectView from "./views/projectView.js";
import TaskView from "./views/Taskview.js";

const Controller = new ProjectController();

Controller.addProject("Work");
Controller.addProject("Personal");

ProjectView.renderProjects(Controller.Projects);
