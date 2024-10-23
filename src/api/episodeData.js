import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getFavEpisodes = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${userId}/episodes/favorite`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const toggleFavoriteEpisode = (episodeId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/episodes/${episodeId}/toggleFavorite/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteEpisode = (episodeId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/episodes/${episodeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createEpisode = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/episodes`, {
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

const updateEpisode = (episodeId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/episodes/${payload.Id}`, {
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

const getSingleEpisode = (id, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/episodes/${id}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getFavEpisodes, createEpisode, deleteEpisode, toggleFavoriteEpisode, updateEpisode, getSingleEpisode };
