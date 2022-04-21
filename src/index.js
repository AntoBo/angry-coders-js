import './sass/styles.scss';
import Modal from './js/modal';
import fetchAPI from './js/fetch';

import templateCard from './templates/cardMarkup';

//fetch movies on load page
function onLoadPage(page) {
  Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()])
    .then(data => {
      console.log(data[0].data.results);
      console.log(data[0].data.results[0].genre_ids);

      data[0].data.results.forEach(el => {
        el.release_date = el.release_date.slice(0, 4);

        el.genre_ids = el.genre_ids.map(elem => {
          data[1].data.genres.filter(el => {
            if (el.id === elem) {
              elem = el.name;
            }
          });
          return elem;
        });
      });

      document.querySelector('.gallery__container').innerHTML = templateCard(data[0].data.results);
      //modal works!
      new Modal(data[0].data.results);
      console.log('genres array: ', data[1].data.genres);
    })
    .catch(err => {
      err;
    });
}
onLoadPage(1);

//fetch movies on load page
function onSearchSubmit(page, query) {
  fetchAPI
    .fetchMoviesByQuery(page, query)
    .then(data => {
      console.log(data.data.results);
    })
    .catch(err => {
      err;
    });
}
// onSearchSubmit(1, 'terminator');

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';
const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================
