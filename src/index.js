import "./styles.css";
import ProjectController from "./controllers/projectController.js";
import TaskController from "./controllers/taskController.js";
import ProjectView from "./views/projectView.js";
import Storage from "./utils/storage.js";
import TaskView from "./views/Taskview.js";

document.addEventListener("DOMContentLoaded", () => {

  const Controller = new ProjectController();

  const storedProjects = Storage.getProjects();
  console.log("Stored Projects:", storedProjects);

  if (storedProjects.length > 0) {
    Controller.Projects = storedProjects;
  } else {
    Controller.addProject("Work");
    Controller.addProject("Personal");
  }

  ProjectView.renderProjects(Controller.Projects);

  let currentProject = Controller.Projects[0];

  function initializeDefaultProject() {
    const firstProjectElement = document.querySelector(".project-item");
    if (!firstProjectElement) {
      console.error("No project items found. Initialization skipped.");
      return;
    }
    if (currentProject && currentProject.tasks) {
      firstProjectElement.classList.add("selected");
      updateTodoSection(currentProject);
    }
    else {
      console.error("No current project available.");
    }
    console.log("First project item:", firstProjectElement);

  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteProjectBtn")) {

      const projectItem = event.target.closest(".project-item"); // Get the project item container
      const projectName = projectItem.childNodes[0].textContent.trim();
      console.log("Project Name to Delete:", projectName)
      const projectIndex = Controller.Projects.findIndex(project => project.name === projectName);

      if (projectIndex !== -1) {
        const isCurrentProject = currentProject && currentProject.name === projectName;

        Controller.deleteProject(projectName);

        Storage.saveProjects(Controller.Projects);

        if (isCurrentProject) {
          if (Controller.Projects.length > 0) {
            currentProject = Controller.Projects[0];
            updateTodoSection(currentProject);
          }
          else {
            currentProject = null;
            document.querySelector('#task-list').innerHTML = '';
            document.querySelector('#current-project-name').textContent = 'No Project Selected';
          }
        }

        ProjectView.renderProjects(Controller.Projects);
        toggleAddToDoButton();
      }
    }
  });

  const showFormButton = document.querySelector("#add-project-btn");
  const projectForm = document.querySelector("#project-form")
  const projectNameInput = document.querySelector("#project-name")

  const currentProjectName = document.querySelector("#current-project-name");

  const showTaskFormButton = document.querySelector("#add-task-btn");
  const taskTitleInput = document.querySelector("#task-title");
  const taskDescInput = document.querySelector("#task-desc");
  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskPriorityInput = document.querySelector("#task-priority");


  function updateTodoSection(project) {

    console.log("Selected Project's Tasks:", project.tasks);
    if (!project || !project.tasks) {
      console.error("Project or its tasks are undefined:", project);
      return;
    }
    currentProject = project;
    currentProjectName.textContent = `Todos for: ${project.name}`;
    console.log("Current Project:", currentProject);
    TaskView.renderTask(currentProject.tasks, currentProject);

  }


  function toggleAddToDoButton() {
    if (Controller.Projects.length === 0) {
      showTaskFormButton.style.display = "none"; // Hide the button if no projects
    } else {
      showTaskFormButton.style.display = "block"; // Show the button if projects exist
    }
  }

  initializeDefaultProject();

  showFormButton.addEventListener("click", () => {
    projectForm.style.display = projectForm.style.display === "none" ? "block" : "none";
    showFormButton.style.display = "none";
  })

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value.trim();

    if (projectName) {

      if (Controller.Projects.some(project => project.name === projectName)) {
        alert("Project with this name already exists.");
        return;
      }

      Controller.addProject(projectName);
      Storage.saveProjects(Controller.Projects);
      ProjectView.renderProjects(Controller.Projects);
      toggleAddToDoButton();
      if (Controller.Projects.length === 1) {
        currentProject = Controller.Projects[0];
        updateTodoSection(currentProject);
      }

      projectNameInput.value = "";
      projectForm.style.display = "none";
    }
    else {
      alert("Project name cannot be empty.");
    }
    showFormButton.style.display = "block";
  });


  document.addEventListener("click", (event) => {
    if (!projectForm.contains(event.target) && event.target !== showFormButton) {
      projectForm.style.display = "none";
      showFormButton.style.display = "block";
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("project-item")) {
      const projectItem = event.target.closest(".project-item");
      const projectName = projectItem.childNodes[0].textContent.trim();
      // const projectName = event.target.textContent.trim();
      console.log(projectName);
      const selectedProject = Controller.Projects.find(
        (project) => project.name === projectName
      );

      console.log(selectedProject);

      if (selectedProject) {
        updateTodoSection(selectedProject);

        document.querySelectorAll(".project-item").forEach((item) => {
          item.classList.remove("selected");
        });

        event.target.classList.add("selected");

      } else {
        console.error("Selected project not found!");
      }
    }
  });

  // Task Section

  const addDialog = document.querySelector("#add-task-dialog");
  showTaskFormButton.addEventListener("click", () => {
    addDialog.showModal();
    showTaskFormButton.style.display = "none";
  });



  document.querySelector("#add-task").addEventListener("click", (e) => {
    e.preventDefault();

    const taskTitle = taskTitleInput.value.trim();
    const taskDesc = taskDescInput.value.trim();
    const taskDueDate = taskDueDateInput.value;
    const taskPriority = taskPriorityInput.value;

    if (taskTitle) {

      const task = {
        title: taskTitle,
        description: taskDesc || "No description provided",
        dueDate: taskDueDate || "No due date",
        priority: taskPriority || "low",
      }
      const taskController = new TaskController(currentProject);
      console.log("Before adding task:", currentProject.tasks);
      taskController.addTask(task);
      console.log("After adding task:", currentProject.tasks);

      Storage.saveProjects(Controller.Projects);
      updateTodoSection(currentProject);

      // Clear inputs
      taskTitleInput.value = "";
      taskDescInput.value = "";
      taskDueDateInput.value = "";
      taskPriorityInput.value = "low";

      addDialog.close();
      showTaskFormButton.style.display = "block";
    } else {
      alert("Task title cannot be empty!");
    }

  });

  document.querySelector("#cancel-add-task").addEventListener("click", () => {
    addDialog.close();
    showTaskFormButton.style.display = "block";
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task-btn")) {
      const taskId = event.target.getAttribute("data-id");
      console.log("Task ID to delete:", taskId);

      if (currentProject) {
        const taskController = new TaskController(currentProject);

        taskController.deleteTask(taskId);

        Storage.saveProjects(Controller.Projects);

        TaskView.renderTask(currentProject.tasks, currentProject);
      } else {
        console.error("No project selected!");
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-task-btn")) {
      const taskId = event.target.getAttribute("data-id");
      const taskToEdit = currentProject.tasks.find(task => task.id === taskId);

      if (taskToEdit) {
        const editDialog = document.querySelector("#edit-task-dialog");

        document.querySelector("#edit-task-title").value = taskToEdit.title;
        document.querySelector("#edit-task-desc").value = taskToEdit.description;
        document.querySelector("#edit-task-due-date").value = taskToEdit.dueDate;
        document.querySelector("#edit-task-priority").value = taskToEdit.priority;

        showTaskFormButton.style.display = "none";

        editDialog.setAttribute("data-task-id", taskId);
        editDialog.showModal(); // Open the dialog
      }
    }
  });

  const editDialog = document.querySelector("#edit-task-dialog");

  document.querySelector("#save-edit-task").addEventListener("click", (e) => {
    e.preventDefault();

    const taskId = editDialog.getAttribute("data-task-id");

    const updatedTaskData = {
      title: document.querySelector("#edit-task-title").value.trim(),
      description: document.querySelector("#edit-task-desc").value.trim(),
      dueDate: document.querySelector("#edit-task-due-date").value,
      priority: document.querySelector("#edit-task-priority").value,
    };

    const taskController = new TaskController(currentProject);
    taskController.editTask(taskId, updatedTaskData);

    Storage.saveProjects(Controller.Projects);
    updateTodoSection(currentProject);

    showTaskFormButton.style.display = "block";
    editDialog.close();
  });

  document.querySelector("#cancel-edit-task").addEventListener("click", () => {
    editDialog.close();
    showTaskFormButton.style.display = "block";
  });

});