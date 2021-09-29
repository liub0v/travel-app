import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.43.50:3000/api',
  // baseURL: 'http://192.168.43.209:3000/api',
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

export const userAPI = {logInUser, getUserByToken, singUpUser};
