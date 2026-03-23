import './styles.css';
import projectView from './pages/projectView';
import aboutPage from './pages/about';
import dashboardPage from './pages/dashboard';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getProjects, addNewProject, deleteProject } from './models/app';
import { createProjectForm } from './components/projectForm';
import { Plus } from 'lucide';

let topNav = document.querySelector('nav');
let sidebar = document.querySelector('.sidebar');
let contentWrapper = document.querySelector('.content');

// initilization and state tracking
let activeProject = null;

// test data
const workProject = addNewProject('Work');
workProject.addTodo(
  createTodo(
    'Prepare Q2 presentation',
    'Slides for the quarterly review meeting',
    '2026-04-15',
    'High',
    'Include budget overview and team updates',
  ),
);
workProject.addTodo(
  createTodo(
    'Review pull requests',
    'Go through open PRs on the main repo',
    '2026-03-25',
    'Medium',
  ),
);
workProject.addTodo(
  createTodo(
    'Update project documentation',
    'Reflect recent architecture changes in the docs',
    '2026-04-01',
    'Low',
  ),
);

const homeProject = addNewProject('Home');
homeProject.addTodo(
  createTodo(
    'Fix kitchen faucet',
    'Dripping when turned off — needs new washer',
    '2026-03-28',
    'High',
  ),
);
homeProject.addTodo(
  createTodo('Book dentist appointment', '', '2026-04-10', 'Medium'),
);
homeProject.addTodo(
  createTodo(
    'Clean out garage',
    'Sort boxes and donate unused items',
    '2026-04-20',
    'Low',
    'Check if old bike is worth keeping',
  ),
);
homeProject.addTodo(
  createTodo(
    'Renew home insurance',
    'Policy expires end of April',
    '2026-04-30',
    'High',
  ),
);

const learningProject = addNewProject('Learning');
learningProject.addTodo(
  createTodo(
    'Finish Odin todo app',
    'Implement localStorage and remaining features',
    '2026-03-30',
    'High',
  ),
);
learningProject.addTodo(
  createTodo(
    'Read YDKJS: Async & Performance',
    'Focus on promises and async/await chapters',
    '2026-04-05',
    'Medium',
    'Take notes on event loop section',
  ),
);
learningProject.addTodo(
  createTodo(
    'Practice CSS Grid',
    'Build a small layout exercise',
    '2026-04-12',
    'Low',
  ),
);

// view loader and default view declaration
function switchProjectView(projectToLoad) {
  activeProject = projectToLoad;
  renderSidebar();
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
  classes: ['btn', 'nav-btn'],
});
topNav.appendChild(todosBtn);

let aboutBtn = createButton({
  label: 'About',
  onClick: loadAbout,
  classes: ['btn', 'nav-btn'],
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
    classes: ['btn', 'btn-secondary', 'pl-0'],
    icon: Plus,
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

    if (activeProject && project.id === activeProject.id) {
      projectBtn.classList.add('active');
    }

    sidebar.appendChild(projectBtn);
  });
}

// initial render
renderSidebar();
loadDashboard();
