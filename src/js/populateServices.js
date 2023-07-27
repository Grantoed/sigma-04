import { fetchAllServices, fetchServicesByCategory } from './fetchServices';
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

refs.allBtn.addEventListener('click', handleAllClick);
refs.architectureBtn.addEventListener('click', handleFetchByCategory);
refs.interiorBtn.addEventListener('click', handleFetchByCategory);
refs.planningBtn.addEventListener('click', handleFetchByCategory);

let currentFilter = null;

function handleAllClick(e) {
  if (currentFilter === e.target.id) {
    e.target.classList.remove('service__button_clicked');
    currentFilter = null;
    refs.serviceContainer.innerHTML = '';
  } else {
    refs.architectureBtn.classList.remove('service__button_clicked');
    refs.interiorBtn.classList.remove('service__button_clicked');
    refs.planningBtn.classList.remove('service__button_clicked');
    currentFilter = e.target.id;
    e.target.classList.add('service__button_clicked');
    fetchAllServices({ page: 1, limit: 9 })
      .then(data => {
        const markup = data.services
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

        refs.serviceContainer.innerHTML = markup;
      })
      .catch(error => {
        console.error('There was an error processing the services:', error);
      });
  }
}

function handleFetchByCategory(e) {
  let categoryName = '';
  switch (e.target.id) {
    case 'architecture':
      categoryName = e.target.id;
      break;
    case 'interior':
      categoryName = 'interior_design';
      break;
    case 'planning':
      categoryName = e.target.id;
      break;
    default:
      break;
  }
  if (currentFilter === e.target.id) {
    e.target.classList.remove('service__button_clicked');
    currentFilter = null;
    refs.serviceContainer.innerHTML = '';
  } else {
    refs.allBtn.classList.remove('service__button_clicked');
    refs.architectureBtn.classList.remove('service__button_clicked');
    refs.interiorBtn.classList.remove('service__button_clicked');
    refs.planningBtn.classList.remove('service__button_clicked');
    currentFilter = e.target.id;
    e.target.classList.add('service__button_clicked');
    fetchServicesByCategory({ categoryName, page: 1, limit: 3 })
      .then(data => {
        const markup = data.services
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

        refs.serviceContainer.innerHTML = markup;
      })
      .catch(error => {
        console.error('There was an error processing the services:', error);
      });
  }
}
