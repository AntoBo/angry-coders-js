// import Modal from './modal';
import templateCard from '../templates/cardMarkup';
import templateModalMarkup from '../templates/modalMarkup';
import noPosterImg from '../images/no-poster.jpg';

export default class Markup {
  static galleryEl = document.querySelector('.gallery__container');
  static modalEl = document.querySelector('.js-modal');
  static BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
  static LIB_EMPTY_MESSAGE =
    '<p class="js-library-message">Choose the movies on homepage please</>';

  static drawGallery(data) {
    data[0].data.results.forEach(el => {
      //put data to format
      //poster
      if (el.poster_path) {
        el.poster_path = this.BASE_IMG_URL + el.poster_path;
      } else {
        el.poster_path = noPosterImg;
      }

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
    this.galleryEl.innerHTML = templateCard(data);
  }
  static drawModal(data) {
    this.modalEl.innerHTML = templateModalMarkup(data);
  }
  static drawDevsModal() {
    this.modalEl.innerHTML = `<p class="footer__link">Developers:</p>
    <ul>
    <li class="footer__link__developers">Anton Bondarenko</li>
    <li class="footer__link__developers">Anton Tagirov</li>
    <li class="footer__link__developers">Natalia Travetska</li>
    </ul>`;
  }
}
