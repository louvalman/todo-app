function todosPage() {
  let contentWrapper = document.querySelector('.content');
  let contentHeader = document.createElement('div');
  let contentTitle = document.createElement('h3');
  contentTitle.textContent = 'todos content';

  contentWrapper.appendChild(contentHeader);
  contentHeader.appendChild(contentTitle);
}

export default todosPage;
