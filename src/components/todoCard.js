import { createButton } from './button';

export const createTodoCard = (todo) => {
  // create the container
  const card = document.createElement('div');
  card.classList.add('todo-card');
  card.setAttribute('data-id', todo.id);

  // create title
  const title = document.createElement('h4');
  title.textContent = todo.title; // Secure! Treats input as text only

  // create description
  const desc = document.createElement('p');
  desc.textContent = todo.description;

  // create info/due date
  const dueDate = document.createElement('small');
  dueDate.textContent = `Due: ${todo.dueDate}`;

  // create buttons
  const toggleBtn = createButton({
    label: todo.getStatus() ? 'Done' : 'Pending',
    classes: ['btn', 'btn-card', 'btn-toggle'],
    onClick: () => {
      todo.toggleComplete();
      toggleBtn.textContent = todo.getStatus() ? 'Done' : 'Pending';
    },
  });

  const deleteBtn = createButton({
    label: 'Delete',
    classes: ['btn', 'btn-card', 'btn-delete'],
    onClick: () => {
      // tbd: implement delete functionality
      console.log(`Deleting todo: ${todo.id}`);
    },
  });

  // create actions container
  const actions = document.createElement('div');
  actions.classList.add('todo-actions');

  // append elements
  actions.append(toggleBtn, deleteBtn);
  card.append(title, desc, dueDate, actions);

  return card;
};
