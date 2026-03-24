function aboutPage() {
  let contentWrapper = document.querySelector('.content');

  contentWrapper.innerHTML = '';

  const aboutWrapper = document.createElement('div');
  aboutWrapper.classList.add('about-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'About';

  const placeholder = document.createElement('p');
  placeholder.textContent =
    'Todo is an app designed to help you manage your projects and tasks. It is built using vanilla JavaScript, HTML, and CSS, with a focus on simplicity and ease of use. The app allows you to create multiple projects, add tasks with due dates and priorities, and keep track of your progress. This about page is just a placeholder for now, but eventually it will include more information about the app and its features.';

  aboutWrapper.append(title, placeholder);
  contentWrapper.appendChild(aboutWrapper);
}

export default aboutPage;
