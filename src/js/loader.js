const refs = {
  body: document.body,
  loader: document.querySelector('.loader'),
};

function hideLoader() {
  const { body, loader } = refs;
  setTimeout(() => {
    loader.classList.add('loader_hidden');
    body.classList.remove('no-scroll');
  }, 5000);
}

hideLoader();
