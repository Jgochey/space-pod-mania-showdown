import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPods = (fav) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts?userFavoritesId=${fav}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getFavPods = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/favorites/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSinglePod = (podcastId, fav) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/${podcastId}?userFavoritesId=${fav}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createPod = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updatePod = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deletePod = (podcastId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/${podcastId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

const toggleFavoritePod = (podcastId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/podcasts/${podcastId}/toggleFavorite/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getPods, getFavPods, getSinglePod, toggleFavoritePod, updatePod, createPod, deletePod };
