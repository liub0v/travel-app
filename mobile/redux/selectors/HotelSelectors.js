import {createSelector} from 'reselect';
import {savedHotelsSelector, visitedHotelsSelector} from './UserSelector';

const hotelSelector = state => state.hotel;
export const hotelsSelector = createSelector(
  hotelSelector,
  item => item.hotels,
);
export const currentHotelSelector = createSelector(
  hotelSelector,
  item => item.currentHotel.data,
);
export const currentHotelReviewsSelector = createSelector(
  currentHotelSelector,
  item => item?.reviews,
);
export const currentHotelIsLoadingSelector = createSelector(
  hotelSelector,
  item => item.currentHotel.isLoading,
);
export const isLoadingHotelSelector = createSelector(
  hotelSelector,
  item => item.isLoading,
);
export const popularHotelsLoaderSelector = createSelector(
  hotelSelector,
  item => item.popularHotelsLoader,
);
export const deleteHotelStartedSelector = createSelector(
  hotelSelector,
  item => item.deleteHotelLoader,
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

export const getHotelGallerySelector = hotelID => {
  return createSelector(
    hotelsSelector,
    hotels => hotels.find(hotel => hotel._id === hotelID)?.gallery,
  );
};

export const getIsLikedHotelSelector = hotelID => {
  return createSelector(savedHotelsSelector, hotels =>
    hotels.find(hotel => hotel._id === hotelID),
  );
};

export const getIsVisitedHotelSelector = hotelID => {
  return createSelector(visitedHotelsSelector, hotels =>
    hotels.find(hotel => hotel._id === hotelID),
  );
};
