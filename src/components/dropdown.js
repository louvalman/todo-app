import { createButton } from './button';
import { createElement } from 'lucide';

export function createDropdown({ label, options, multiSelect = false, onChange, icon = null }) {

    // create dropdown wrapper, trigger and panel
    const wrapper = document.createElement('div');
    wrapper.classList.add('dropdown');

    // replace the manual trigger creation with:
    const trigger = createButton({
        label: label,
        classes: ['btn', 'dropdown-trigger'],
        icon: icon, // add icon as a parameter to createDropdown
    });

    // toggle dropdown panel visibility
    trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // close all other open dropdown panels
    document.querySelectorAll('.dropdown-panel').forEach((p) => {
        if (p !== panel) p.style.display = 'none';
    });

    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });

    const panel = document.createElement('div');
    panel.classList.add('dropdown-panel');
    panel.style.display = 'none';

    // populate dropdown options
    options.forEach((option) => {
        if (multiSelect) {
        // wrap everything in label for full-row clickability and accessibility
        const labelElement = document.createElement('label');
        labelElement.classList.add('dropdown-option');
        labelElement.htmlFor = `dropdown-${option.value}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option.value;
        checkbox.id = `dropdown-${option.value}`;

        const labelText = document.createElement('span');
        labelText.textContent = option.label;

        checkbox.addEventListener('change', () => {
            const checkedValues = Array.from(panel.querySelectorAll('input:checked'))
            .map((cb) => cb.value);
            onChange(checkedValues);
        });

        labelElement.append(checkbox, labelText);
        panel.appendChild(labelElement);
        } else {
        const optionElement = document.createElement('div');
        optionElement.classList.add('dropdown-option');
        optionElement.textContent = option.label;
        optionElement.dataset.value = option.value;

        optionElement.addEventListener('click', () => {
            onChange(option.value);
            panel.style.display = 'none';
        });

        panel.appendChild(optionElement);
        }
    });

    // close panel when clicking outside
    document.addEventListener('click', () => {
        panel.style.display = 'none';
    });

    // prevent clicks inside panel from closing it
    panel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    wrapper.append(trigger, panel);
    return wrapper;
}