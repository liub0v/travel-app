import {
  GET_GUIDES,
  SET_GUIDES_COMPLETED,
  SET_GUIDES_ERROR,
  SET_GUIDES_STARTED,
  SET_HAS_MORE_GUIDES,
} from '../types/GuideTypes';

export const setGuidesCompleted = guides => {
  return {
    type: SET_GUIDES_COMPLETED,
    payload: guides,
  };
};
export const getGuides = ({page, limit}) => {
  return {
    type: GET_GUIDES,
    payload: {page, limit},
  };
};
export const setGuidesStarted = isLoading => {
  return {
    type: SET_GUIDES_STARTED,
    payload: isLoading,
  };
};
export const setGuidesError = error => {
  return {
    type: SET_GUIDES_ERROR,
    payload: error,
  };
};
export const setHasMoreGuides = hasMore => {
  return {
    type: SET_HAS_MORE_GUIDES,
    payload: hasMore,
  };
};
