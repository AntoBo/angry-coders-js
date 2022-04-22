'use strict';

import templateModalMarkup from '../templates/modalMarkup';

export default class Modal {
  constructor(moviesArray) {
    this.moviesArray = moviesArray;
    this.modalCloseEl = document.querySelector('.modal__close');
    this.backdrop = document.querySelector('.backdrop');
    this.containerOfCards = document.querySelector('.gallery__container');

    this.containerOfCards.addEventListener('click', this.modalOpen.bind(this));
    this.modalCloseEl.addEventListener('click', this.modalClose.bind(this));
    this.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
  }

  modalOpen(event) {
    if (event.target.nodeName !== 'UL') {
      this.backdrop.classList.toggle('is-hidden');
      document.body.classList.add('no-scroll');
      window.addEventListener('keydown', this.closeModalByEsc.bind(this));
      //draw modal card
      const movieObjToDraw = this.moviesArray.find(
        option => option.id === Number(event.target.parentNode.dataset.id)
      );
      movieObjToDraw.popularity = movieObjToDraw.popularity.toFixed(1);
      movieObjToDraw.title = movieObjToDraw.title.toUpperCase();
      document.querySelector('.js-modal').innerHTML = templateModalMarkup(movieObjToDraw);
    }
  }

  modalClose() {
    this.backdrop.classList.toggle('is-hidden');
    document.body.classList.remove('no-scroll');
    window.removeEventListener('keydown', this.closeModalByEsc.bind(this));
  }

  onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.modalClose();
    }
  }

  closeModalByEsc(event) {
    if (event.code === 'Escape') {
      this.modalClose();
    }
  }
}
