import {hotelReducer} from './HotelReducer';
import {ADD_HOTEL_COMPLETED} from '../types/HotelTypes';
import {STORE} from '../../src/tests/__mocks__/store-mock';
import {newHotelMock} from '../../src/tests/__mocks__/hotel-mocks';
import {addHotelCompleted} from '../actions/HotelActions';

describe('Hotel reducer', () => {
  describe('init state', () => {
    let output;
    beforeEach(() => {
      output = hotelReducer(undefined, {type: '@@INIT@@'});
    });
    it('should have init current hotel obj', () => {
      expect(output.currentHotel).toEqual({
        data: undefined,
        error: undefined,
        isLoading: false,
      });
    });
    it('should not have hotels', () => {
      expect(output.hotels).toBeUndefined();
    });
    it('should not have an error', () => {
      expect(output.error).toBeUndefined();
    });
    it('should not be isLoading', () => {
      expect(output.isLoading).toBe(false);
    });
  });
  describe(`${ADD_HOTEL_COMPLETED} action`, () => {
    let output;
    let state = STORE.hotel;
    describe('success', () => {
      beforeEach(() => {
        output = hotelReducer(state, addHotelCompleted(newHotelMock));
      });
      it('should set isLoading flag to false', () => {
        expect(output.add.isLoading).toBe(false);
      });
      it('should set hotel from action', () => {
        expect(output.hotels).toEqual([...state.hotels, newHotelMock]);
      });
    });
  });
});
