import { createElement } from 'lucide';

export function createButton({
  label = 'Button',
  onClick = null, // if no click handler, do nothing
  type = 'button', // no form submit
  classes = [],
  icon = null, // optional icon (Lucide component)
} = {}) {
  // makes sure arguments are optional
  const btn = document.createElement('button');
  btn.type = type;
  btn.textContent = label;

  // Base class + optional extra classes
  btn.classList.add('btn', ...classes);

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  if (icon) {
    const iconElement = createElement(icon, { size: 8 });
    btn.appendChild(iconElement);
  }

  return btn;
}
