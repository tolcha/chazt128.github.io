// import projects
import projects from './projects.min.js';

// Get DOM Elements
const professional = document.getElementById('professional');
const personal = document.getElementById('personal');
const cards = document.getElementsByClassName('card');
const modal = document.getElementsByClassName('modal')[0];
const modalOverlay = document.getElementById('overlay');
const modalCloseButton = document.getElementById('close');
const modalHeader = document.getElementById('modalHeader');
const modalImage = document.getElementById('modalImage');
const modalContent = document.getElementById('modalContent');
let modalDescription = document.getElementById('modalDescription');

// Create new Card
const cardTemplate = (id, {name, cardDesc, tech}) => {
  return `
  <div class="card modal-btn" id='${id}' tabIndex='0'>
    <div class="container">
      <h3>${name}</h3>
      <p>${cardDesc}</p>
      <p>
        <b>Utilized</b>: ${tech}
      </p>
    </div>
  </div>`;
}

const linkTemplate = (label, link) => `<div class="project-link">Link: <a href=${link} target="_blank">${label}</a><div>`;

const setModalContent = ({name, modalImg, modalDesc, links}) => {
  modalHeader.textContent = name;
  modalImage.src = modalImg;

  for(let desc of modalDesc) {
    let newDecs = document.createElement('li');
    newDecs.textContent = desc;
    modalDescription.appendChild(newDecs);
  }

  if(links) {
    for(let currLink of links) {
      const { label, link } = currLink;
      let anchorLink = linkTemplate(label, link);
      modalContent.innerHTML += anchorLink;
    }
  }
}

function openModal() {
  if(!modal.classList.contains('show')) {
    modal.classList.add('show');
    setModalContent(projects[this.id]);
  }
}

function closeModal() {
  if(modal.classList.contains('show')) {
    modal.classList.remove('show');
    modalHeader.textContent = '';
    modalImage.src = '';

    modalDescription = document.getElementById('modalDescription');

    while (modalDescription.firstChild) {
      modalDescription.removeChild(modalDescription.firstChild);
    }

    const projectLinks = document.getElementsByClassName("project-link");
    while (projectLinks.length > 0) {
      projectLinks[0].remove();
    }
  }
}

// Generate Project Cards
function generateProjectCards() {
  const professional = document.getElementById('professional');
const personal = document.getElementById('personal');
  for(let project in projects) {
    let currCard = cardTemplate(project, projects[project]);
    if(projects[project].type === 'professional') {
      professional.innerHTML += currCard;
    } else {
      personal.innerHTML += currCard;
    }
  }
}

function addListeners() {
  for(let card of cards) {
    card.addEventListener('click', openModal);
    card.addEventListener('keyup', event => event.key === 'Enter' && openModal(event));
  }
    
  modalOverlay.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);
}

// generateProjectCards();
// addListeners();

module.exports = {
  cardTemplate,
  linkTemplate,
  setModalContent,
  openModal,
  closeModal,
  generateProjectCards,
  addListeners,
  projects,
};