import {useMemo} from 'react';
import {currentHotelReviewsSelector} from '../../../redux/selectors/HotelSelectors';
import {currentAdventureReviewsSelector} from '../../../redux/selectors/AdventureSelectors';
import {useSelector} from 'react-redux';

export type useReviewsType = {
  comments: Array<any>;
  isCriterionRating: boolean;
};

export const useReviews: useReviewsType = (type: string) => {
  const isCriterionRating = useMemo(() => type === 'adventure', [type]);
  const commentSelector = () => {
    if (type === 'hotel') {
      return currentHotelReviewsSelector;
    }
    if (type === 'adventure') {
      return currentAdventureReviewsSelector;
    }
  };

  const comments = useSelector(commentSelector())?.reverse();

  return {comments, isCriterionRating};
};
