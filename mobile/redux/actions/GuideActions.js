import {
  ADD_GUIDE,
  ADD_GUIDE_COMPLETED,
  ADD_GUIDE_STARTED,
  DELETE_GUIDE,
  DELETE_GUIDE_COMPLETED,
  DELETE_GUIDE_STARTED,
  GET_GUIDES,
  SET_GUIDES_COMPLETED,
  SET_GUIDES_ERROR,
  SET_GUIDES_STARTED,
  SET_HAS_MORE_GUIDES,
  UPDATE_GUIDE,
  UPDATE_GUIDE_COMPLETED,
  UPDATE_GUIDE_STARTED,
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
export const deleteGuide = userID => {
  return {
    type: DELETE_GUIDE,
    payload: userID,
  };
};
export const deleteGuideStarted = isLoading => {
  return {
    type: DELETE_GUIDE_STARTED,
    payload: isLoading,
  };
};
export const deleteGuideCompleted = userID => {
  return {
    type: DELETE_GUIDE_COMPLETED,
    payload: userID,
  };
};

export const updateGuide = guideData => {
  return {
    type: UPDATE_GUIDE,
    payload: guideData,
  };
};
export const updateGuideStarted = isLoading => {
  return {
    type: UPDATE_GUIDE_STARTED,
    payload: isLoading,
  };
};
export const updateGuideCompleted = guide => {
  return {
    type: UPDATE_GUIDE_COMPLETED,
    payload: guide,
  };
};
