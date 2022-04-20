const modalCloseEl = document.querySelector('.modal__close');
const backdrop = document.querySelector('.backdrop');
const containerOfCards = document.querySelector('.gallery__container');

containerOfCards.addEventListener('click', modalOpen);
modalCloseEl.addEventListener('click', modalClose);

backdrop.addEventListener('click', onBackdropClick);

function modalOpen(event) {
  if (event.target.nodeName !== 'UL') {
    backdrop.classList.toggle('is-hidden');
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', closeModalByEsc);
  }
}

function modalClose() {
  backdrop.classList.toggle('is-hidden');
  document.body.classList.remove('no-scroll');
  window.removeEventListener('keydown', closeModalByEsc);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    modalClose();
  }
}

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modalClose();
  }
}
