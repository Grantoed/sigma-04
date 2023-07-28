const refs = {
  body: document.body,
  backdrop: document.querySelector('.backdrop'),
  confetti: document.querySelector('.confetti'),
  modalDiscount: document.querySelector('.modal-discount'),
  modalText: document.querySelector('#discount-text'),
  modalBtn: document.querySelector('#closeBtn'),
  form: document.querySelector('.subscription__form'),
  name: document.querySelector('#name'),
  surname: document.querySelector('#surname'),
  email: document.querySelector('#email'),
};

function showDiscountModal(message) {
  const { body, backdrop, confetti, modalDiscount, modalText, modalBtn } = refs;

  modalText.textContent = message;
  backdrop.classList.remove('modal_hidden');
  modalDiscount.classList.remove('modal_hidden');
  confetti.classList.remove('modal_hidden');
  body.classList.add('no-scroll');
  modalBtn.addEventListener('click', closeDiscountModal);
}

function closeDiscountModal() {
  const { body, backdrop, confetti, modalDiscount, modalBtn } = refs;

  backdrop.classList.add('modal_hidden');
  modalDiscount.classList.add('modal_hidden');
  confetti.classList.add('modal_hidden');
  body.classList.remove('no-scroll');
  modalBtn.removeEventListener('click', closeDiscountModal);
}

function validateForm() {
  const { name, surname, email } = refs;

  const nameRegex = /^[A-Z][a-z]*$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const oldErrors = document.querySelectorAll('.subscription__error');
  for (let error of oldErrors) {
    error.remove();
  }

  if (!nameRegex.test(name.value)) {
    appendError(name, 'Only Latin letters, starting with a capital letter.');
  }

  if (!nameRegex.test(surname.value)) {
    appendError(surname, 'Only Latin letters, starting with a capital letter.');
  }

  if (!emailRegex.test(email.value)) {
    appendError(email, 'Please enter a valid email address.');
  }

  const errors = document.querySelectorAll('.subscription__error');
  return name.value === 'Sigma' && errors.length === 0;
}

function appendError(input, message) {
  input.insertAdjacentHTML('afterend', `<div class="subscription__error">${message}</div>`);
}

function handleSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    const date = new Date();
    const message =
      'Today, ' + date.toLocaleDateString() + ", users who entered 'Sigma' get 120% discount.";
    showDiscountModal(message);
  }

  const errors = document.querySelectorAll('.subscription__error');
  if (errors.length === 0) {
    const { name, surname, email } = refs;
    const formData = {
      name: name.value,
      surname: surname.value,
      email: email.value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    e.target.reset();
  }
}

refs.form.addEventListener('submit', handleSubmit);
