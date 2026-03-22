import { createButton } from './button';
import { createModal } from './modal';

export const createTodoForm = (onSubmit) => {
  const todoForm = document.createElement('form');
  todoForm.classList.add('project-form');

  // input group
  // name
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'todo-name');
  nameLabel.textContent = 'Todo Name';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'todo-name';
  nameInput.name = 'todo-name';
  nameInput.required = true;

  // description
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'todo-description');
  descriptionLabel.textContent = 'Todo Description';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'todo-description';
  descriptionInput.name = 'todo-description';

  // date
  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'todo-due-date');
  dateLabel.textContent = 'Due Date';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.id = 'todo-due-date';
  dateInput.name = 'todo-due-date';

  // priority
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'todo-priority');
  priorityLabel.textContent = 'Priority';

  const prioritySelect = document.createElement('select');
  prioritySelect.id = 'todo-priority';
  prioritySelect.name = 'todo-priority';

  ['Low', 'Medium', 'High'].forEach((level) => {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    prioritySelect.appendChild(option);
  });

  // notes
  const notesLabel = document.createElement('label');
  notesLabel.setAttribute('for', 'todo-notes');
  notesLabel.textContent = 'Notes';

  const notesInput = document.createElement('textarea');
  notesInput.id = 'todo-notes';
  notesInput.name = 'todo-notes';

  inputGroup.append(
    nameLabel,
    nameInput,
    descriptionLabel,
    descriptionInput,
    dateLabel,
    dateInput,
    priorityLabel,
    prioritySelect,
    notesLabel,
    notesInput,
  );

  const createTodoModal = createModal('Create New Todo', todoForm);

  // buttons
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('form-actions');

  const cancelBtn = createButton({
    label: 'Cancel',
    classes: ['btn-ghost'],
    onClick: (e) => {
      e.preventDefault();
      createTodoModal.close();
      console.log('closing dialog');
    },
  });

  const submitBtn = createButton({
    label: 'Create',
    classes: ['btn-primary'],
    onClick: (e) => {
      e.preventDefault();
      const todoData = {
        title: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        dueDate: dateInput.value,
        priority: prioritySelect.value,
        notes: notesInput.value.trim(),
      };
      if (todoData.title) {
        createTodoModal.close();
        console.log('closing dialog');
        onSubmit(todoData);
        // reset form
        nameInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
        prioritySelect.value = 'low';
        notesInput.value = '';
      }
    },
  });

  btnContainer.append(cancelBtn, submitBtn);
  todoForm.append(inputGroup, btnContainer);

  return createTodoModal;
};
