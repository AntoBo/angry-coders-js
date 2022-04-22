'use strict';

import Markup from './markup';
import LocalStorageAPI from './library';

export default class Modal {
  constructor() {
    this.WATCHED = 'watchedList';
    this.QUEUE = 'queueList';
    this.moviesArray;
    this.modalCloseEl = document.querySelector('.modal__close');
    this.backdrop = document.querySelector('.backdrop');
    this.containerOfCards = document.querySelector('.gallery__container');

    this.containerOfCards.addEventListener('click', this.modalOpen.bind(this));
    this.modalCloseEl.addEventListener('click', this.modalClose.bind(this));
    this.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
  }

  getMovies(moviesArray) {
    this.moviesArray = moviesArray;
  }

  modalOpen(event) {
    if (event.target.nodeName === 'UL') {
      return;
    }
    //take controls
    this.backdrop.classList.toggle('is-hidden');
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', this.closeModalByEsc.bind(this));
    //find card to draw modal
    const movieObj = this.moviesArray.find(
      option => option.id === Number(event.target.parentNode.dataset.id)
    );
    //draw modal card
    Markup.drawModal(movieObj);

    //take controls of buttons
    const toWatchedList = document.querySelector('[data-watched]');
    const toQueueList = document.querySelector('[data-queue]');

    toWatchedList.addEventListener('click', () => {
      LocalStorageAPI.addToList(this.WATCHED, movieObj);
    });
    toQueueList.addEventListener('click', () => {
      LocalStorageAPI.addToList(this.QUEUE, movieObj);
    });
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
