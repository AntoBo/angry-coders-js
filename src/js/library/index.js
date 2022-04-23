import Modal from '../modal';
const modal = new Modal();
import Markup from '../markup';
import LocalStorageAPI from '../library';

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from '../pagination';
//TUI pagination ==============================

//fill watchlist fake obj to test pagin
// function fakeList(quantity) {
//   //create fake
//   const fakeList = JSON.parse(localStorage.getItem(LocalStorageAPI.WATCHED));
//   for (let i = 0; i <= quantity; i++) {
//     fakeList.push(fakeList[0]);
//   }
//   localStorage.setItem(LocalStorageAPI.WATCHED, JSON.stringify(fakeList));
// }
// fakeList(21);

//get controls
const watchedBtnEl = document.querySelector('.btn__wached');
const queueBtnEl = document.querySelector('.btn__queue');
Markup.galleryEl.innerHTML = Markup.LIB_EMPTY_MESSAGE;

watchedBtnEl.addEventListener('click', onWatchedClick);
queueBtnEl.addEventListener('click', onQueueClick);

onWatchedClick();

function onWatchedClick() {
  buildList(LocalStorageAPI.WATCHED);
}
function onQueueClick() {
  buildList(LocalStorageAPI.QUEUE);
}
function getDataToDrawPage(data, page) {
  const from = (page - 1) * 20;
  const to = from + 19;
  const dataPage = data.slice(from, to);
  return dataPage;
}
function buildList(listNameInLocalStorage) {
  Markup.galleryEl.innerHTML = Markup.LIB_EMPTY_MESSAGE;
  try {
    //take data
    const data = JSON.parse(localStorage.getItem(listNameInLocalStorage));
    if (!data.length) {
      console.log('data is empty');

      return;
    }
    //draw galley 1st page
    modal.getMovies(getDataToDrawPage(data, 1));
    Markup.drawLibrary(getDataToDrawPage(data, 1));
    //TUI pagination
    const pagination = new Pagination('pagination', TUI.getOptions(data.length));
    pagination.on('afterMove', event => {
      //draw galley
      modal.getMovies(getDataToDrawPage(data, event.page));
      Markup.drawLibrary(getDataToDrawPage(data, event.page));
    });
  } catch (error) {
    console.log('localStorage not parsed. probably its empty. error is', error);
  }
}

function onclick(event) {
  console.log(event.target);
  console.log(event.currentTarget);
}
