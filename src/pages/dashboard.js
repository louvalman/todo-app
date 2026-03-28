import { getProjects, getProjectById } from '../models/app';
import { createButton } from '../components/button';
import { createStatCard } from '../components/statCard';
import { format, isPast, isToday } from 'date-fns';
import autoAnimate from '@formkit/auto-animate';

function dashboardPage(onProjectSelect, onAddTestData) {
  const contentWrapper = document.querySelector('.content');
  contentWrapper.innerHTML = '';

  const dashboardWrapper = document.createElement('div');
  dashboardWrapper.classList.add('dashboard-wrapper');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'Good evening';
    if (hour < 9) return 'Good morning, early bird';
    if (hour < 12) return 'Good morning';
    if (hour < 13) return 'Almost lunchtime';
    if (hour < 18) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Winding down?';
  };

  const title = document.createElement('h3');
  title.textContent = `${getGreeting()}, here’s your overview`;

  const clearBtn = createButton({
    label: 'Clear Data',
    classes: ['btn-small', 'red'],
    onClick: () => {
      localStorage.clear();
      location.reload();
    },
  });

  const addDataBtn = createButton({
    label: 'Add Test Data',
    classes: ['btn-small'],
    onClick: () => {
      onAddTestData();
      location.reload();
    },
  });

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('dashboard-btns');
  btnContainer.append(addDataBtn, clearBtn);

  const titleRow = document.createElement('div');
  titleRow.classList.add('title-row');
  titleRow.append(title);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');
  autoAnimate(contentContainer, { duration: 600, easing: 'ease-out' });

  // get all todos from all projects
  const allTodos = getProjects().flatMap((project) => project.getTodos());

  // calculate datapoints for dashboard
  const totalTodos = allTodos.length;
  const completedTodos = allTodos.filter((todo) => todo.getStatus()).length;
  const highPriorityTodos = allTodos.filter(
    (todo) => !todo.getStatus() && todo.getPriority() === 'High',
  ).length;
  const overdueTodos = allTodos.filter(
    (todo) => !todo.getStatus() && new Date(todo.getDueDate()) < new Date(),
  ).length;

  // stats container
  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-container');
  autoAnimate(statsContainer);

  statsContainer.append(
    createStatCard('Total Tasks', totalTodos),
    createStatCard('Completed Tasks', completedTodos),
    createStatCard('High Priority Tasks', highPriorityTodos),
    createStatCard('Overdue Tasks', overdueTodos),
  );

  // get all incomplete todos with their project name, sorted by due date
  const allTodosWithProject = getProjects().flatMap((project) =>
    project
      .getTodos()
      .filter((todo) => !todo.getStatus())
      .map((todo) => ({
        todo,
        projectName: project.getName(),
        projectId: project.id,
      })),
  );

  // sort by priority
  allTodosWithProject.sort(
    (a, b) => new Date(a.todo.getDueDate()) - new Date(b.todo.getDueDate()),
  );

  // todo list
  const todoList = document.createElement('div');
  todoList.classList.add('todo-list');

  allTodosWithProject.forEach(({ todo, projectName, projectId }) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    todoItem.addEventListener('click', () => {
      const project = getProjectById(projectId);
      if (project) onProjectSelect(project);
    });

    const titleRow = document.createElement('div');
    titleRow.classList.add('title-pill-container');

    const titleEl = document.createElement('h4');
    titleEl.textContent = todo.getTitle();

    const priorityPill = document.createElement('span');
    priorityPill.classList.add(
      'priority-pill',
      `priority-${todo.getPriority().toLowerCase()}`,
    );
    priorityPill.textContent = todo.getPriority();

    const projectLabel = document.createElement('p');
    projectLabel.textContent = projectName;
    projectLabel.classList.add('todo-project-label');

    const dueDate = document.createElement('small');
    if (todo.getDueDate()) {
      const date = new Date(todo.getDueDate());
      if (isToday(date)) {
        dueDate.textContent = 'Due today';
        dueDate.classList.add('due-today');
      } else if (isPast(date)) {
        dueDate.textContent = `Overdue — ${format(date, 'MMM d, yyyy')}`;
        dueDate.classList.add('due-overdue');
      } else {
        dueDate.textContent = `Due: ${format(date, 'MMM d, yyyy')}`;
      }
    } else {
      dueDate.textContent = 'No due date';
      dueDate.classList.add('due-none');
    }

    titleRow.append(titleEl, priorityPill);
    todoItem.append(titleRow, projectLabel, dueDate);
    todoList.appendChild(todoItem);
  });

  dashboardWrapper.append(
    titleRow,
    statsContainer,
    contentContainer,
    btnContainer,
  );
  contentContainer.append(todoList);
  contentWrapper.appendChild(dashboardWrapper);
}

export default dashboardPage;
