import { createButton } from './button';

export const createProjectForm = (onSubmit) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('project-modal');

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

    // buttons
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('form-actions');

    const cancelBtn = createButton({
        label: 'Cancel',
        classes: ['btn', 'btn-ghost'],
        onClick: (e) => {
            e.preventDefault();
            dialog.close();
        }
    });

    const submitBtn = createButton({
        label: 'Create',
        classes: ['btn', 'btn-primary'],
        onClick: (e) => {
            e.preventDefault();
            const name = input.value.trim();
            if (name) {
                onSubmit(name);
                input.value = '';
                dialog.close();
            }
        }
    });

    btnContainer.append(cancelBtn, submitBtn);
    form.append(inputGroup, btnContainer);
    dialog.appendChild(form);

    return dialog;
};