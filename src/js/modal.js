'use strict';

import templateModalMarkup from '../templates/modalMarkup';
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
    this.backdrop.classList.toggle('is-hidden');
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', this.closeModalByEsc.bind(this));
    //draw modal card
    const movieObj = this.moviesArray.find(
      option => option.id === Number(event.target.parentNode.dataset.id)
    );
    document.querySelector('.js-modal').innerHTML = templateModalMarkup(movieObj);

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

  // addToList(listName, movieObj) {
  //   const watchedList = JSON.parse(localStorage.getItem(this.WATCHED));
  //   const queueList = JSON.parse(localStorage.getItem(this.QUEUE));
  //   if (listName === this.WATCHED) {
  //     if (watchedList.find(el => el.id === movieObj.id)) {
  //       console.log('this movie already exists');
  //       return;
  //     }

  //     //add item
  //     watchedList.push(movieObj);

  //     //remove item
  //     if (queueList.find(el => el.id === movieObj.id)) {
  //       queueList.splice(queueList.indexOf(movieObj), 1);
  //     }

  //     console.log('toWatchedList');
  //     localStorage.setItem(this.WATCHED, JSON.stringify(watchedList));
  //     localStorage.setItem(this.QUEUE, JSON.stringify(queueList));
  //     return;
  //   }

  //   if (listName === this.QUEUE) {
  //     if (queueList.find(el => el.id === movieObj.id)) {
  //       console.log('this movie already exists');
  //       return;
  //     }

  //     //add item
  //     queueList.push(movieObj);

  //     //remove item
  //     if (watchedList.find(el => el.id === movieObj.id)) {
  //       watchedList.splice(watchedList.indexOf(movieObj), 1);
  //     }
  //     console.log('toQueueList');
  //     localStorage.setItem(this.WATCHED, JSON.stringify(watchedList));
  //     localStorage.setItem(this.QUEUE, JSON.stringify(queueList));
  //     return;
  //   }
  // }
}
