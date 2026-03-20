import { createButton } from './button';
import { Check, Trash2 } from 'lucide';

export const createTodoCard = (todo, onToggle, activeListContainer, completedListContainer) => {
  // create the container
  const card = document.createElement('div');
  card.classList.add('todo-card', `priority-${todo.priority.toLowerCase()}`);
  card.setAttribute('data-id', todo.id);

  // create title and buttons container
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('todo-title');
  card.appendChild(titleContainer);

  // create title
  const title = document.createElement('h4');
  title.textContent = todo.title;
  titleContainer.appendChild(title);

  // create todoButtons container
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('todo-btns');
  titleContainer.appendChild(btnContainer);

  // create toggle button
  const toggleBtn = createButton({
    label: '',
    classes: ['btn-icon', 'btn-toggle'],
    icon: Check,
    onClick: () => {
      todo.toggleComplete();
      toggleBtn.classList.toggle('completed', todo.getStatus());
      title.classList.toggle('completed', todo.getStatus());
      onToggle(todo, card, activeListContainer, completedListContainer);
    },
  });

  if (todo.getStatus()) {
    toggleBtn.classList.add('completed');
    title.classList.add('completed');
  }

  // create delete button
  const deleteBtn = createButton({
    label: '',
    classes: ['btn-icon', 'btn-delete'],
    icon: Trash2,
    onClick: () => {
      // tbd: implement delete functionality
      console.log(`Deleting todo: ${todo.id}`);
    },
  });

  btnContainer.append(toggleBtn, deleteBtn);

  // create description
  const desc = document.createElement('p');
  desc.textContent = todo.description;

  // create info/due date
  const dueDate = document.createElement('small');
  dueDate.textContent = `Due: ${todo.dueDate}`;

  // append elements
  card.append(titleContainer, desc, dueDate);

  return card;
};
