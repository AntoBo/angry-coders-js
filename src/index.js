import './sass/styles.scss';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import * as TUI from './js/pagination';

//TUI pagination for markup and styles
const pagination = new Pagination('pagination', TUI.getOptions(500));

//==============================

import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  params: {
    key: '313da384ffe4ec90efea6fc8b4aa73ee',
  },
};

async function getMovies() {
  try {
    // const response = await axios.get(
    //   'https://api.themoviedb.org/3/genre/movie/list?api_key=313da384ffe4ec90efea6fc8b4aa73ee&language=en-US'
    // );
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/all/day?api_key=313da384ffe4ec90efea6fc8b4aa73ee'
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('caugth in fetch.js, ', error);
    return;
  }
}

async function getGenres() {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=313da384ffe4ec90efea6fc8b4aa73ee&language=en-US'
    );
    // const response = await axios.get(
    //   'https://api.themoviedb.org/3/trending/all/day?api_key=313da384ffe4ec90efea6fc8b4aa73ee'
    // );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('caugth in fetch.js, ', error);
    return;
  }
}
console.log(
  getMovies().then(data => {
    console.log(data);
  })
);
console.log(
  getGenres().then(data => {
    console.log(data);
  })
);

// https://developers.themoviedb.org/3/trending/get-trending

// async function getMovies(query, page) {
//   const options = {
//     params: {
//       key: '26342671-26c26899736dd731f47ba4106',
//       q: query,
//       per_page: perPage,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       order: 'popular',
//       page: page,
//     },
//   };

//   try {
//     const response = await axios.get('', options);
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.error('caugth in fetch.js, ', error);
//     return;
//   }
// }
