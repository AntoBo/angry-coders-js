// import Modal from './modal';
import templateCard from '../templates/cardMarkup';

export default class Markup {
  static galleryEl = document.querySelector('.gallery__container');

  static drawGallery(data) {
    data[0].data.results.forEach(el => {
      //put data to format
      el.popularity = parseFloat(el.popularity).toFixed(1);
      el.title = el.title.toUpperCase();
      el.release_date = el.release_date.slice(0, 4);

      //put genres digits to names
      el.genre_ids = el.genre_ids.map(elem => {
        data[1].data.genres.filter(el => {
          if (el.id === elem) {
            elem = el.name;
          }
        });
        return elem;
      });
    });

    this.galleryEl.innerHTML = templateCard(data[0].data.results);
  }
  static drawLibrary(data) {
    console.log('drawLibrary');
    this.galleryEl.innerHTML = templateCard(data);
  }
}
