import { createButton } from './button';
import { createModal } from './modal';

const createInputGroup = (labelText, inputElement) => {
  const group = document.createElement('div');
  group.classList.add('input-field-group');

  const label = document.createElement('label');
  label.textContent = labelText;

  group.append(label, inputElement);
  return group;
};

export const createTodoForm = (onSubmit, existingTodo = null) => {
  const todoForm = document.createElement('form');
  todoForm.classList.add('project-form');

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  // name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'todo-name';
  nameInput.name = 'todo-name';
  nameInput.required = true;

  // description
  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'todo-description';
  descriptionInput.name = 'todo-description';

  // date
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.id = 'todo-due-date';
  dateInput.name = 'todo-due-date';

  // priority
  const prioritySelect = document.createElement('select');
  prioritySelect.id = 'todo-priority';
  prioritySelect.name = 'todo-priority';
  ['Low', 'Medium', 'High'].forEach((level) => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    prioritySelect.appendChild(option);
  });

  // notes
  const notesInput = document.createElement('textarea');
  notesInput.id = 'todo-notes';
  notesInput.name = 'todo-notes';

  inputGroup.append(
    createInputGroup('Todo Name', nameInput),
    createInputGroup('Description', descriptionInput),
    createInputGroup('Due Date', dateInput),
    createInputGroup('Priority', prioritySelect),
    createInputGroup('Notes', notesInput),
  );

  // pre-fill inputs if editing an existing todo
  if (existingTodo) {
    nameInput.value = existingTodo.getTitle();
    descriptionInput.value = existingTodo.getDescription();
    dateInput.value = existingTodo.getDueDate();
    prioritySelect.value = existingTodo.getPriority();
    notesInput.value = existingTodo.getNotes() || '';
  }

  const modalTitle = existingTodo ? 'Edit Todo' : 'Create New Todo';
  const submitLabel = existingTodo ? 'Save' : 'Create';

  const createTodoModal = createModal(modalTitle, todoForm);

  // buttons
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('form-actions');

  const cancelBtn = createButton({
    label: 'Cancel',
    classes: ['btn-ghost'],
    onClick: (e) => {
      e.preventDefault();
      createTodoModal.close();
    },
  });

  const submitBtn = createButton({
    label: submitLabel,
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
        onSubmit(todoData);
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
