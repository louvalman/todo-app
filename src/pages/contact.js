function contactPage() {
  let contentWrapper = document.querySelector('.content');
  let contentHeader = document.createElement('div');
  let contentTitle = document.createElement('h3');
  contentTitle.textContent = 'contact content';

  contentWrapper.appendChild(contentHeader);
  contentHeader.appendChild(contentTitle);
}

export default contactPage;
