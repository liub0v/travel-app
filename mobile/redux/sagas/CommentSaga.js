import {take, put, call, fork, takeEvery, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';
import {addAdventureReview} from '../actions/AdventureActions';
import {GET_ADVENTURE_REVIEW} from '../types/AdventureTypes';
import {addHotelReview} from '../actions/HotelActions';
import {CLOSE_SOCKET} from '../types/CommentTypes';
import {socketSelector} from '../selectors/CommentSelectors';
import {setSocket} from '../actions/CommentActions';

export const commentsSagas = [
  takeEvery(GET_ADVENTURE_REVIEW, flow),
  takeEvery(CLOSE_SOCKET, closeSocketSaga),
];

function connect() {
  const socket = io('http://192.168.43.50:3000/');
  // const socket = io('http://localhost:3000/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);

    yield put(action);
  }
}

export function* subscribe(socket) {
  return new eventChannel(emit => {
    socket.on('review', ({review, adventureID, rating}) => {
      emit(addAdventureReview({review, adventureID, rating}));
    });
    socket.on('comment', ({review, rating, hotelID}) => {
      emit(addHotelReview({review, rating, hotelID}));
    });
    return () => {
      socket.close();
    };
  });
}

export function* flow() {
  const socket = yield call(connect);
  yield put(setSocket(socket));
  yield fork(read, socket);
}
export function* closeSocketSaga() {
  const socket = yield select(socketSelector);
  socket && socket.close();
}
