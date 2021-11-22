import {createSelector} from 'reselect';
import {adventuresSelector} from './AdventureSelectors';

const hotelSelector = state => state.hotel;
export const hotelsSelector = createSelector(
  hotelSelector,
  item => item.hotels,
);
export const isLoadingHotelSelector = createSelector(
  hotelSelector,
  item => item.isLoading,
);
export const errorHotelSelector = createSelector(
  hotelSelector,
  item => item.error,
);
export const hasMoreHotelsSelector = createSelector(
  hotelSelector,
  item => item.hasMore,
);
export const popularHotelsSelector = createSelector(
  hotelSelector,
  item => item.popularHotels,
);
export const getHotelReviewsSelector = hotelID => {
  return createSelector(
    hotelsSelector,
    hotels => hotels.find(hotel => hotel._id === hotelID).reviews,
  );
};
export const getHotelGallerySelector = hotelID => {
  return createSelector(
    hotelsSelector,
    hotels => hotels.find(hotel => hotel._id === hotelID)?.gallery,
  );
};
