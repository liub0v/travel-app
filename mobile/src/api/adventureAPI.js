import {instance} from './index';

async function getAdventuresByDestination(page = 1, limit = 3, destination) {
  return await instance.get('/adventures/byDestination', {
    params: {page, limit, destination},
  });
}
async function getPopularAdventures(page = 1, limit = 3) {
  return await instance.get('/adventures', {
    params: {page, limit},
  });
}
export const adventureAPI = {getAdventuresByDestination, getPopularAdventures};
