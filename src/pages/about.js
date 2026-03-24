function aboutPage() {
  let contentWrapper = document.querySelector('.content');

  contentWrapper.innerHTML = '';

  const aboutWrapper = document.createElement('div');
  aboutWrapper.classList.add('about-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'About';

  const placeholder = document.createElement('p');
  placeholder.textContent =
    'Eventually, this will show more information about the application and myself. For now, it is just a placeholder.';

  aboutWrapper.append(title, placeholder);
  contentWrapper.appendChild(aboutWrapper);
}

export default aboutPage;
