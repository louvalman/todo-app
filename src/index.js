import './styles.css';
import projectView from './pages/projectView';
import aboutPage from './pages/about';
import dashboardPage from './pages/dashboard';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getProjects, addNewProject, deleteProject } from './models/app';
import { createProjectForm } from './components/projectForm';

let topNav = document.querySelector('nav');
let sidebar = document.querySelector('.sidebar');
let contentWrapper = document.querySelector('.content');

// initilization and state tracking
let activeProject = null;

// test data project 1
const sampleProject1 = addNewProject('Sample Project1');

const sampleTodo1 = createTodo(
  'Sample Todo 1',
  'This is a sample todo item',
  '2024-12-31',
  'High',
);
const sampleTodo2 = createTodo(
  'Sample Todo 2',
  'This is another sample todo item',
  '2024-11-30',
  'Medium',
);
sampleProject1.addTodo(sampleTodo1);
sampleProject1.addTodo(sampleTodo2);

// test data project 2
const sampleProject2 = addNewProject('Sample Project2');

const sampleTodo3 = createTodo(
  'Project Todo 1',
  'This is a todo in the sample project',
  '2024-10-15',
  'Low',
);
sampleProject2.addTodo(sampleTodo3);

// view loader and default view declaration
function switchProjectView(projectToLoad) {
  activeProject = projectToLoad;
  const sortedTodos = activeProject.getTodos().sort((a, b) => {
    return a.getStatus() - b.getStatus();
  });
  projectView(
    sortedTodos,
    activeProject.getName(),
    (todo, card, activeList, completedList) => {
      if (todo.getStatus()) {
        completedList.appendChild(card);
      } else {
        activeList.appendChild(card);
      }
    },
    () => {
      console.log(
        'deleting project:',
        activeProject.id,
        activeProject.getName(),
      );
      deleteProject(activeProject.id);
      renderSidebar();
      loadDashboard();
    },
    (todoData) => {
      const newTodo = createTodo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.notes,
      );
      activeProject.addTodo(newTodo);
      switchProjectView(activeProject);
    },
  );
}

// nav btns
let todosBtn = createButton({
  label: 'Dashboard',
  onClick: loadDashboard,
  classes: ['btn'],
});
topNav.appendChild(todosBtn);

let aboutBtn = createButton({
  label: 'About',
  onClick: loadAbout,
  classes: ['btn'],
});
topNav.appendChild(aboutBtn);

// about page loader
function loadAbout() {
  aboutPage();
}

function loadDashboard() {
  dashboardPage();
}

// handle new project creation and sync app state
const projectForm = createProjectForm((projectName) => {
  const newProject = addNewProject(projectName);
  renderSidebar();
  switchProjectView(newProject);
});

document.body.appendChild(projectForm);

// sidebar with project functionality
function renderSidebar() {
  // clear the sidebar so it doesn't duplicate items if called multiple times
  sidebar.innerHTML = '';

  // create "New Project" button and add to sidebar
  const newProjectBtn = createButton({
    label: 'New Project',
    onClick: () => projectForm.showModal(),
    classes: ['btn', 'btn-primary'],
  });

  sidebar.appendChild(newProjectBtn);

  // loop through the array and create a button for each

  const allProjects = getProjects();

  allProjects.forEach((project) => {
    let projectBtn = createButton({
      label: project.getName(),
      onClick: () => switchProjectView(project),
      classes: ['btn', 'sidebar-project-btn'],
    });

    sidebar.appendChild(projectBtn);
  });
}

// initial render
renderSidebar();
loadDashboard();
