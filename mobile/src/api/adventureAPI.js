import {instance} from './index';

async function getAdventures() {
  return await instance.get('/adventures');
}

export const adventureAPI = {getAdventures};
