import './styles.css';
import projectView from './pages/projectView';
import aboutPage from './pages/about';
import dashboardPage from './pages/dashboard';
import { saveToStorage, loadFromStorage } from './models/app';
import { createButton } from './components/button';
import { createTodo } from './models/todo';
import { getProjects, addNewProject, deleteProject } from './models/app';
import { createProjectForm } from './components/projectForm';
import { Plus } from 'lucide';

let topNav = document.querySelector('nav');
let sidebar = document.querySelector('.sidebar');

// initilization and state tracking
let activeProject = null;

// load a project into the main view and wire up all project/todo action callbacks
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
      deleteProject(activeProject.id);
      saveToStorage();
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
      saveToStorage();
      switchProjectView(activeProject);
    },
    (todoId) => {
      activeProject.removeTodo(todoId);
      saveToStorage();
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

// dashboard and about page loader
function loadAbout() {
  activeProject = null;
  renderSidebar();
  aboutPage();
}

function loadDashboard() {
  activeProject = null;
  renderSidebar();
  dashboardPage(
    (project) => switchProjectView(project),
    addTestData,
    () => {
      renderSidebar();
      loadDashboard();
    },
  );
}

const logo = document.querySelector('.logo');
logo.addEventListener('click', loadDashboard);

// handle new project creation and sync app state
const projectForm = createProjectForm((projectName) => {
  const newProject = addNewProject(projectName);
  saveToStorage();
  renderSidebar();
  switchProjectView(newProject);
});

document.body.appendChild(projectForm);

// sidebar with project functionality
function renderSidebar() {
  // clear the sidebar so it doesn't duplicate items if called multiple times
  sidebar.innerHTML = '';

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

  // create "New Project" button and add to sidebar
  const newProjectBtn = createButton({
    label: 'New Project',
    onClick: () => projectForm.showModal(),
    classes: ['btn', 'btn-secondary', 'pl-0'],
    icon: Plus,
  });

  sidebar.appendChild(newProjectBtn);
}

// initial render
loadFromStorage();

// test data
const addTestData = () => {
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
  workProject.addTodo(
    createTodo(
      'Schedule 1-on-1s with team',
      'Monthly check-ins with direct reports',
      '2026-03-27',
      'Medium',
      'Prepare talking points beforehand',
    ),
  );
  workProject.addTodo(
    createTodo(
      'Renew software licences',
      'Adobe, Figma and JetBrains all expire in April',
      '2026-04-05',
      'High',
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
    createTodo(
      'Book dentist appointment',
      'Overdue by 3 months',
      '2026-04-10',
      'Medium',
    ),
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
  homeProject.addTodo(
    createTodo(
      'Plant spring herbs',
      'Basil, mint and rosemary on the windowsill',
      '2026-04-12',
      'Low',
      'Buy soil and small pots from the market',
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
  learningProject.addTodo(
    createTodo(
      'Watch Fireship video on TypeScript',
      'Get a high-level overview before diving deeper',
      '2026-03-29',
      'Low',
    ),
  );
  learningProject.addTodo(
    createTodo(
      'Set up ESLint and Prettier',
      'Enforce consistent code style across all projects',
      '2026-04-03',
      'Medium',
      'Use Airbnb config as a base',
    ),
  );

  const fitnessProject = addNewProject('Fitness');
  fitnessProject.addTodo(
    createTodo(
      'Book swimming lane',
      'Wednesday evenings at the local pool',
      '2026-03-26',
      'Medium',
    ),
  );
  fitnessProject.addTodo(
    createTodo(
      'Research 5k training plan',
      'Looking for a 6-week beginner programme',
      '2026-03-28',
      'Low',
      'Check Strava and Nike Run Club',
    ),
  );
  fitnessProject.addTodo(
    createTodo(
      'Buy new running shoes',
      'Current ones are worn out',
      '2026-04-01',
      'High',
    ),
  );
  fitnessProject.addTodo(
    createTodo(
      'Schedule physio appointment',
      'Left knee has been sore after long runs',
      '2026-03-27',
      'High',
    ),
  );
  saveToStorage();
};

// render and display sideboard, header and dashboard on initial load
renderSidebar();
loadDashboard();
document.body.classList.add('loaded');
