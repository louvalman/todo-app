import './styles.css';
import todosPage from './pages/todos';
import projectsPage from './pages/projects';
import aboutPage from './pages/about';
import contactPage from './pages/contact';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getDefaultProject, getProjects, addNewProject } from './models/app';

let nav = document.querySelector('nav');
let contentWrapper = document.querySelector('.content');

// test git branch strategy working

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
getProjects().push(sampleProject);

// view loader and default view declaration
function switchProjectView(projectToLoad) {
  activeProject = projectToLoad;
  todosPage(activeProject.getTodos());
}

// nav btns
let todosBtn = createButton({
  label: 'Todos',
  onClick: () => switchProjectView(defaultProject),
  classes: ['btn'],
});
nav.appendChild(todosBtn);

let projectsBtn = createButton({
  label: 'Projects',
  onClick: loadProjects,
  classes: ['btn'],
});
nav.appendChild(projectsBtn);

let aboutBtn = createButton({
  label: 'About',
  onClick: loadAbout,
  classes: ['btn'],
});
nav.appendChild(aboutBtn);

let contactBtn = createButton({
  label: 'Contact',
  onClick: loadContact,
  classes: ['btn'],
});
nav.appendChild(contactBtn);

function loadProjects() {
  projectsPage();
}

function loadAbout() {
  aboutPage();
}

function loadContact() {
  contactPage();
}

// start by showing default project
switchProjectView(defaultProject);
