import architectureImg from '../images/architecture.svg';
import interiorImg from '../images/interior.svg';
import planningImg from '../images/planning.svg';

const refs = {
  serviceContainer: document.querySelector('.service__posts-wrapper'),
  allBtn: document.querySelector('#all'),
  architectureBtn: document.querySelector('#architecture'),
  interiorBtn: document.querySelector('#interior'),
  planningBtn: document.querySelector('#planning'),
};
const { serviceContainer, allBtn, architectureBtn, interiorBtn, planningBtn } = refs;
let currentFilter = null;

allBtn.addEventListener('click', handleAllClick);
architectureBtn.addEventListener('click', handleFetchByCategory);
interiorBtn.addEventListener('click', handleFetchByCategory);
planningBtn.addEventListener('click', handleFetchByCategory);

function handleAllClick(e) {
  if (currentFilter === e.target.id) {
    e.target.classList.remove('service__button_clicked');
    currentFilter = null;
    serviceContainer.innerHTML = '';
  } else {
    architectureBtn.classList.remove('service__button_clicked');
    interiorBtn.classList.remove('service__button_clicked');
    planningBtn.classList.remove('service__button_clicked');
    currentFilter = e.target.id;
    e.target.classList.add('service__button_clicked');
    const services = JSON.parse(localStorage.getItem('all'));
    const markup = services
      .map(service => {
        let imgPath;
        switch (service.serviceCategory) {
          case 'architecture':
            imgPath = architectureImg;
            break;
          case 'interior_design':
            imgPath = interiorImg;
            break;
          case 'planning':
            imgPath = planningImg;
            break;
        }
        return `<div class="service__post"><img class="service__icon" src=${imgPath} width="45" height="35" alt="icon"/><div class="service__text-wrapper"><p class="service__name">${service.serviceName}</p><p class="service__description">${service.serviceDescription}</p></div></div>`;
      })
      .join('');

    serviceContainer.innerHTML = markup;
  }
}

function handleFetchByCategory(e) {
  if (currentFilter === e.target.id) {
    e.target.classList.remove('service__button_clicked');
    currentFilter = null;
    serviceContainer.innerHTML = '';
  } else {
    allBtn.classList.remove('service__button_clicked');
    architectureBtn.classList.remove('service__button_clicked');
    interiorBtn.classList.remove('service__button_clicked');
    planningBtn.classList.remove('service__button_clicked');
    currentFilter = e.target.id;
    e.target.classList.add('service__button_clicked');
    const services = JSON.parse(localStorage.getItem(e.target.id));
    const markup = services
      .map(service => {
        let imgPath;
        switch (service.serviceCategory) {
          case 'architecture':
            imgPath = architectureImg;
            break;
          case 'interior_design':
            imgPath = interiorImg;
            break;
          case 'planning':
            imgPath = planningImg;
            break;
        }
        return `<div class="service__post"><img class="service__icon" src=${imgPath} width="45" height="35" alt="icon"/><div class="service__text-wrapper"><p class="service__name">${service.serviceName}</p><p class="service__description">${service.serviceDescription}</p></div></div>`;
      })
      .join('');

    serviceContainer.innerHTML = markup;
  }
}
