import {
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
  SET_HAS_MORE_ADVENTURES,
  SET_POPULAR_ADVENTURES,
} from '../types/AdventureTypes';
import {SET_HAS_MORE_DESTINATIONS} from '../types/DestinationTypes';

const initialState = {
  popularAdventures: undefined,
  adventures: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
};

export const adventureReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_ADVENTURES: {
      if (state.adventures) {
        return {...state, adventures: [...state.adventures, ...payload]};
      }
      return {...state, adventures: payload};
    }
    case SET_HAS_MORE_ADVENTURES:
      return {...state, hasMore: payload};
    case SET_POPULAR_ADVENTURES:
      return {...state, popularAdventures: payload};
    case SET_ADVENTURES_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_ADVENTURES_ERROR:
      return {...state, error: payload};
    default:
      return state;
  }
};
