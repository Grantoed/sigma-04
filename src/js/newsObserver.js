const target = document.querySelector('#news');

function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

let observer = new IntersectionObserver(handleIntersect, options);

observer.observe(target);
