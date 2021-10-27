import {createSelector} from 'reselect';
const adventureSelector = state => state.adventure;
export const adventuresSelector = createSelector(
  adventureSelector,
  item => item.adventures,
);
export const isLoadingAdventureSelector = createSelector(
  adventureSelector,
  item => item.isLoading,
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
export const adventuresByDestinationSelector = createSelector(
  adventuresSelector,
  (_, destination) => destination,
  (item, destination) => {
    return item.filter(item => {
      const location = item.address.split(',')[1].trim();
      return location === destination;
    });
  },
);
