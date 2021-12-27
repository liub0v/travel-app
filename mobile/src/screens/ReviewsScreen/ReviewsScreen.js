import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Formik} from 'formik';
import {useRoute} from '@react-navigation/native';
import {
  ButtonWrapper,
  CommentContainer,
  CommentInputContainer,
  CommentInputWrapper,
  CommentTextInput,
  CommentTextWrapper,
  CriterionRatingContainer,
  CriterionRatingWrapper,
  CriterionTitle,
  DateTitle,
  RatingValueTitle,
  StarItem,
  StarsRatingContainer,
  StarsWrapper,
  UserAvatar,
  UserContainer,
  UserFirstNameTitle,
  UserInfoContainer,
  UserInfoFirstLineWrapper,
  UserInfoWrapper,
  UserRatingTitle,
} from '../../components/CommentInput/CommentInput.style';
import colors from '../../constants/colors';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  roleSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {showMessage} from 'react-native-flash-message';
import {getAdventureReview} from '../../../redux/actions/AdventureActions';
import {dateParser} from '../../services/dataParser';
import {Stars as Rating} from '../../components/Stars/Stars';
import {DynamicText} from '../AdventureScreen/AdventureScreen';
import Slider from '@react-native-community/slider';
import activeStar from '../../../assets/images/activeStar.png';
import star from '../../../assets/images/star.png';
import {currentHotelReviewsSelector} from '../../../redux/selectors/HotelSelectors';
import {currentAdventureReviewsSelector} from '../../../redux/selectors/AdventureSelectors';
import {closeSocket} from '../../../redux/actions/CommentActions';
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';
import {commentValidationSchema} from '../../services/validation';

import {TitleWrapper} from './ReviewsScreen.style';
import {NormalText} from '../AuthScreens/LoginScreen/LoginScreen.style';

export const Comments = React.memo(({comments}) => {
  return (
    <>
      {comments?.map(item => (
        <Comment item={item} key={item._id} />
      ))}
    </>
  );
});
export const Comment = ({item}) => {
  const date = new Date(item?.date);

  const nameTitle = useMemo(() => {
    const firstName = item?.clientID?.profileInfo?.firstName ?? '';
    const lastName = item?.clientID?.profileInfo?.lastName ?? '';
    const name = `${firstName} ${lastName}`;
    return name.trim() || item?.clientID?.userID?.username || 'Anonymous';
  }, [item]);
  return (
    <CommentContainer>
      <UserContainer style={{flexDirection: 'row', flex: 1}}>
        {item?.clientID?.profileInfo?.imageURL ? (
          <UserAvatar source={{uri: item?.clientID?.profileInfo?.imageURL}} />
        ) : (
          <UserAvatar source={DEFAULT_PROFILE_IMAGE} />
        )}
        <UserInfoContainer style={{justifyContent: 'space-between', flex: 1}}>
          <UserInfoFirstLineWrapper
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <UserFirstNameTitle>{nameTitle}</UserFirstNameTitle>
            <DateTitle>{dateParser(date)}</DateTitle>
          </UserInfoFirstLineWrapper>
          <UserInfoWrapper>
            <UserRatingTitle>{item?.rating?.generalRating}</UserRatingTitle>
            <Rating starsNumber={item?.rating?.starsNumber} />
          </UserInfoWrapper>
        </UserInfoContainer>
      </UserContainer>
      <CommentTextWrapper>
        <DynamicText text={item?.comment} lineNumber={3} />
      </CommentTextWrapper>
    </CommentContainer>
  );
};
const CriterionRating = ({ratingValue, title, onValueChangeHandler}) => {
  return (
    <>
      <CriterionRatingWrapper>
        <CriterionTitle>{title}</CriterionTitle>
        <RatingValueTitle>{ratingValue}</RatingValueTitle>
      </CriterionRatingWrapper>
      <Slider
        step={1}
        value={ratingValue}
        onValueChange={onValueChangeHandler}
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={colors.blue}
        maximumTrackTintColor={colors.white}
        thumbTintColor={colors.blue}
      />
    </>
  );
};
export const StarsRating = React.memo(
  ({initStarsNumber = 0, setStarRating}) => {
    const [currentIndex, setCurrentIndex] = useState(initStarsNumber);

    const Star = ({isActive = false, index}) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (currentIndex === index) {
              setCurrentIndex(0);
              setStarRating(0);
            } else {
              setCurrentIndex(index);
              setStarRating(index);
            }
          }}>
          {isActive ? (
            <StarItem source={activeStar} />
          ) : (
            <StarItem source={star} />
          )}
        </TouchableWithoutFeedback>
      );
    };
    return (
      <StarsWrapper>
        <Star index={1} isActive={currentIndex > 0} />
        <Star index={2} isActive={currentIndex > 1} />
        <Star index={3} isActive={currentIndex > 2} />
        <Star index={4} isActive={currentIndex > 3} />
        <Star index={5} isActive={currentIndex > 4} />
      </StarsWrapper>
    );
  },
);

