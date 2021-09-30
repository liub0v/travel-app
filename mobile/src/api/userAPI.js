import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://192.168.43.50:3000/api', //mac
  baseURL: 'http://192.168.56.1:3000/api', //win
  timeout: 3000,
});

async function logInUser(email, password) {
  return await instance.post('/auth', {
    email,
    password,
  });
}
async function singUpUser(username, email, password) {
  return await instance.post('/users', {
    username,
    email,
    password,
  });
}
async function getUserByToken(token) {
  return await instance.get('/users/me', {
    headers: {'x-auth-token': token},
  });
}
async function putIsOnBoarding(isOnBoarding, token) {
  return await instance.put(
    '/users/onboarding',
    {
      isOnBoarding,
    },
    {
      headers: {'x-auth-token': token},
    },
  );
}

export const userAPI = {logInUser, getUserByToken, singUpUser, putIsOnBoarding};
