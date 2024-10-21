import 'firebase/auth';
import { clientCredentials } from '../utils/client';

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkuser?uid=${uid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      // .then((resp) => resolve(resp.json()))
      .then((resp) => {
        if (resp.ok) {
          resolve(resp.json());
        } else {
          resolve({});
        }
      })
      .catch(reject);
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/api/user`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      // .then((resp) => resolve(resp.json()))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { checkUser, registerUser };
