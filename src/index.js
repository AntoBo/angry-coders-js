import './sass/styles.scss';
import Modal from './js/modal';
import * as moviedbAPI from './js/fetch';

//fetch movies on load page
function onLoadPage() {
  moviedbAPI
    .fetchTrendingMovies(1)
    .then(data => {
      console.log(data.data.results);
    })
    .catch(err => {
      err;
    });
}
onLoadPage();

// moviedbAPI.fetchMoviesByQuery(1, 'hello');

//modal works!
new Modal();

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './js/pagination';
const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================
