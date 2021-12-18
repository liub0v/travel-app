import {instance} from './index';

async function getDestinations(page = 1, limit = 3) {
  return await instance.get('/destinations', {params: {page, limit}});
}

async function addDestination(token, {countryName, image}) {
  const formData = new FormData();
  formData.append('countryName', countryName);
  image &&
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  return await instance.post('/destinations', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}
async function updateDestination(token, {destinationID, countryName, image}) {
  console.log(destinationID);
  const formData = new FormData();
  formData.append('destinationID', destinationID);
  formData.append('countryName', countryName);
  image &&
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  return await instance.put('/destinations', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteDestination(token, destinationID) {
  return await instance.delete('/destinations', {
    headers: {'x-auth-token': token},
    data: {destinationID},
  });
}
export const destinationAPI = {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
};
