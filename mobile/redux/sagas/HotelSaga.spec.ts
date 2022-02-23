import {Action} from 'redux';

jest.mock('../../src/api/hotelAPI');

import {runSaga, SagaIterator, Task} from 'redux-saga';
import {ExpectApi, expectSaga, testSaga} from 'redux-saga-test-plan';
import {addHotelSaga, getHotelsSaga, updateHotelSaga} from './HotelSagas';
import {
  addHotel,
  addHotelCompleted,
  addHotelStarted,
  getHotels,
  setHasMoreHotels,
  setHotels,
  setHotelsError,
  setHotelsIsLoading,
  updateHotel,
  updateHotelCompleted,
  updateHotelStarted,
} from '../actions/HotelActions';
import {
  newHotelDataMock,
  newHotelMock,
} from '../../src/tests/__mocks__/hotel-mocks';
import {call, put, select} from 'redux-saga-test-plan/matchers';
import {tokenSelector} from '../selectors/UserSelector';
import {hotelAPI} from '../../src/api/hotelAPI';
import {throwError} from 'redux-saga-test-plan/providers';
import {errorHandler} from './ErrorHandler';
import {STORE} from '../../src/tests/__mocks__/store-mock';
import {AxiosError, AxiosResponse} from 'axios';

describe('Hotel sagas', () => {
  //Integration Testing with redux-saga-test-plan
  //Mocking with Providers
  describe('testing addHotel saga', () => {
    describe('success api call', () => {
      let saga: ExpectApi;
      let action = addHotel(newHotelDataMock);
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY4MjgwMTg5ZDJhODEyN2UxNDkzMGUiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQzOTYwMTY2fQ.TjJGznuns_mjnia9tE21MN3-YsHY-bO3Hq30QGGUfrQ';
      beforeEach(() => {
        saga = expectSaga(addHotelSaga, action).provide([
          [select(tokenSelector), token],
          [call.fn(hotelAPI.addHotel), {data: newHotelMock}],
        ]);
      });
      it('should dispatch a started action', async () => {
        await saga.put(addHotelStarted(true)).run(false);
      });
      it('should dispatch a successfully completed action with results from API', async () => {
        await saga.put(addHotelCompleted(newHotelMock)).run(false);
      });
      it('should dispatch a started action after api call', async () => {
        await saga.put(addHotelStarted(false)).run(false);
      });
    });

    describe('error api call', () => {
      let saga: ExpectApi;
      const error = new Error('test error');
      let action = addHotel(newHotelDataMock);
      let token = 'test token';
      beforeEach(() => {
        saga = expectSaga(addHotelSaga, action).provide([
          [select(tokenSelector), token],
          [call.fn(hotelAPI.addHotel), throwError(error)],
        ]);
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('should dispatch a started action', async () => {
        await saga.put(addHotelStarted(true)).run(false);
      });
      it('should set the error', async () => {
        await saga.call(errorHandler, error).run(false);
      });
      it('should dispatch a error completed api call', async () => {
        await saga.put(setHotelsError(error)).run(false);
      });
      it('should dispatch a started action after api call failed', async () => {
        await saga.put(addHotelStarted(false)).run(false);
      });
    });
  });

  // Testing saga order
  describe('testing updateHotelSaga', () => {
    let sagaAction = updateHotel(newHotelDataMock);
    let iterator: SagaIterator;

    //Saga iterator
    it('call api and dispatch actions successfully ', () => {
      iterator = updateHotelSaga(sagaAction);
      const token = 'asgvfmjasdgm';
      let response: AxiosResponse = {
        data: newHotelMock,
        status: 200,
        headers: {},
        statusText: '',
        config: {},
      };
      expect(iterator.next().value).toEqual(put(updateHotelStarted(true)));
      expect(iterator.next().value).toEqual(select(tokenSelector));
      expect(iterator.next(token).value).toEqual(
        call(hotelAPI.updateHotel, token, sagaAction.payload),
      );
      expect(iterator.next(response).value).toEqual(
        put(updateHotelCompleted(newHotelMock)),
      );
      expect(iterator.next().value).toEqual(put(updateHotelStarted(false)));
    });

    //unit test
    it('error api call', () => {
      const token = 'asgvfmjasdgm';
      let responseError: AxiosError = {
        config: {},
        isAxiosError: true,
        message: 'error',
        toJSON: () => ({}),
        name: 'Error name',
      };
      testSaga(updateHotelSaga, sagaAction)
        .next()
        .put(updateHotelStarted(true))
        .next()
        .select(tokenSelector)
        .next(token)
        .call(hotelAPI.updateHotel, token, newHotelDataMock)
        .throw(responseError)
        .put(updateHotelStarted(false))
        .next()
        .put(setHotelsError(responseError))
        .next()
        .call(errorHandler, responseError);
    });
  });

  //Testing saga with runSaga() method
  describe('testing getHotelsSaga', () => {
    let saga: Task;
    let sagaAction = getHotels({page: 1, limit: 8});
    let hotels = [...STORE.hotel.hotels];

    let dispatched: Array<Action>;

    let response: AxiosResponse = {
      data: hotels,
      status: 200,
      headers: {},
      statusText: '',
      config: {},
    };
    let responseError: AxiosError = {
      config: {},
      isAxiosError: true,
      message: 'error',
      toJSON: () => ({}),
      name: 'Error name',
    };

    describe('success api call', () => {
      let getHotelsApiMock: jest.SpyInstance;
      const runSagaWrapper = async (response: AxiosResponse) => {
        getHotelsApiMock = jest
          .spyOn(hotelAPI, 'getHotels')
          .mockImplementation(() => Promise.resolve(response));
        dispatched = [];
        saga = await runSaga(
          {
            dispatch: (action: Action) => dispatched.push(action),
          },
          getHotelsSaga,
          sagaAction,
        );
      };
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('0 < hotels length < limit ', async () => {
        await runSagaWrapper(response);
        expect(dispatched[0]).toEqual(setHotelsIsLoading(true));
        expect(getHotelsApiMock).toHaveBeenCalledTimes(1);
        expect(dispatched[1]).toEqual(setHotels(hotels));
        expect(dispatched[2]).toEqual(setHotelsIsLoading(false));
      });

      it('hotels length = 0', async () => {
        response.data = [];
        await runSagaWrapper(response);
        expect(dispatched[0]).toEqual(setHotelsIsLoading(true));
        expect(getHotelsApiMock).toHaveBeenCalledTimes(1);
        expect(dispatched[1]).toEqual(setHasMoreHotels(false));
        expect(dispatched[2]).toEqual(setHotels([]));
        expect(dispatched[3]).toEqual(setHotelsIsLoading(false));
      });
    });

    describe('error api call', () => {
      let getHotelsApiMock: jest.SpyInstance;
      let errorHandlerMock: jest.SpyInstance = jest.spyOn(
        require('./ErrorHandler'),
        'errorHandler',
      );
      beforeEach(async () => {
        getHotelsApiMock = jest
          .spyOn(hotelAPI, 'getHotels')
          .mockImplementation(() => Promise.reject(responseError));

        dispatched = [];
        saga = await runSaga(
          {
            dispatch: (action: Action) => dispatched.push(action),
          },
          getHotelsSaga,
          sagaAction,
        );
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('error from api', () => {
        expect(getHotelsApiMock).toHaveBeenCalledTimes(1);
        expect(dispatched[0]).toEqual(setHotelsIsLoading(true));
        expect(dispatched[1]).toEqual(setHotelsIsLoading(false));
        expect(dispatched[2]).toEqual(setHotelsError(responseError));
        expect(errorHandlerMock).toHaveBeenCalledTimes(1);
        expect(errorHandlerMock).toHaveBeenCalledWith(
          responseError,
          sagaAction,
        );
      });
    });
  });
});
