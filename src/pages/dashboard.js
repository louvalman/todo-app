function dashboardPage() {
  const contentWrapper = document.querySelector('.content');

  contentWrapper.innerHTML = '';

  const dashboardWrapper = document.createElement('div');
  dashboardWrapper.classList.add('dashboard-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'Dashboard';

  const placeholder = document.createElement('p');
  placeholder.textContent =
    'Welcome home! Eventually, this will show a summary of your upcoming and high-priority tasks. For now, it is just a placeholder.';

  dashboardWrapper.append(title, placeholder);
  contentWrapper.appendChild(dashboardWrapper);
}

export default dashboardPage;
