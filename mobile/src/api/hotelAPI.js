import {instance} from './index';

async function getHotels(page = 1, limit = 5) {
  return await instance.get('/hotels', {params: {page, limit}});
}

export const hotelAPI = {getHotels};
