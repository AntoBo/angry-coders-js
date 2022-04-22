import Modal from '../modal';
import Markup from '../markup';
import LocalStorageAPI from '../library';

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from '../pagination';
// const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================

//get controls
const watchedBtnEl = document.querySelector('.btn__wached');
const queueBtnEl = document.querySelector('.btn__queue');
const galleryEl = document.querySelector('.gallery__container');

watchedBtnEl.addEventListener('click', onWatchedClick);
queueBtnEl.addEventListener('click', onQueueClick);

function onWatchedClick() {
  //take data
  const data = JSON.parse(localStorage.getItem(LocalStorageAPI.WATCHED));
  //draw galley
  Markup.drawLibrary(data);
  //create modal
  const modal = new Modal();
  modal.getMovies(data);
  //TUI pagination
  const pagination = new Pagination('pagination', TUI.getOptions(data.length));
  pagination.on('afterMove', event => {
    // onPaginationSearch(event, searchValue);
  });
}
function onQueueClick() {
  const data = JSON.parse(localStorage.getItem(LocalStorageAPI.QUEUE));
  Markup.drawLibrary(data);
  const modal = new Modal();
  modal.getMovies(data);
}
