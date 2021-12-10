import {instance} from './index';

async function getAdventuresByDestination(page = 1, limit = 3, destination) {
  return await instance.get('/adventures/byDestination', {
    params: {page, limit, destination},
  });
}
async function getPopularAdventures(page = 1, limit = 3) {
  return await instance.get('/adventures', {
    params: {page, limit},
  });
}
async function getAdventures(page = 1, limit = 8) {
  return await instance.get('/adventures', {
    params: {page, limit},
  });
}
async function deleteAdventure(token, adventureID) {
  return await instance.delete('/adventures', {
    headers: {'x-auth-token': token},
    data: {adventureID},
  });
}
async function saveAdventureReview(
  token,
  adventureID,
  starsNumber,
  interestingRating,
  guideRating,
  serviceRating,
  priceRating,
  comment,
) {
  return await instance.post(
    '/adventures/review',
    {
      adventureID,
      interestingRating,
      serviceRating,
      guideRating,
      starsNumber,
      priceRating,
      comment,
    },
    {
      headers: {'x-auth-token': token},
    },
  );
}
async function updateAdventure(
  token,
  {adventureID, name, image, summary, price, address, guideID},
) {
  const formData = new FormData();
  formData.append('adventureID', adventureID);
  formData.append('name', name);
  image &&
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  formData.append('summary', summary);
  formData.append('price', price);
  formData.append('address', address);
  formData.append('guideID', guideID);

  return await instance.put('/adventures', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}
async function addAdventure(
  token,
  {name, image, summary, price, address, guideID},
) {
  const formData = new FormData();
  formData.append('name', name);
  image &&
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  formData.append('summary', summary);
  formData.append('price', price);
  formData.append('address', address);
  formData.append('guideID', guideID);

  return await instance.post('/adventures', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}
export const adventureAPI = {
  getAdventuresByDestination,
  getPopularAdventures,
  saveAdventureReview,
  getAdventures,
  updateAdventure,
  addAdventure,
  deleteAdventure,
};
