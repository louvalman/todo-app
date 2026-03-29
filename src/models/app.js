import { createProject } from './project';
import { createTodo } from './todo';

// central state - private

// initiatlize list of projects to allow us to have multiple projects
let projects = [];

// exported functions (the API)
export const getProjects = () => [...projects];

// create a new project, save it and return it
export const addNewProject = (name) => {
  const newProject = createProject(name);
  projects.push(newProject);
  return newProject;
};

// delete a project by .filtering it out of the projects array
export const deleteProject = (id) => {
  projects = projects.filter((project) => project.id !== id);
  console.log(
    'projects remaining:',
    projects.length,
    projects.map((p) => p.getName()),
  );
};

// clear all projects
export const clearProjects = () => {
  projects = [];
};

// find a project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

// save projects to local storage
export const saveToStorage = () => {
  localStorage.setItem(
    'projects',
    JSON.stringify(
      getProjects().map((project) => ({
        id: project.id,
        name: project.getName(),
        todos: project.getTodos().map((todo) => ({
          id: todo.id,
          title: todo.getTitle(),
          description: todo.getDescription(),
          dueDate: todo.getDueDate(),
          priority: todo.getPriority(),
          notes: todo.getNotes(),
          checklist: todo.checklist,
          isComplete: todo.getStatus(),
        })),
      })),
    ),
  );
};

// load projects from local storage
export const loadFromStorage = () => {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = storedProjects.map((projectData) => {
    const project = createProject(projectData.name, projectData.id);

    projectData.todos.forEach((todoData) => {
      const todo = createTodo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.notes,
        todoData.checklist,
        todoData.id,
      );
      if (todoData.isComplete) todo.toggleComplete();
      project.addTodo(todo);
    });

    return project;
  });
};
