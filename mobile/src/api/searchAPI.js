import {instance} from './index';

async function getDestinationsByName(page = 1, limit = 8, countryName) {
  return await instance.get('/destinations/search', {
    params: {page, limit, countryName},
  });
}

export const searchAPI = {getDestinationsByName};
