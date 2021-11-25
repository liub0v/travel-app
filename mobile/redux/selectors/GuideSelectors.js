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
export const getGuideSelector = guideID => {
  return createSelector(guidesSelector, guides =>
    guides?.find(guide => guide.userID === guideID),
  );
};
