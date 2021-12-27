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
async function getGuideByID(guideID) {
  return await instance.get('/users/guide', {params: {guideID}});
}
async function getGuidesByTerm(page = 1, limit = 8, term) {
  return await instance.get('/users/guides/search', {
    params: {page, limit, term},
  });
}
async function getUserByToken(token) {
  return await instance.get('/users/me', {
    headers: {'x-auth-token': token},
  });
}
async function getVisitedItems(token) {
  return await instance.get('/users/visited', {
    headers: {'x-auth-token': token},
  });
}
async function getSavedItems(token) {
  return await instance.get('/users/saved', {
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

async function deleteSavedHotel(token, hotelID) {
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

async function addVisitedHotel(token, hotelID) {
  return await instance.put(
    '/users/visitedHotel',
    {hotelID},
    {
      headers: {'x-auth-token': token},
    },
  );
}

async function deleteVisitedHotel(token, hotelID) {
  return await instance.delete('/users/visitedHotel', {
    headers: {'x-auth-token': token},
    data: {hotelID},
  });
}

async function addVisitedAdventure(token, adventureID) {
  return await instance.put(
    '/users/visitedAdventure',
    {adventureID},
    {
      headers: {'x-auth-token': token},
    },
  );
}

async function deleteVisitedAdventure(token, adventureID) {
  return await instance.delete('/users/visitedAdventure', {
    headers: {'x-auth-token': token},
    data: {adventureID},
  });
}
async function deleteUser(token, userID) {
  return await instance.delete('/users', {
    headers: {'x-auth-token': token},
    data: {userID},
  });
}

async function updateUser(
  token,
  {
    userID,
    firstName,
    lastName,
    username,
    email,
    phone,
    birthDate,
    address,
    image,
  },
) {
  const formData = new FormData();
  formData.append('userID', userID);
  console.log(firstName, lastName);
  firstName && formData.append('firstName', firstName);
  lastName && formData.append('lastName', lastName);
  username && formData.append('username', username.toLowerCase());
  email && formData.append('email', email);
  image?.uri &&
    image?.type &&
    image?.fileName &&
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  phone && formData.append('phone', phone);
  birthDate && formData.append('birthDate', birthDate.toString());
  address && formData.append('address', address);

  return await instance.put('/users/profileInfo', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
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
  deleteUser,
  updateUser,
  addVisitedHotel,
  deleteVisitedHotel,
  addVisitedAdventure,
  deleteVisitedAdventure,
  getGuidesByTerm,
  getGuideByID,
  getVisitedItems,
  getSavedItems,
};
