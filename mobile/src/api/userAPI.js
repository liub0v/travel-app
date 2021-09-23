import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.43.209:3000/api',
  timeout: 3000,
});
async function logInUser(email, password) {
  try {
    return await instance.post('/auth', {
      email,
      password,
    });
  } catch (error) {
    console.log('LOGIN', error);
  }
}
async function singUpUser(username, email, password) {
  try {
    return await instance.post('/users', {
      username,
      email,
      password,
    });
  } catch (error) {
    console.log('SING_UP', error);
  }
}
async function getUserByToken(token) {
  try {
    return await instance.get('/users/me', {
      headers: {'x-auth-token': token},
    });
  } catch (error) {
    console.log('USER', error);
  }
}

export const userAPI = {logInUser, getUserByToken};
