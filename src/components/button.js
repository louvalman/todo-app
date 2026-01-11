export function createButton({
  label = 'Button',
  onClick = null, // if no click handler, do nothing
  type = 'button', // no form submit
  classes = [],
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

  return btn;
}
