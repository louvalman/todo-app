import './styles.css';
import homePage from './pages/home';
import portfolioPage from './pages/portfolio';
import aboutPage from './pages/about';
import contactPage from './pages/contact';
import { createButton } from './components/button';

let nav = document.querySelector('nav');
let contentWrapper = document.querySelector('.content');

let homeBtn = createButton({
  label: 'Home',
  onClick: loadHome,
  classes: ['btn'],
});
nav.appendChild(homeBtn);

let portfolioBtn = createButton({
  label: 'Portfolio',
  onClick: loadPortfolio,
  classes: ['btn'],
});
nav.appendChild(portfolioBtn);

let aboutBtn = createButton({
  label: 'About',
  onClick: loadAbout,
  classes: ['btn'],
});
nav.appendChild(aboutBtn);

let contactBtn = createButton({
  label: 'Contact',
  onClick: loadContact,
  classes: ['btn'],
});
nav.appendChild(contactBtn);

function loadHome() {
  contentWrapper.innerHTML = '';
  homePage();
}

function loadPortfolio() {
  contentWrapper.innerHTML = '';
  portfolioPage();
}

function loadAbout() {
  contentWrapper.innerHTML = '';
  aboutPage();
}

function loadContact() {
  contentWrapper.innerHTML = '';
  contactPage();
}

homePage();
