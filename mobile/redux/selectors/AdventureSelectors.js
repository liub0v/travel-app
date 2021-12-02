import {createSelector} from 'reselect';
const adventureSelector = state => state.adventure;
export const adventuresSelector = createSelector(
  adventureSelector,
  item => item.adventures,
);
//loading
export const isLoadingAdventureSelector = createSelector(
  adventureSelector,
  item => item.isLoading,
);
export const updateAdventureLoaderSelector = createSelector(
  adventureSelector,
  item => item.updateLoading,
);
export const addAdventureLoaderSelector = createSelector(
  adventureSelector,
  item => item.addLoading,
);
export const deleteAdventureLoaderSelector = createSelector(
  adventureSelector,
  item => item.deleteLoading,
);
export const popularAdventuresLoaderSelector = createSelector(
  adventureSelector,
  item => item.popularAdventuresLoading,
);

export const errorAdventureSelector = createSelector(
  adventureSelector,
  item => item.error,
);
export const hasMoreAdventuresSelector = createSelector(
  adventureSelector,
  item => item.hasMore,
);
export const popularAdventuresSelector = createSelector(
  adventureSelector,
  item => item.popularAdventures,
);
//reviews
export const getAdventureReviewsSelector = adventureID => {
  return createSelector(
    adventuresSelector,
    adventures =>
      adventures.find(adventure => adventure._id === adventureID).reviews,
  );
};
export const getPopularAdventureReviewsSelector = adventureID => {
  return createSelector(
    popularAdventuresSelector,
    adventures =>
      adventures.find(adventure => adventure._id === adventureID).reviews,
  );
};
