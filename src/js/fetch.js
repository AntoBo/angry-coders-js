import axios from 'axios';

async function fetchTrendingMovies(page) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: {
        api_key: '313da384ffe4ec90efea6fc8b4aa73ee',
        page: page,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMoviesByQuery(page, query) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: {
        api_key: '313da384ffe4ec90efea6fc8b4aa73ee',
        page,
        query,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { fetchTrendingMovies, fetchMoviesByQuery };
