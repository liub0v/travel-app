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
