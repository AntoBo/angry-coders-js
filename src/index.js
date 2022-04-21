import './sass/styles.scss';
import Modal from './js/modal';
import fetchAPI from './js/fetch';

//fetch movies on load page
function onLoadPage(page) {
  fetchAPI
    .fetchTrendingMovies(page)
    .then(data => {
      console.log(data.data);
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

//modal works!
new Modal();

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';
const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================