export const ReviewsScreen = () => {
  const route = useRoute();
  const type = route.params?.type;
  const onSubmit = route.params?.onSubmit;
  const showCriterionRating = type === 'adventure';

  const [commentText, setCommentText] = useState('');
  const [interestingRatingValue, setInterestingRatingValue] = useState(0);
  const [guideRatingValue, setGuideRatingValue] = useState(0);
  const [serviceRatingValue, setServiceRatingValue] = useState(0);
  const [priceRatingValue, setPriceRatingValue] = useState(0);
  const [starsRatingValue, setStarsRatingValue] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(true);
  const commentSelector = useCallback(() => {
    if (type === 'hotel') {
      return currentHotelReviewsSelector;
    }
    if (type === 'adventure') {
      return currentAdventureReviewsSelector;
    }
  }, [type]);
  const comments = useSelector(commentSelector())?.reverse();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const nameTitle = useMemo(
    () =>
      user?.profileInfo?.firstName
        ? user?.profileInfo?.firstName
        : user?.profileInfo?.lastName
        ? user?.profileInfo?.lastName
        : user?.userID?.username,
    [user?.profileInfo?.firstName, user?.profileInfo?.lastName],
  );
  const role = useSelector(roleSelector);

  const onSubmitHandler = async ({commentText}) => {
    try {
      await onSubmit(
        starsRatingValue,
        commentText,
        interestingRatingValue,
        guideRatingValue,
        serviceRatingValue,
        priceRatingValue,
      );
      setShowCommentInput(false);
      setCommentText('');
      setInterestingRatingValue(0);
      setGuideRatingValue(0);
      setServiceRatingValue(0);
      setPriceRatingValue(0);
      setStarsRatingValue(0);
    } catch (error) {
      setShowCommentInput(true);
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
    <View style={{flex: 1, marginTop: 24}}>
      <View style={{flex: 1}}>
        <CommentInputContainer>
          <Formik
            validationSchema={commentValidationSchema}
            initialValues={{
              commentText: '',
            }}
            onSubmit={values => onSubmitHandler(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {role !== 'admin' && showCommentInput && (
                  <CommentInputWrapper>
                    <UserInfoWrapper>
                      {user?.profileInfo?.imageURL ? (
                        <UserAvatar
                          source={{uri: user?.profileInfo?.imageURL}}
                        />
                      ) : (
                        <UserAvatar source={DEFAULT_PROFILE_IMAGE} />
                      )}
                      <UserFirstNameTitle>{nameTitle}</UserFirstNameTitle>
                    </UserInfoWrapper>
                    {showCriterionRating && (
                      <>
                        <CriterionRatingContainer>
                          <CriterionRating
                            title={'Interesting'}
                            ratingValue={interestingRatingValue}
                            onValueChangeHandler={value =>
                              setInterestingRatingValue(value)
                            }
                          />
                          <CriterionRating
                            title={'Guide'}
                            ratingValue={guideRatingValue}
                            onValueChangeHandler={value =>
                              setGuideRatingValue(value)
                            }
                          />
                          <CriterionRating
                            title={'Service'}
                            ratingValue={serviceRatingValue}
                            onValueChangeHandler={value =>
                              setServiceRatingValue(value)
                            }
                          />
                          <CriterionRating
                            title={'Price'}
                            ratingValue={priceRatingValue}
                            onValueChangeHandler={value =>
                              setPriceRatingValue(value)
                            }
                          />
                        </CriterionRatingContainer>
                      </>
                    )}

                    <StarsRatingContainer>
                      <StarsRating
                        setStarRating={setStarsRatingValue}
                        initStarsNumber={starsRatingValue}
                      />
                    </StarsRatingContainer>

                    <CommentTextInput
                      multiline={true}
                      placeholderTextColor={colors.grey}
                      placeholder={'Type a comment...'}
                      onChangeText={handleChange('commentText')}
                      onBlur={handleBlur('commentText')}
                      value={values.commentText}
                    />
                    {errors.commentText && touched.commentText && (
                      <Text style={{color: colors.red, padding: 6}}>
                        {' '}
                        {errors.commentText}
                      </Text>
                    )}
                    <ButtonWrapper>
                      <ButtonItem
                        title={'Send'}
                        titleSize={12}
                        size={{height: 40, width: 100}}
                        handler={handleSubmit}
                      />
                    </ButtonWrapper>
                  </CommentInputWrapper>
                )}
              </>
            )}
          </Formik>
          {!showCommentInput && (
            <TitleWrapper>
              <NormalText>Thank for your review!</NormalText>
            </TitleWrapper>
          )}
          <Comments comments={comments} />
        </CommentInputContainer>
      </View>
    </View>
  );
};
