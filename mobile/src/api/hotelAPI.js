import {instance} from './index';

async function getHotelsByDestination(page = 1, limit = 5, destination) {
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
async function updateHotel(
  token,
  {
    hotelID,
    name,
    image,
    summary,
    price,
    address,
    hotelOptions,
    beds,
    starsNumber,
  },
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
};
