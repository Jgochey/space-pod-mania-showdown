import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSearch = (search, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/search?searchInput=${search}&userFavoritesId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getFavoriteSearch = (search, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/favorites/${userId}/search?searchInput=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSearch, getFavoriteSearch };
