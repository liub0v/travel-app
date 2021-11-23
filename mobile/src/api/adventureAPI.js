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
async function getAdventures(page = 1, limit = 6) {
  return await instance.get('/adventures', {
    params: {page, limit},
  });
}
async function saveAdventureReview(
  token,
  adventureID,
  starsNumber,
  interestingRating,
  guideRating,
  serviceRating,
  priceRating,
  comment,
) {
  return await instance.post(
    '/adventures/review',
    {
      adventureID,
      interestingRating,
      serviceRating,
      guideRating,
      starsNumber,
      priceRating,
      comment,
    },
    {
      headers: {'x-auth-token': token},
    },
  );
}
export const adventureAPI = {
  getAdventuresByDestination,
  getPopularAdventures,
  saveAdventureReview,
  getAdventures,
};
