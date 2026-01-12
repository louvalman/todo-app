import './styles.css';
import todosPage from './pages/todos';
import projectsPage from './pages/projects';
import aboutPage from './pages/about';
import contactPage from './pages/contact';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { createProject } from './models/project';

let nav = document.querySelector('nav');
let contentWrapper = document.querySelector('.content');

let todosBtn = createButton({
  label: 'Todos',
  onClick: loadTodos,
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

function loadTodos() {
  todosPage(myFirstTasks);
}

function loadProjects() {
  projectsPage();
}

function loadAbout() {
  aboutPage();
}

function loadContact() {
  contactPage();
}

const firstTodo = createTodo(
  'Sample Todo',
  'This is a sample todo item.',
  '2024-12-31',
  'High',
  'Some notes here.'
);

const secondTodo = createTodo(
  'Sample Todo2',
  'This is a sample todo item.',
  '2024-12-31',
  'High',
  'Some notes here.'
);

const myFirstTasks = [firstTodo, secondTodo];

const firstProject = createProject('Sample Project');
firstProject.addTodo(firstTodo);
firstProject.addTodo(secondTodo);

console.log('Test Project Name:', firstProject.getName());
console.log('Test Project Todos:', firstProject.getTodos());

console.log('Test Todo Object:', firstTodo);
