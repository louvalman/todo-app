import autoAnimate from '@formkit/auto-animate';
import { siGithub } from 'simple-icons';

function aboutPage() {
  const contentWrapper = document.querySelector('.content');
  contentWrapper.innerHTML = '';

  const aboutWrapper = document.createElement('div');
  aboutWrapper.classList.add('about-wrapper');

  const title = document.createElement('h3');
  title.textContent = 'About';

  const contentContainer = document.createElement('div');
  autoAnimate(contentContainer);

  const githubContainer = document.createElement('div');
  githubContainer.classList.add('github-container');
  autoAnimate(githubContainer, { duration: 600, easing: 'ease-out' });

  const description = document.createElement('p');
  description.textContent =
    'This is an app designed to help you manage your projects and tasks. It is built using vanilla JavaScript, HTML, and CSS, with a focus on simplicity and ease of use. The app allows you to create multiple projects, add tasks with due dates and priorities, and keep track of your progress.';

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/louvalman';
  githubLink.target = '_blank';
  githubLink.classList.add('github-link');

  const githubIcon = document.createElement('span');
  githubIcon.innerHTML = siGithub.svg;
  githubIcon.classList.add('github-icon');

  const githubLabel = document.createElement('span');
  githubLabel.textContent = 'by louvalman';

  githubLink.append(githubIcon, githubLabel);
  githubContainer.appendChild(githubLink);
  contentContainer.appendChild(description);
  aboutWrapper.append(title, contentContainer, githubContainer);
  contentWrapper.appendChild(aboutWrapper);
}

export default aboutPage;
