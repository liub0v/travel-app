import React, {useMemo} from 'react';

import {useRoute} from '@react-navigation/native';
import {
  UserAvatar,
  UserFirstNameTitle,
  UserInfoWrapper,
} from './CommentInput.style';
import {useSelector} from 'react-redux';
import {
  roleSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';

import {Container, TitleWrapper} from './ReviewsScreen.style';
import {NormalText} from '../AuthScreens/LoginScreen/LoginScreen.style';
import {Comments} from './Comments';

import {ReviewForm} from './ReviewForm';
import {useReviews} from './useReviews';
import {useSendReview} from './useSendReview';

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

  const type = route.params?.type;
  const onSubmit = route.params?.onSubmit;

  const {comments, isCriterionRating} = useReviews(type);
  const {isCommentForm, onSubmitHandler} = useSendReview(onSubmit);

  const user = useSelector(userSelector);
  const role = useSelector(roleSelector);

  const nameTitle = useMemo(
    () =>
      user?.profileInfo?.firstName
        ? user?.profileInfo?.firstName
        : user?.profileInfo?.lastName
        ? user?.profileInfo?.lastName
        : user?.userID?.username,
    [user?.profileInfo?.firstName, user?.profileInfo?.lastName],
  );

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
