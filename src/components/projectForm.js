import { createButton } from './button';
import { createModal } from './modal';

export const createProjectForm = (onSubmit) => {
  const form = document.createElement('form');
  form.classList.add('project-form');

  // input group
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  const label = document.createElement('label');
  label.setAttribute('for', 'project-name');
  label.textContent = 'Project Name';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'project-name';
  input.name = 'project-name';
  input.required = true;

  inputGroup.append(label, input);

  const createProjectModal = createModal('Create New Project', form);

  // buttons
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('form-actions');

  const cancelBtn = createButton({
    label: 'Cancel',
    classes: ['btn-ghost'],
    onClick: (e) => {
      e.preventDefault();
      console.log('closing dialog');
      createProjectModal.close();
    },
  });

  const submitBtn = createButton({
    label: 'Create',
    classes: ['btn-primary'],
    onClick: (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (name) {
        onSubmit(name);
        input.value = '';
        console.log('closing dialog');
        createProjectModal.close();
      }
    },
  });

  btnContainer.append(cancelBtn, submitBtn);
  form.append(inputGroup);
  createProjectModal.appendChild(btnContainer);

  return createProjectModal;
};
