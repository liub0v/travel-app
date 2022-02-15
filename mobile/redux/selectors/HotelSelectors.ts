import {createSelector, Selector} from 'reselect';
import {savedHotelsSelector, visitedHotelsSelector} from './UserSelector';
import {RootState} from '../reducers';
import {THotel} from '../reducers/HotelReducer';

const hotelSelector = (state: RootState) => state.hotel;

export const hotelsSelector: Selector<
  RootState,
  Array<THotel>
> = createSelector(hotelSelector, item => item.hotels);
export const currentHotelSelector: Selector<RootState, THotel> = createSelector(
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
export const updateHotelIsLoadingSelector = createSelector(
  hotelSelector,
  item => item.update.isLoading,
);
export const addHotelIsLoadingSelector = createSelector(
  hotelSelector,
  item => item.add.isLoading,
);
export const deleteGalleryImageIsLoadingSelector = createSelector(
  hotelSelector,
  item => item.gallery.delete.isLoading,
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

export const getHotelGallerySelector = (hotelID: string) => {
  return createSelector(
    hotelsSelector,
    hotels => hotels?.find(hotel => hotel._id === hotelID)?.gallery,
  );
};

export const getIsLikedHotelSelector = (hotelID: string) => {
  return createSelector(savedHotelsSelector, hotels =>
    hotels?.find((hotel: THotel) => hotel._id === hotelID),
  );
};

export const getIsVisitedHotelSelector = (hotelID: string) => {
  return createSelector(visitedHotelsSelector, hotels =>
    hotels?.find((hotel: THotel) => hotel._id === hotelID),
  );
};
