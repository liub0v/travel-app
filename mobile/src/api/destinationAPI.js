import {instance} from './index';

async function getDestinations(page = 1, limit = 3) {
  return await instance.get('/destinations', {params: {page, limit}});
}

export const destinationAPI = {getDestinations};
