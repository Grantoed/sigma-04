import throttle from 'lodash.throttle';

let idleTimeout;
let confirmTimeout;
const refs = {
  body: document.body,
  backdrop: document.querySelector('.backdrop'),
  modalIdle: document.querySelector('.modal-idle'),
  yesBtn: document.querySelector('#yesBtn'),
};
const { body, backdrop, modalIdle, yesBtn } = refs;

function showModal() {
  backdrop.classList.remove('is-hidden');
  modalIdle.classList.remove('is-hidden');
  body.classList.add('no-scroll');
  yesBtn.addEventListener('click', handleClickedYes);
  confirmTimeout = setTimeout(closeTab, 1000 * 15);
}

function resetTimer() {
  if (!confirmTimeout) {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(showModal, 1000 * 60);
  }
}

function handleClickedYes(e) {
  clearTimeout(confirmTimeout);
  confirmTimeout = null;
  backdrop.classList.add('is-hidden');
  modalIdle.classList.add('is-hidden');
  body.classList.remove('no-scroll');
  yesBtn.removeEventListener('click', handleClickedYes);
  resetTimer();
}

function closeTab() {
  console.log('tab *closed*');
  // window.close();
}

window.addEventListener(
  'mousemove',
  throttle(() => {
    resetTimer();
  }, 5000)
);
window.addEventListener(
  'keypress',
  throttle(() => {
    resetTimer();
  }, 5000)
);
window.addEventListener(
  'scroll',
  throttle(() => {
    resetTimer();
  }, 5000)
);

resetTimer();
