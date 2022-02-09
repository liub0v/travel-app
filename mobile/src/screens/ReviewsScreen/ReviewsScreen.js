import React, {useCallback, useEffect, useState, useMemo} from 'react';

import {useRoute} from '@react-navigation/native';
import {
  UserAvatar,
  UserFirstNameTitle,
  UserInfoWrapper,
} from './CommentInput.style';
import {useDispatch, useSelector} from 'react-redux';
import {
  roleSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {showMessage} from 'react-native-flash-message';
import {getAdventureReview} from '../../../redux/actions/AdventureActions';

import {currentHotelReviewsSelector} from '../../../redux/selectors/HotelSelectors';
import {currentAdventureReviewsSelector} from '../../../redux/selectors/AdventureSelectors';
import {closeSocket} from '../../../redux/actions/CommentActions';
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';

import {Container, TitleWrapper} from './ReviewsScreen.style';
import {NormalText} from '../AuthScreens/LoginScreen/LoginScreen.style';
import {Comments} from './Comments';

import {ReviewForm} from './ReviewForm';

export const Author = ({nameTitle, imageURL}) => {
  return (
    <UserInfoWrapper>
      {imageURL ? (
        <UserAvatar source={{uri: imageURL}} />
      ) : (
        <UserAvatar source={DEFAULT_PROFILE_IMAGE} />
      )}
      <UserFirstNameTitle>{nameTitle}</UserFirstNameTitle>
    </UserInfoWrapper>
  );
};
export const ReviewsScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const type = route.params?.type;
  const onSubmit = route.params?.onSubmit;

  const isCriterionRating = useMemo(() => type === 'adventure', [type]);
  const [isCommentForm, setIsCommentForm] = useState(true);

  const commentSelector = useCallback(() => {
    if (type === 'hotel') {
      return currentHotelReviewsSelector;
    }
    if (type === 'adventure') {
      return currentAdventureReviewsSelector;
    }
  }, [type]);

  const user = useSelector(userSelector);
  const role = useSelector(roleSelector);
  const comments = useSelector(commentSelector())?.reverse();

  const nameTitle = useMemo(
    () =>
      user?.profileInfo?.firstName
        ? user?.profileInfo?.firstName
        : user?.profileInfo?.lastName
        ? user?.profileInfo?.lastName
        : user?.userID?.username,
    [user?.profileInfo?.firstName, user?.profileInfo?.lastName],
  );

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

  return (
    <Container>
      {role !== 'admin' && isCommentForm && (
        <>
          <Author
            nameTitle={nameTitle}
            imageURL={user?.profileInfo?.imageURL}
          />
          <ReviewForm
            showCriterionRating={isCriterionRating}
            onSubmitHandler={onSubmitHandler}
          />
        </>
      )}
      {!isCommentForm && (
        <TitleWrapper>
          <NormalText>Thank for your review!</NormalText>
        </TitleWrapper>
      )}
      <Comments comments={comments} />
    </Container>
  );
};
