function aboutPage() {
  let contentWrapper = document.querySelector('.content');

  contentWrapper.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'About';

  const placeholder = document.createElement('p');
  placeholder.textContent =
    'Eventually, this will show more information about the application and myself. For now, it is just a placeholder.';

  contentWrapper.append(title, placeholder);
}

export default aboutPage;
