const homePage = document.querySelector('#home');
const portfolioPage = document.querySelector('#portfolio');
const portfolioButton = document.querySelector('#portfolioButton');
const backButton = document.querySelector('#portfolioBackButton');
const profileButton = document.querySelector('#profileButton');
const profilePreview = document.querySelector('#profilePreview');
const profilePreviewClose = document.querySelector('#profilePreviewClose');
const projectPreview = document.querySelector('#projectPreview');
const projectPreviewClose = document.querySelector('#projectPreviewClose');
const projectMedia = document.querySelector('#projectMedia');
const projectPreviewTitle = document.querySelector('#projectPreviewTitle');
const projectPreviewType = document.querySelector('#projectPreviewType');
const projectPreviewDescription = document.querySelector('#projectPreviewDescription');
const projectImagePreview = document.querySelector('#projectImagePreview');
const projectImagePreviewClose = document.querySelector('#projectImagePreviewClose');
const projectImagePreviewImage = document.querySelector('#projectImagePreviewImage');
const experienceCards = document.querySelectorAll('.experience-card');

const projects = {
  swims: {
    title: 'SWIMS: Zenith PH', type: 'Information Management Course Project', media: ['logos/swims_login.png', 'logos/swims_menu.png', 'logos/swims_admin.png', 'logos/swims_report.png'],
    details: ['My Role: UI Designer & Frontend Developer.', 'The Constraint: Built exclusively with PySide (Python).', 'The Core UX Goal: Designed a high-contrast dark-mode dashboard tailored to reduce eye strain for warehouse operators during long shifts.', 'Key Feature: Organized complex, multi-tiered data—logs, graphs, and alerts—into a clean grid system for instant scannability.']
  },
  wheels: {
    title: '3G WHEELS: Vehicle Rental Management System', type: 'Object-Oriented Programming Course Project', media: ['logos/3gwheels_login.png', 'logos/3gwheels_menu.png', 'logos/3gwheels_availablevehicles.png', 'logos/3gwheels_history.png'],
    details: ['My Role: UI/UX Designer and Frontend Developer.','The Constraint: Built with Java GUI components (Swing/AWT) using structured layout managers and custom-styled panel containers.', 'Designed a clear rental workflow that makes vehicle availability, reservations, and customer records easy to manage.', 'The Core UX Goal: Designed an intuitive, high-contrast navigation menu to streamline administrative actions and customer reservations for quick on-site processing.', 'Key Feature: Segmented core workflows—vehicle cataloging, customer profiles, and booking schedules—into clear, direct sub-panels to minimize click depth and speed up data entry.']
  },
  pup: {
    title: 'PUP Online Document Request System (ODRS)', type: 'Redesign Conceptualization', media: ['logos/ODRS_page.png', 'logos/ODRS_menu.png', 'logos/ODRS_signin.png', 'logos/ODRS_requests.png'],
    details: ['My Role: UI/UX Designer.', 'The Deliverable: Developed a fully interactive high-fidelity Figma prototype for the complete student administrative journey.', 'The Core UX Goal: Modernized an outdated legacy system to eliminate navigation friction and streamline document application flows.', 'Key Feature: Redesigned department selection into a modular card system for better scannability and less user confusion.', 'Brand Identity: Applied an accessible maroon-and-gold palette that honors the school identity and reinforces trust.']
  }
};

let lastProjectTrigger = null;
let lastImageTrigger = null;

function showPortfolio() {
  homePage.classList.add('is-hidden');
  portfolioPage.classList.remove('is-hidden');
  portfolioPage.focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
}

function showHome() {
  portfolioPage.classList.add('is-hidden');
  homePage.classList.remove('is-hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function makeProjectImage(source) {
  const image = document.createElement('div');
  if (source.startsWith('logos/')) {
    const label = source.split('/').pop().replace('.png', '').replaceAll('_', ' ');
    image.className = 'project-thumbnail project-photo';
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', label);
    image.innerHTML = `<img src="${source}" alt="${label}">`;
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open ${label} in full size`);
    image.addEventListener('click', () => openProjectImage(source, label, image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectImage(source, label, image);
      }
    });
    return image;
  }
  image.className = 'project-thumbnail project-photo-placeholder';
  image.setAttribute('role', 'img');
  image.setAttribute('aria-label', 'Project photo placeholder');
  image.innerHTML = '<span>Project photo</span><small>Add your image here</small>';
  return image;
}

function openProject(projectName, trigger) {
  const project = projects[projectName];
  if (!project) return;
  lastProjectTrigger = trigger;
  projectPreviewTitle.textContent = project.title;
  projectPreviewType.textContent = project.type;
  projectPreviewDescription.replaceChildren(...project.details.map((detail) => {
    const item = document.createElement('li');
    item.textContent = detail;
    return item;
  }));
  projectMedia.replaceChildren(...project.media.map(makeProjectImage));
  projectPreview.hidden = false;
  document.body.classList.add('modal-open');
  projectPreviewClose.focus();
}

function closeProject() {
  if (!projectImagePreview.hidden) closeProjectImage();
  projectPreview.hidden = true;
  document.body.classList.remove('modal-open');
  lastProjectTrigger?.focus();
}

function openProjectImage(source, label, trigger) {
  lastImageTrigger = trigger;
  projectImagePreviewImage.src = source;
  projectImagePreviewImage.alt = label;
  projectImagePreview.hidden = false;
  projectImagePreviewClose.focus();
}

function closeProjectImage() {
  projectImagePreview.hidden = true;
  projectImagePreviewImage.removeAttribute('src');
  lastImageTrigger?.focus();
}

portfolioButton.addEventListener('click', (event) => {
  event.preventDefault();
  showPortfolio();
  history.pushState(null, '', '#portfolio');
});
backButton.addEventListener('click', () => {
  showHome();
  history.pushState(null, '', window.location.pathname);
});
experienceCards.forEach((card) => card.addEventListener('click', () => openProject(card.dataset.project, card)));

function openProfilePreview() {
  profilePreview.hidden = false;
  document.body.classList.add('modal-open');
  profilePreviewClose.focus();
}
function closeProfilePreview() {
  profilePreview.hidden = true;
  document.body.classList.remove('modal-open');
  profileButton.focus();
}
profileButton.addEventListener('click', openProfilePreview);
profilePreviewClose.addEventListener('click', closeProfilePreview);
profilePreview.addEventListener('click', (event) => { if (event.target === profilePreview) closeProfilePreview(); });
projectPreviewClose.addEventListener('click', closeProject);
projectPreview.addEventListener('click', (event) => { if (event.target === projectPreview) closeProject(); });
projectImagePreviewClose.addEventListener('click', closeProjectImage);
projectImagePreview.addEventListener('click', (event) => { if (event.target === projectImagePreview) closeProjectImage(); });
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!projectImagePreview.hidden) closeProjectImage();
  else if (!projectPreview.hidden) closeProject();
  else if (!profilePreview.hidden) closeProfilePreview();
});

if (window.location.hash === '#portfolio') showPortfolio();
