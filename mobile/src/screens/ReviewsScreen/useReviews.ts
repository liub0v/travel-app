import {useMemo} from 'react';
import {currentHotelReviewsSelector} from '../../../redux/selectors/HotelSelectors';
import {currentAdventureReviewsSelector} from '../../../redux/selectors/AdventureSelectors';
import {DefaultRootState, useSelector} from 'react-redux';

export type useReviewsType = {
  comments: Array<any>;
  isCriterionRating: boolean;
};

export const useReviews = (type: string): useReviewsType => {
  const isCriterionRating = useMemo(() => type === 'adventure', [type]);

  const commentSelector = (): ((state: DefaultRootState) => unknown) => {
    if (type === 'hotel') {
      return currentHotelReviewsSelector;
    }
    if (type === 'adventure') {
      return currentAdventureReviewsSelector;
    }
    return currentAdventureReviewsSelector;
  };

  const comments = useSelector(commentSelector())?.reverse();

  return {comments, isCriterionRating};
};
