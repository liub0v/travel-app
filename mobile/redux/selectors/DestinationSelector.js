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
