import {instance} from './index';

async function getDestinationsByName(page = 1, limit = 8, countryName) {
  return await instance.get('/destinations/search', {
    params: {page, limit, countryName},
  });
}
async function getFilteredHotels(
  page = 1,
  limit = 8,
  priceRange,
  hotelOptions,
) {
  return await instance.get('/hotels/filter', {
    params: {page, limit, priceRange, hotelOptions},
  });
}

export const searchAPI = {getDestinationsByName, getFilteredHotels};
