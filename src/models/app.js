import { createProject } from './project';

// central state - private

// initiatlize list of projects to allow us to have multiple projects
const projects = [];

// exported functions (the API)
export const getProjects = () => [...projects];

// create a new project, save it and return it
export const addNewProject = (name) => {
  const newProject = createProject(name);
  projects.push(newProject);
  return newProject;
};

// find a project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};
