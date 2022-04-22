// import './sass/library.scss';
import '../../sass/library.scss';
// import Modal from '../modal';
import Modal from '../modal';
import Markup from '../markup';

//modal works!
// new Modal();

//TUI pagination for markup and styles
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from '../pagination';
const pagination = new Pagination('pagination', TUI.getOptions(500));
//TUI pagination ==============================

export default class LocalStorageAPI {
  static WATCHED = 'watchedList';
  static QUEUE = 'queueList';
  constructor() {}
  static addToList(listName, movieObj) {
    const watchedList = JSON.parse(localStorage.getItem(this.WATCHED));
    const queueList = JSON.parse(localStorage.getItem(this.QUEUE));
    if (listName === this.WATCHED) {
      if (watchedList.find(el => el.id === movieObj.id)) {
        console.log('this movie already exists');
        return;
      }

      //add item
      watchedList.push(movieObj);

      //remove item
      if (queueList.find(el => el.id === movieObj.id)) {
        queueList.splice(queueList.indexOf(movieObj), 1);
      }

      console.log('toWatchedList');
      localStorage.setItem(this.WATCHED, JSON.stringify(watchedList));
      localStorage.setItem(this.QUEUE, JSON.stringify(queueList));
      return;
    }

    if (listName === this.QUEUE) {
      if (queueList.find(el => el.id === movieObj.id)) {
        console.log('this movie already exists');
        return;
      }

      //add item
      queueList.push(movieObj);

      //remove item
      if (watchedList.find(el => el.id === movieObj.id)) {
        watchedList.splice(watchedList.indexOf(movieObj), 1);
      }
      console.log('toQueueList');
      localStorage.setItem(this.WATCHED, JSON.stringify(watchedList));
      localStorage.setItem(this.QUEUE, JSON.stringify(queueList));
      return;
    }
  }
}

//get controls
const watchedBtnEl = document.querySelector('.btn__wached');
const queueBtnEl = document.querySelector('.btn__queue');

// watchedBtnEl.addEventListener('click', onWatchedClick);
// queueBtnEl.addEventListener('click', onQueueClick);

console.log(watchedBtnEl);
console.log(queueBtnEl);

function onWatchedClick(event) {
  //   console.log('onWatchedClick');
  // const data = JSON.parse(localStorage.getItem(LocalStorageAPI.WATCHED));
}
function onQueueClick(event) {
  console.log('onQueueClick');
}
