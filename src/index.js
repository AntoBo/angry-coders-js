import './sass/styles.scss';
import fetchAPI from './js/fetch';
import Markup from './js/markup';

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';
const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================

//search elements
const formSearchEl = document.querySelector('.header__form');
formSearchEl.addEventListener('submit', onSearchSubmit);

//fetch movies on load page
function onLoadPage(page) {
  Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
    })
    .catch(err => {
      err;
    });
}
onLoadPage(1);

//fetch movies on load page
function onSearchSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements.search.value;
  console.dir(searchValue);

  Promise.all([fetchAPI.fetchMoviesByQuery(1, searchValue), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
    })
    .catch(err => {
      err;
    });
}
