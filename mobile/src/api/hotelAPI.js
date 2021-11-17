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
  return await instance.put(
    '/hotels',
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
    {
      headers: {'x-auth-token': token},
    },
  );
}
export const hotelAPI = {
  updateHotel,
  getPopularHotels,
  getHotelsByDestination,
  saveHotelReview,
  getHotels,
};
