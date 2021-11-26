import {
  ADD_GUIDE,
  ADD_GUIDE_COMPLETED,
  ADD_GUIDE_STARTED,
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

export const addGuide = ({username, email, password}) => {
  return {
    type: ADD_GUIDE,
    payload: {username, email, password},
  };
};
export const addGuideStarted = isLoading => {
  return {
    type: ADD_GUIDE_STARTED,
    payload: isLoading,
  };
};
export const addGuideCompleted = guide => {
  return {
    type: ADD_GUIDE_COMPLETED,
    payload: guide,
  };
};
