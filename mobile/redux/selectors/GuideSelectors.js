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
export const errorGuidesSelector = createSelector(
  guideSelector,
  item => item.error,
);
export const addGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.addLoading,
);
export const deleteGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.deleteLoading,
);
export const updateGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.update.isLoading,
);
export const currentGuideSelector = createSelector(
  guideSelector,
  item => item.currentGuide.data,
);
export const currentGuideLoaderSelector = createSelector(
  guideSelector,
  item => item.currentGuide.isLoading,
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
