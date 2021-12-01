import {createSelector} from 'reselect';
const hotelSelector = state => state.hotel;
export const hotelsSelector = createSelector(
  hotelSelector,
  item => item.hotels,
);
