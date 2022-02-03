import {
  currentHotelIsLoadingSelector,
  currentHotelReviewsSelector,
  currentHotelSelector,
  getHotelGallerySelector,
  hotelsSelector,
} from './HotelSelectors';
import {STORE} from '../../src/tests/__mocks__/store-mock';

describe('hotel selectors', () => {
  let state = STORE;

  describe('hotels selector', () => {
    it('should return hotels ', () => {
      const output = hotelsSelector(state);

      expect(output).toBe(state.hotel.hotels);
    });
  });

  describe('current hotel selector', () => {
    it('should return current hotel data', () => {
      const output = currentHotelSelector(state);

      expect(output).toBe(state.hotel.currentHotel.data);
    });
    it('should return current hotel isLoading', () => {
      const output = currentHotelIsLoadingSelector(state);

      expect(output).toBe(state.hotel.currentHotel.isLoading);
    });
    it('should return current hotel reviews', () => {
      const output = currentHotelReviewsSelector(state);

      expect(output).toBe(state.hotel.currentHotel.data.reviews);
    });
  });

  describe('get hotel gallery by id', () => {
    it('should return hotels gallery by id ', () => {
      const hotelID = '345';
      const selector = getHotelGallerySelector(hotelID);
      const output = selector(state);
      const expectedOutput = state.hotel.hotels.find(
        hotel => hotel._id === hotelID,
      )?.gallery;
      expect(output).toBe(expectedOutput);
    });
  });
});
