import './styles.css';
import todosPage from './pages/todos';
import projectsPage from './pages/projects';
import aboutPage from './pages/about';
import contactPage from './pages/contact';
import { createButton } from './components/button';
import { createTodo } from './models/todo';

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
  contentWrapper.innerHTML = '';
  todosPage();
}

function loadProjects() {
  contentWrapper.innerHTML = '';
  projectsPage();
}

function loadAbout() {
  contentWrapper.innerHTML = '';
  aboutPage();
}

function loadContact() {
  contentWrapper.innerHTML = '';
  contactPage();
}

todosPage();
