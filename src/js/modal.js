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
    this.devsLink = document.querySelector('.footer__link');

    this.containerOfCards.addEventListener('click', this.modalOpen.bind(this));
    this.modalCloseEl.addEventListener('click', this.modalClose.bind(this));
    this.backdrop.addEventListener('click', this.onBackdropClick.bind(this));
    this.devsLink.addEventListener('click', this.onDevsLink.bind(this));
  }

  getMovies(moviesArray) {
    this.moviesArray = moviesArray;
  }

  modalOpen(event) {
    if (event.target.nodeName === 'UL' || event.target.nodeName === 'P') {
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
    const watchedList = JSON.parse(localStorage.getItem(this.WATCHED));
    const queueList = JSON.parse(localStorage.getItem(this.QUEUE));

    console.log;

    //check film in localstor
    if (this.WATCHED) {
      if (watchedList.find(el => el.id === movieObj.id)) {
        toWatchedList.textContent = 'remove watched';
        toWatchedList.classList.add('button__checked');
      }
    }
    if (this.QUEUE) {
      if (queueList.find(el => el.id === movieObj.id)) {
        toQueueList.textContent = 'remove queue';
        toQueueList.classList.add('button__checked');
      }
    }

    toWatchedList.addEventListener('click', () => {
      LocalStorageAPI.addToList(this.WATCHED, movieObj);
      toWatchedList.classList.toggle('button__checked');
    });
    toQueueList.addEventListener('click', () => {
      LocalStorageAPI.addToList(this.QUEUE, movieObj);
      toQueueList.classList.toggle('button__checked');
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

  onDevsLink(event) {
    console.log('onDevsLink');
    event.preventDefault();
    this.backdrop.classList.toggle('is-hidden');
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', this.closeModalByEsc.bind(this));
    Markup.drawDevsModal();
  }
}
