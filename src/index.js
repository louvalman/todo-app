import './styles.css';
import todosPage from './pages/todos';
import aboutPage from './pages/about';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getDefaultProject, getProjects, addNewProject } from './models/app';

let nav = document.querySelector('nav');

// initilization and state tracking
let activeProject = null;
const defaultProject = getDefaultProject();

// test data
const demoTodo1 = createTodo(
  'Refactor Code',
  'Move state to app.js',
  'Today',
  'High'
);
const demoTodo2 = createTodo(
  'Refactor Code2',
  'Move state to app.js2',
  'Today2',
  'High2'
);
const demoTodo3 = createTodo(
  'Refactor Code3',
  'Move state to app.js3',
  'Today3',
  'High3'
);
defaultProject.addTodo(demoTodo1);
defaultProject.addTodo(demoTodo2);
defaultProject.addTodo(demoTodo3);

// view loader and default view declaration
function switchProjectView(projectToLoad) {
  activeProject = projectToLoad;
  todosPage(activeProject.getTodos());
}

// nav btns
let todosBtn = createButton({
  label: 'Inbox',
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
