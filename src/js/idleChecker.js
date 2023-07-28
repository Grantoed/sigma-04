import throttle from 'lodash.throttle';

let idleTimeout;
let confirmTimeout;

const refs = {
  body: document.body,
  backdrop: document.querySelector('.backdrop'),
  modalIdle: document.querySelector('.modal-idle'),
  yesBtn: document.querySelector('#yesBtn'),
};

function showModal() {
  refs.backdrop.classList.remove('modal_hidden');
  refs.modalIdle.classList.remove('modal_hidden');
  refs.body.classList.add('no-scroll');
  refs.yesBtn.addEventListener('click', handleClickedYes);
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
  refs.backdrop.classList.add('modal_hidden');
  refs.modalIdle.classList.add('modal_hidden');
  refs.body.classList.remove('no-scroll');
  refs.yesBtn.removeEventListener('click', handleClickedYes);
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
