import { getProjects, getProjectById } from '../models/app';
import { createButton } from '../components/button';
import { createStatCard } from '../components/statCard';

function dashboardPage(onProjectSelect, onAddTestData) {
  const contentWrapper = document.querySelector('.content');
  contentWrapper.innerHTML = '';

  const dashboardWrapper = document.createElement('div');
  dashboardWrapper.classList.add('dashboard-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'Dashboard';

  const clearBtn = createButton({
    label: 'Clear Data',
    classes: ['btn-small', 'red'],
    onClick: () => {
      localStorage.clear();
      location.reload();
    },
  });

  const addDataBtn = createButton({
    label: 'Add Data',
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
  titleRow.append(title, btnContainer);

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
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };

  allTodosWithProject.sort(
    (a, b) =>
      priorityOrder[a.todo.getPriority()] - priorityOrder[b.todo.getPriority()],
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
    dueDate.textContent = `Due: ${new Date(todo.getDueDate()).toLocaleDateString()}`;

    titleRow.append(titleEl, priorityPill);
    todoItem.append(titleRow, projectLabel, dueDate);
    todoList.appendChild(todoItem);
  });

  dashboardWrapper.append(titleRow, statsContainer, todoList);
  contentWrapper.appendChild(dashboardWrapper);
}

export default dashboardPage;
