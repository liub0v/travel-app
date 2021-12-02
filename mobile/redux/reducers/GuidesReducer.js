import {
  ADD_GUIDE_COMPLETED,
  ADD_GUIDE_STARTED,
  CLEAR_GUIDES,
  DELETE_GUIDE_COMPLETED,
  DELETE_GUIDE_STARTED,
  SET_GUIDES_COMPLETED,
  SET_GUIDES_ERROR,
  SET_GUIDES_STARTED,
  SET_HAS_MORE_GUIDES,
  UPDATE_GUIDE_COMPLETED,
  UPDATE_GUIDE_STARTED,
} from '../types/GuideTypes';

const initialState = {
  guides: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  addLoading: false,
  deleteLoading: false,
  update: {
    isLoading: false,
    error: undefined,
  },
};
export const guideReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_GUIDES_COMPLETED: {
      if (state.guides) {
        return {...state, guides: [...state.guides, ...payload]};
      }
      return {...state, guides: payload};
    }
    case SET_GUIDES_STARTED:
      return {...state, isLoading: payload};
    case SET_GUIDES_ERROR:
      return {...state, error: payload};
    case SET_HAS_MORE_GUIDES:
      return {...state, hasMore: payload};
    case ADD_GUIDE_STARTED:
      return {...state, addLoading: payload};
    case ADD_GUIDE_COMPLETED: {
      if (state.guides) {
        return {...state, guides: [...state.guides, payload]};
      }
      return {...state, guides: [payload]};
    }
    case DELETE_GUIDE_STARTED:
      return {...state, deleteLoading: payload};
    case DELETE_GUIDE_COMPLETED:
      return {
        ...state,
        guides: [
          ...state.guides.filter(guide => guide?.userID?._id !== payload),
        ],
      };
    case UPDATE_GUIDE_STARTED:
      return {...state, update: {...state.update, isLoading: payload}};
    case UPDATE_GUIDE_COMPLETED: {
      const guideIndex = state.guides.findIndex(guide => {
        return guide._id === payload._id;
      });
      const guidesCopy = [...state.guides];
      guidesCopy[guideIndex] = payload;
      return {
        ...state,
        guides: [...guidesCopy],
      };
    }
    case CLEAR_GUIDES: {
      return {...state, guides: undefined, hasMore: true};
    }
    default:
      return state;
  }
};
