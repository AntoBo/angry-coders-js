import './sass/styles.scss';
import fetchAPI from './js/fetch';
import Markup from './js/markup';

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';

//TUI pagination ==============================

//search elements
const formSearchEl = document.querySelector('.header__form');
formSearchEl.addEventListener('submit', onSearchSubmit);

//fetch movies once on load page
function onLoadPage(page) {
  Promise.all([fetchAPI.fetchTrendingMovies(1), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
      const pagination = new Pagination('pagination', TUI.getOptions(data[0].data.total_results));
      pagination.on('afterMove', event => {
        onPaginationTrending(event);
      });
    })
    .catch(err => {
      err;
    });
}
onLoadPage(1);

//fetch movies on search submit
function onSearchSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements.search.value;
  console.dir(searchValue);

  Promise.all([fetchAPI.fetchMoviesByQuery(1, searchValue), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
      const pagination = new Pagination('pagination', TUI.getOptions(data[0].data.total_results));
      pagination.on('afterMove', event => {
        onPaginationSearch(event, searchValue);
      });
    })
    .catch(err => {
      err;
    });
}

//fetch movies on pagination in trending list
function onPaginationTrending(event) {
  Promise.all([fetchAPI.fetchTrendingMovies(event.page), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
      console.log(data[0].data.results);
    })
    .catch(err => {
      err;
    });
}

//fetch movies on pagination search
function onPaginationSearch(event, searchValue) {
  Promise.all([fetchAPI.fetchMoviesByQuery(event.page, searchValue), fetchAPI.fetchGenres()])
    .then(data => {
      Markup.drawGallery(data);
      console.log(data[0].data.results);
    })
    .catch(err => {
      err;
    });
}
