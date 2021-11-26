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
async function singUpGuide(username, email, password) {
  return await instance.post('/users/guide', {
    username,
    email,
    password,
  });
}
async function getGuides(page = 1, limit = 8) {
  return await instance.get('/users/guides', {params: {page, limit}});
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
async function saveHotel(hotelID, token) {
  return await instance.put(
    '/users/saveHotel',
    {hotelID},
    {
      headers: {'x-auth-token': token},
    },
  );
}
async function deleteSavedHotel(hotelID, token) {
  return await instance.delete('/users/savedHotel', {
    headers: {'x-auth-token': token},
    data: {hotelID},
  });
}

async function saveAdventure(adventureID, token) {
  return await instance.put(
    '/users/saveAdventure',
    {adventureID},
    {
      headers: {'x-auth-token': token},
    },
  );
}

async function deleteSavedAdventure(adventureID, token) {
  return await instance.delete('/users/savedAdventure', {
    headers: {'x-auth-token': token},
    data: {adventureID},
  });
}
export const userAPI = {
  logInUser,
  getUserByToken,
  singUpUser,
  putIsOnBoarding,
  saveHotel,
  saveAdventure,
  deleteSavedHotel,
  deleteSavedAdventure,
  getGuides,
  singUpGuide,
};
