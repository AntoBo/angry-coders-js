'use strict';

export default class Modal {
  constructor() {
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
