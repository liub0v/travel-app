import {
  ADD_GUIDE_COMPLETED,
  ADD_GUIDE_STARTED,
  SET_GUIDES_COMPLETED,
  SET_GUIDES_ERROR,
  SET_GUIDES_STARTED,
  SET_HAS_MORE_GUIDES,
} from '../types/GuideTypes';

const initialState = {
  guides: undefined,
  isLoading: false,
  error: undefined,
  hasMore: true,
  addLoading: true,
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

    default:
      return state;
  }
};
