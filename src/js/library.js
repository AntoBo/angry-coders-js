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
