import {
  ADD_ADVENTURE_COMPLETED,
  ADD_ADVENTURE_REVIEW,
  ADD_ADVENTURE_STARTED,
  CLEAR_ADVENTURES,
  DELETE_ADVENTURE_COMPLETED,
  DELETE_ADVENTURE_STARTED,
  SAVE_ADVENTURE_STARTED,
  SET_ADVENTURES,
  SET_ADVENTURES_ERROR,
  SET_ADVENTURES_IS_LOADING,
  SET_HAS_MORE_ADVENTURES,
  SET_POPULAR_ADVENTURES,
  SET_POPULAR_ADVENTURES_STARTED,
  UPDATE_ADVENTURE_COMPLETED,
  UPDATE_ADVENTURE_STARTED,
} from '../types/AdventureTypes';

const initialState = {
  popularAdventures: undefined,
  adventures: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  popularAdventuresLoading: false,
  updateLoading: false,
  addLoading: false,
  deleteLoading: false,
  saveLoading: false,
};

export const adventureReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_ADVENTURES: {
      if (state.adventures) {
        return {...state, adventures: [...state.adventures, ...payload]};
      }
      return {...state, adventures: payload};
    }
    case CLEAR_ADVENTURES:
      return {...state, adventures: undefined, hasMore: true};
    case SET_HAS_MORE_ADVENTURES:
      return {...state, hasMore: payload};
    case SET_POPULAR_ADVENTURES:
      return {...state, popularAdventures: payload};
    case SET_ADVENTURES_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_ADVENTURES_ERROR:
      return {...state, error: payload};
    case ADD_ADVENTURE_REVIEW: {
      const adventureIndex = state.adventures.findIndex(adventure => {
        return adventure._id === payload.adventureID;
      });
      const adventuresCopy = [...state.adventures];
      adventuresCopy[adventureIndex].reviews = [
        ...adventuresCopy[adventureIndex].reviews,
        payload.review,
      ];
      return {
        ...state,
        adventures: [...adventuresCopy],
      };
    }
    case UPDATE_ADVENTURE_STARTED:
      return {...state, updateLoading: payload};
    case UPDATE_ADVENTURE_COMPLETED: {
      const adventureIndex = state.adventures.findIndex(adventure => {
        return adventure._id === payload._id;
      });
      const adventuresCopy = [...state.adventures];
      adventuresCopy[adventureIndex] = payload;
      return {
        ...state,
        adventures: [...adventuresCopy],
      };
    }
    case ADD_ADVENTURE_STARTED:
      return {...state, addLoading: payload};
    case ADD_ADVENTURE_COMPLETED:
      {
        if (state.adventures) {
          return {...state, adventures: [...state.adventures, payload]};
        }
      }
      return {...state, adventures: [payload]};
    case DELETE_ADVENTURE_STARTED:
      return {...state, deleteLoading: payload};
    case DELETE_ADVENTURE_COMPLETED:
      return {
        ...state,
        adventures: [
          ...state.adventures.filter(adventure => adventure._id !== payload),
        ],
      };
    case SET_POPULAR_ADVENTURES_STARTED:
      return {...state, popularAdventuresLoading: payload};
    case SAVE_ADVENTURE_STARTED:
      return {...state, saveLoading: payload};
    default:
      return state;
  }
};
