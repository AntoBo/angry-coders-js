'use strict';

import templateModalMarkup from '../templates/modalMarkup';

export default class Modal {
  constructor() {
    this.WATCHED = 'watched';
    this.QUEUE = 'queue';
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
    const movieObjToDraw = this.moviesArray.find(
      option => option.id === Number(event.target.parentNode.dataset.id)
    );
    movieObjToDraw.popularity = parseFloat(movieObjToDraw.popularity).toFixed(1);
    movieObjToDraw.title = movieObjToDraw.title.toUpperCase();
    document.querySelector('.js-modal').innerHTML = templateModalMarkup(movieObjToDraw);

    //take controls of buttons
    const toWatchedList = document.querySelector('[data-watched]');
    const toQueueList = document.querySelector('[data-queue]');

    toWatchedList.addEventListener('click', () => {
      this.addToList('watched', movieObjToDraw);
    });
    toQueueList.addEventListener('click', () => {
      this.addToList('queue', movieObjToDraw);
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

  addToList(listName, movieObj) {
    const watchedList = JSON.parse(localStorage.getItem('watchedList'));
    const queueList = JSON.parse(localStorage.getItem('queueList'));
    if (listName === 'watched') {
      if (watchedList.find(el => el.id === movieObj.id)) {
        console.log('this movie already exists');
        return;
      }
      watchedList.push(movieObj);
      if (queueList.find(el => el.id === movieObj.id)) {
        queueList.splice(queueList.indexOf(movieObj), 1);
      }

      console.log('toWatchedList');
      return;
    }

    if (listName === 'queue') {
      if (queueList.find(el => el.id === movieObj.id)) {
        console.log('this movie already exists');
        return;
      }
      queueList.push(movieObj);
      if (watchedList.find(el => el.id === movieObj.id)) {
        watchedList.splice(watchedList.indexOf(movieObj), 1);
      }
      console.log('toQueueList');
      return;
    }
    localStorage.setItem('watchedList', JSON.stringify(watchedList));
    localStorage.setItem('queueList', JSON.stringify(queueList));
  }
}
