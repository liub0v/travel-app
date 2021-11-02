import {instance} from './index';

async function getHotelsByDestination(page = 1, limit = 5, destination) {
  return await instance.get('/hotels/ByDestination', {
    params: {page, limit, destination},
  });
}
async function getPopularHotels(page = 1, limit = 5) {
  return await instance.get('/hotels', {params: {page, limit}});
}

export const hotelAPI = {getPopularHotels, getHotelsByDestination};
