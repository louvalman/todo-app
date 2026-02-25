import './styles.css';
import todosPage from './pages/todos';
import aboutPage from './pages/about';
import dashboardPage from './pages/dashboard';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getDefaultProject, getProjects, addNewProject } from './models/app';

let topNav = document.querySelector('nav');
let sidebar = document.querySelector('.sidebar');
let contentWrapper = document.querySelector('.content');

// initilization and state tracking
let activeProject = null;
const defaultProject = getDefaultProject();

// test data
const sampleTodo1 = createTodo(
  'Sample Todo 1',
  'This is a sample todo item',
  '2024-12-31',
  'High'
);
const sampleTodo2 = createTodo(
  'Sample Todo 2',
  'This is another sample todo item',
  '2024-11-30',
  'Medium'
);
defaultProject.addTodo(sampleTodo1);
defaultProject.addTodo(sampleTodo2);

const sampleProject = addNewProject('Sample Project');

const sampleTodo3 = createTodo(
  'Project Todo 1',
  'This is a todo in the sample project',
  '2024-10-15',
  'Low'
);
sampleProject.addTodo(sampleTodo3);

// view loader and default view declaration
function switchProjectView(projectToLoad) {
  activeProject = projectToLoad;
  todosPage(activeProject.getTodos());
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

// sidebar project buttons
function renderSidebar() {
  // 1. Clear the sidebar so it doesn't duplicate items if called multiple times
  sidebar.innerHTML = '';

  const allProjects = getProjects();

  // 2. Loop through the array and create a button for each
  allProjects.forEach((project) => {
    // Optional logic to think about:
    // Do we want to skip the Default Project here since it's already in the Top Nav?
    // if (project.id === defaultProject.id) return;

    let projectBtn = createButton({
      label: project.getName(),
      onClick: () => switchProjectView(project),
      classes: ['btn', 'sidebar-project-btn'],
    });

    sidebar.appendChild(projectBtn);
  });
}

// start by showing default project
renderSidebar();
loadDashboard();
