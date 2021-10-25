import {instance} from './index';

async function getAdventures(page = 1, limit = 3) {
  return await instance.get('/adventures', {params: {page, limit}});
}

export const adventureAPI = {getAdventures};
