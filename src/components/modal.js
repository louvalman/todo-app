export const createModal = (title, content) => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');

  const dialogTitle = document.createElement('h3');
  dialogTitle.classList.add('dialog-header');
  dialogTitle.textContent = title;

  dialog.appendChild(dialogTitle);
  dialog.appendChild(content);

  return dialog;
};
