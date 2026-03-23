import { createButton } from './button';
import { createTodoForm } from './todoForm';
import { createElement, Check, Pencil, Trash2, ChevronDown } from 'lucide';

export const createTodoCard = (
  todo,
  onToggle,
  activeListContainer,
  completedListContainer,
) => {
  // create the container
  const card = document.createElement('div');
  card.classList.add(
    'todo-card',
    `priority-${todo.getPriority().toLowerCase()}`,
  );
  card.setAttribute('data-id', todo.id);

  // create title and buttons container
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('todo-title');

  // create title
  const title = document.createElement('h4');
  title.textContent = todo.getTitle();

  // priority pill
  const priorityPill = document.createElement('span');
  priorityPill.classList.add(
    'priority-pill',
    `priority-${todo.getPriority().toLowerCase()}`,
  );
  priorityPill.textContent = todo.getPriority();

  const titlePillContainer = document.createElement('div');
  titlePillContainer.classList.add('title-pill-container');
  titlePillContainer.append(title, priorityPill);

  // create buttons container
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('todo-btns');

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

  // create expand button with placeholder onClick - real handler added after expandedSection is defined
  const expandBtn = createButton({
    label: '',
    classes: ['btn-icon', 'btn-expand'],
    icon: ChevronDown,
    onClick: () => {},
  });

  btnContainer.append(toggleBtn, expandBtn);
  titleContainer.append(titlePillContainer, btnContainer);

  // create description
  const desc = document.createElement('p');
  desc.textContent = todo.getDescription();

  // create due date
  const dueDate = document.createElement('small');
  dueDate.textContent = `Due: ${todo.getDueDate()}`;

  // expand section (hidden by default via css)
  const expandedSection = document.createElement('div');
  expandedSection.classList.add('expanded-section');

  // notes
  const notes = document.createElement('div');
  notes.classList.add('todo-notes');
  notes.textContent = todo.getNotes() || 'No additional notes.';

  // edit button
  const editBtn = createButton({
    label: 'Edit',
    classes: ['btn-icon', 'btn-edit', 'expanded-btn'],
    icon: Pencil,
    onClick: (e) => {
      e.stopPropagation();

      // remove existing edit modal if present
      const existingEditModal = document.querySelector(
        '.modal.edit-todo-modal',
      );
      if (existingEditModal) existingEditModal.remove();

      const editForm = createTodoForm((todoData) => {
        todo.update(todoData);
        // update DOM elements directly
        title.textContent = todo.getTitle();
        desc.textContent = todo.getDescription();
        dueDate.textContent = `Due: ${todo.getDueDate()}`;
        notes.textContent = todo.getNotes() || 'No additional notes.';
        // update priority dot
        card.className = '';
        card.classList.add(
          'todo-card',
          `priority-${todo.getPriority().toLowerCase()}`,
        );
      }, todo);

      editForm.classList.add('edit-todo-modal');
      document.body.appendChild(editForm);
      editForm.showModal();
    },
  });

  // delete button
  const deleteBtn = createButton({
    label: 'Delete',
    classes: ['btn-icon', 'btn-delete', 'expanded-btn'],
    icon: Trash2,
    onClick: () => {
      console.log(`Deleting todo: ${todo.id}`);
    },
  });

  // expanded actions container
  const expandedActions = document.createElement('div');
  expandedActions.classList.add('expanded-actions');
  expandedActions.append(editBtn, deleteBtn);

  expandedSection.append(notes, expandedActions);

  // toggle helper - defined after expandedSection exists
  const toggleExpand = () => {
    expandedSection.classList.toggle('open');
    expandBtn.classList.toggle('open');
  };

  // wire up expand button and card click
  expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleExpand();
  });
  card.addEventListener('click', (e) => {
    if (e.target.closest('.btn-icon')) return;
    toggleExpand();
  });

  card.append(titleContainer, desc, dueDate, expandedSection);

  return card;
};
