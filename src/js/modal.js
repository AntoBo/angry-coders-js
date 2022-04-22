'use strict';

import templateModalMarkup from '../templates/modalMarkup';

export default class Modal {
  static WATCHED = 'watched';
  static QUEUE = 'queue';
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
      movieObjToDraw.popularity = Number(movieObjToDraw.popularity.toFixed(1));
      movieObjToDraw.title = movieObjToDraw.title.toUpperCase();
      document.querySelector('.js-modal').innerHTML = templateModalMarkup(movieObjToDraw);

      //take controls
      const toWatchedList = document.querySelector('[data-watched]');
      const toQueueList = document.querySelector('[data-queue]');

      toWatchedList.addEventListener(
        'click',
        () => {
          this.addToList(this.WATCHED, movieObjToDraw);
        }
        // localStorage.setItem('Watched', JSON.stringify(movieObjToDraw))
      );
      toQueueList.addEventListener(
        'click',
        () => {
          this.addToList(this.QUEUE, movieObjToDraw);
        }
        // localStorage.setItem('Queue', JSON.stringify(movieObjToDraw))
      );
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

  addToList(listName, movieObj) {
    let list;
    if (listName === this.WATCHED) {
      list = 'watchedList';
    } else {
      list = 'queueList';
    }
    //read loc stor
    const myLibrary = JSON.parse(localStorage.getItem(list));
    //check if movie is in library
    if (myLibrary.find(el => el.id === movieObj.id)) {
      console.log('this movie already exists');
      return;
    }
    //push movie to loc stor
    myLibrary.push(movieObj);
    //put back to loc stor
    localStorage.setItem(list, JSON.stringify(myLibrary));
  }
}
