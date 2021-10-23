import {instance} from './index';

async function logInUser(email, password) {
  return await instance.post('/auth', {
    email,
    password,
  });
}
async function singUpUser(username, email, password) {
  return await instance.post('/users/client', {
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
