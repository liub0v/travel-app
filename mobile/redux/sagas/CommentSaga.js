import {take, put, call, fork, takeEvery} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import io from 'socket.io-client';
import {addAdventureReview} from '../actions/AdventureActions';
import {GET_ADVENTURE_REVIEW} from '../types/AdventureTypes';

export const commentsSagas = [takeEvery(GET_ADVENTURE_REVIEW, flow)];
function connect() {
  const socket = io('http://192.168.43.50:3000/');
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
    socket.on('review', ({review, adventureID}) => {
      emit(addAdventureReview({review, adventureID}));
    });
    return () => {
      socket.close();
    };
  });
}

export function* flow() {
  const socket = yield call(connect);
  yield fork(read, socket);
}
