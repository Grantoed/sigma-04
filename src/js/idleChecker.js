import throttle from 'lodash.throttle';

let idleTimeout;
let confirmTimeout;

const refs = {
  body: document.body,
  modal: document.querySelector('.backdrop'),
  yesBtn: document.querySelector('#yesBtn'),
};

function showModal() {
  refs.modal.classList.remove('modal_hidden');
  refs.body.classList.add('no-scroll');
  confirmTimeout = setTimeout(closeTab, 1000 * 15);
}

function resetTimer() {
  if (!confirmTimeout) {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(showModal, 1000 * 60);
  }
}

function handleClickedYes() {
  clearTimeout(confirmTimeout);
  confirmTimeout = null;
  refs.modal.classList.add('modal_hidden');
  refs.body.classList.remove('no-scroll');
  resetTimer();
}

function closeTab() {
  console.log('tab *closed*');
  window.close();
}

refs.yesBtn.addEventListener('click', handleClickedYes);
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
