import {instance} from './index';

async function getDestinations() {
  return await instance.get('/destinations');
}

export const destinationAPI = {getDestinations};
