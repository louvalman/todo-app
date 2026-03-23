import { createButton } from './button';
import { createElement, Check, Trash2, ChevronDown, ChevronUp } from 'lucide';

export const createTodoCard = (
  todo,
  onToggle,
  activeListContainer,
  completedListContainer,
) => {
  // create the container
  const card = document.createElement('div');
  card.classList.add('todo-card', `priority-${todo.priority.toLowerCase()}`);
  card.setAttribute('data-id', todo.id);

  // create title and buttons container
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('todo-title');

  // create title
  const title = document.createElement('h4');
  title.textContent = todo.title;

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
  titleContainer.append(title, btnContainer);

  // create description
  const desc = document.createElement('p');
  desc.textContent = todo.description;

  // create due date
  const dueDate = document.createElement('small');
  dueDate.textContent = `Due: ${todo.dueDate}`;

  // expand section (hidden by default via css)
  const expandedSection = document.createElement('div');
  expandedSection.classList.add('expanded-section');

  // notes
  const notes = document.createElement('div');
  notes.classList.add('todo-notes');
  notes.textContent = todo.notes || 'No additional notes.';

  // delete button
  const deleteBtn = createButton({
    label: '',
    classes: ['btn-icon', 'btn-delete'],
    icon: Trash2,
    onClick: () => {
      console.log(`Deleting todo: ${todo.id}`);
    },
  });

  expandedSection.append(notes, deleteBtn);

  // toggle helper - defined after expandedSection exists
  const toggleExpand = () => {
    const isOpen = expandedSection.classList.contains('open');
    expandedSection.classList.toggle('open');
    const svg = expandBtn.querySelector('svg');
    if (svg) console.log('expandBtn contents:', expandBtn.innerHTML);
    console.log('svg found:', expandBtn.querySelector('svg'));
    svg.replaceWith(
      createElement(isOpen ? ChevronDown : ChevronUp, { size: 18 }),
    );
  };

  // wire up expand button and card click
  expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('expandBtn listener fired');
    toggleExpand();
  });
  card.addEventListener('click', (e) => {
    if (e.target.closest('.btn-icon')) return;
    toggleExpand();
  });

  card.append(titleContainer, desc, dueDate, expandedSection);

  return card;
};
