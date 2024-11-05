import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGenres = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/genres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleGenres = (genreId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/genre/${genreId}?userFavoritesId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getGenres, getSingleGenres };
