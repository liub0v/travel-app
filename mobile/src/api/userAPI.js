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
  return await instance.delete(
    '/users/savedHotel',
    {hotelID},
    {
      headers: {'x-auth-token': token},
    },
  );
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

export const userAPI = {
  logInUser,
  getUserByToken,
  singUpUser,
  putIsOnBoarding,
  saveHotel,
  saveAdventure,
  deleteSavedHotel,
};
