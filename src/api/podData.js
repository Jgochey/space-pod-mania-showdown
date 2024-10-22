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

const getOtherPods = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/otherpodcasts.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleOtherPod = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/otherpodcasts/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleEpisode = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/otherpodcasts/${firebaseKey}/episodes.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const viewOtherPodcastDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleOtherPod(firebaseKey)
      .then((podObject) => {
        getSingleEpisode(podObject.episodes).then((episodeObject) => {
          resolve({ episodeObject, ...podObject });
        });
      })
      .catch((error) => reject(error));
  });

export { getPods, getFavPods, getSinglePod, toggleFavoritePod, getOtherPods, getSingleOtherPod, getSingleEpisode, viewOtherPodcastDetails };

// const deletePawd = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/pods/${firebaseKey}.json`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

// const createPod = (payload) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/pods`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

// const updatePod = (payload) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/pods/${payload.firebaseKey}.json`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
//       .then(resolve)
//       .catch(reject);
//   });
