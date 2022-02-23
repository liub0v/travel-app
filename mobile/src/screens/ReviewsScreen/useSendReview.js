import {useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {getAdventureReview} from '../../../redux/actions/AdventureActions';
import {closeSocket} from '../../../redux/actions/CommentActions';
import {useDispatch} from 'react-redux';

export const useSendReview = onSubmit => {
  const dispatch = useDispatch();
  const [isCommentForm, setIsCommentForm] = useState(true);

  const onSubmitHandler = async ({
    commentText,
    interestingRatingValue,
    guideRatingValue,
    serviceRatingValue,
    priceRatingValue,
    starsRatingValue,
  }) => {
    try {
      await onSubmit(
        starsRatingValue,
        commentText,
        interestingRatingValue,
        guideRatingValue,
        serviceRatingValue,
        priceRatingValue,
      );

      setIsCommentForm(false);
    } catch (error) {
      setIsCommentForm(true);
      showMessage({
        message: error.response?.data,
        type: 'error',
      });
    }
  };
  useEffect(() => {
    dispatch(getAdventureReview());
  }, []);

  useEffect(() => {
    return () => dispatch(closeSocket());
  }, []);

  return {isCommentForm, onSubmitHandler};
};
