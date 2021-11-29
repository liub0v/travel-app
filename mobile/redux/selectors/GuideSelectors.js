import {createSelector} from 'reselect';

const guideSelector = state => state.guide;

export const guidesSelector = createSelector(
  guideSelector,
  item => item.guides,
);
export const hasMoreGuidesSelector = createSelector(
  guideSelector,
  item => item.hasMore,
);
export const isLoadingGuidesSelector = createSelector(
  guideSelector,
  item => item.isLoading,
);
export const addGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.addLoading,
);
export const deleteGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.deleteLoading,
);
export const getGuideSelector = guideID => {
  return createSelector(guidesSelector, guides =>
    guides?.find(guide => guide.userID._id === guideID),
  );
};
export const getGuideProfileInfoSelector = guideID => {
  return createSelector(guidesSelector, guides => {
    const guide = guides?.find(guide => guide.userID._id === guideID);
    return guide?.profileInfo;
  });
};
export const getGuideInfoSelector = guideID => {
  return createSelector(guidesSelector, guides => {
    const guide = guides?.find(guide => guide.userID._id === guideID);
    return guide?.userID;
  });
};
