import {createSelector} from 'reselect';
const destinationSelector = state => state.destination;
export const destinationsSelector = createSelector(
  destinationSelector,
  item => item.destinations,
);
export const hasMoreDestinationsSelector = createSelector(
  destinationSelector,
  item => item.hasMore,
);
export const popularDestinationsSelector = createSelector(
  destinationSelector,
  item => item.popularDestinations,
);
export const popularDestinationsLoaderSelector = createSelector(
  destinationSelector,
  item => item.popularDestinationsLoading,
);
export const destinationsLoader = createSelector(
  destinationSelector,
  item => item.isLoading,
);
