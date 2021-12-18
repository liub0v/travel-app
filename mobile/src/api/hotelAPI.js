import {instance} from './index';

async function getHotelsByDestination(page = 1, limit = 8, destination) {
  return await instance.get('/hotels/ByDestination', {
    params: {page, limit, destination},
  });
}
async function getPopularHotels(page = 1, limit = 5) {
  return await instance.get('/hotels', {params: {page, limit}});
}
async function getHotels(page = 1, limit = 8) {
  return await instance.get('/hotels', {params: {page, limit}});
}
async function getHotelByID(hotelID) {
  return await instance.get('/hotels/byID', {params: {hotelID}});
}
async function getHotelByTerm(page = 1, limit = 8, term) {
  return await instance.get('/hotels/search', {params: {page, limit, term}});
}
async function saveHotelReview(token, hotelID, starsNumber, comment) {
  return await instance.post(
    '/hotels/comment',
    {
      hotelID,
      starsNumber,
      comment,
    },
    {
      headers: {'x-auth-token': token},
    },
  );
}
async function updateGallery(token, hotelID, images) {
  const formData = new FormData();
  formData.append('hotelID', hotelID);
  images.map((image, index) => {
    formData.append(`image_${index}`, {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
  });
  return await instance.post('/hotels/gallery', formData, {
    headers: {'x-auth-token': token},
  });
}
async function deleteGalleryImage(token, hotelID, imageURL) {
  return await instance.delete('/hotels/gallery', {
    headers: {'x-auth-token': token},
    data: {hotelID, imageURL},
  });
}
async function deleteHotel(token, hotelID) {
  return await instance.delete('/hotels', {
    headers: {'x-auth-token': token},
    data: {hotelID},
  });
}

async function addHotel(
  token,
  {name, image, summary, price, address, hotelOptions, starsNumber, gallery},
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
  formData.append('starsNumber', starsNumber);
  formData.append('hotelOptions', hotelOptions);
  const response = await instance.post('/hotels', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  const hotelID = response.data.hotelID;
  console.log(typeof hotelID);
  console.log(hotelID);
  return await updateGallery(token, hotelID, gallery);
}

async function updateHotel(
  token,
  {hotelID, name, image, summary, price, address, hotelOptions, starsNumber},
) {
  const formData = new FormData();
  formData.append('hotelID', hotelID);
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
  formData.append('starsNumber', starsNumber);
  formData.append('hotelOptions', hotelOptions);
  return await instance.put('/hotels', formData, {
    headers: {
      'x-auth-token': token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const hotelAPI = {
  updateHotel,
  getPopularHotels,
  getHotelsByDestination,
  saveHotelReview,
  getHotels,
  updateGallery,
  deleteGalleryImage,
  addHotel,
  deleteHotel,
  getHotelByID,
  getHotelByTerm,
};
