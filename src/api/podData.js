// import { clientCredentials } from '../utils/client';

const endpoint = 'https://space-pod-mania-showdown-default-rtdb.firebaseio.com/';

const getPods = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/pods.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getFavPods = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/pods.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const fav = Object.values(data).filter((item) => item.favorite);
        resolve(fav);
      })
      .catch(reject);
  });

const deletePod = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSinglePod = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/pods/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getPods, getFavPods, deletePod, getSinglePod };
