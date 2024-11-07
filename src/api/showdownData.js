import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getShowdown = (genreId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/showdown/${genreId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          return 'All Podcasts from this Genre have been voted on';
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const showdownResults = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/showdown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status === 201) {
          return null;
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getShowdown, showdownResults };
