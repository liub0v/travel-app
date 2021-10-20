import {instance} from './index';

async function getHotels() {
  return await instance.get('/hotels');
}

export const hotelAPI = {getHotels};
