import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Slider from '@react-native-community/slider';

import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors/UserSelector';

import {dateParser} from '../../services/dataParser';
import colors from '../../constants/colors';
import {showMessage} from 'react-native-flash-message';

import {Section} from '../Section/Section';
import {DynamicText} from '../../screens/AdventureScreen/AdventureScreen';
import {Stars as Rating} from '../Stars/Stars';
import {ButtonItem} from '../Buttons/ButtonItem';

import {
  CommentContainer,
  DateTitle,
  UserAvatar,
  UserContainer,
  UserFirstNameTitle,
  UserInfoContainer,
  UserInfoWrapper,
  UserRatingTitle,
  CommentInputContainer,
  CommentInputWrapper,
  CommentTextInput,
  ButtonWrapper,
  CriterionRatingWrapper,
  CriterionRatingContainer,
  RatingValueTitle,
  CriterionTitle,
  StarsRatingContainer,
  StarItem,
  StarsWrapper,
} from './CommentInput.style';

import star from '../../../assets/images/star.png';
import activeStar from '../../../assets/images/activeStar.png';

export const Comment = ({item}) => {
  const date = new Date(item?.date);

  return (
    <CommentContainer>
      <UserContainer>
        <UserAvatar source={{uri: item.clientID?.profileInfo?.imageURL}} />
        <UserInfoContainer>
          <UserInfoWrapper>
            <UserFirstNameTitle>{`${item.clientID?.profileInfo?.firstName} ${item.clientID?.profileInfo?.lastName}`}</UserFirstNameTitle>
            <DateTitle>{dateParser(date)}</DateTitle>
          </UserInfoWrapper>
          <UserInfoWrapper>
            <UserRatingTitle>{item?.rating?.generalRating}</UserRatingTitle>
            <Rating starsNumber={item?.rating?.starsNumber} />
          </UserInfoWrapper>
        </UserInfoContainer>
      </UserContainer>
      <DynamicText text={item?.comment} lineNumber={3} />
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
export const StarsRating = ({setStarRating}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
};
export const CommentInput = ({initComments, onSubmit}) => {
  const [commentText, setCommentText] = useState('');
  const [showRating, setShowRating] = useState(true);
  const [interestingRatingValue, setInterestingRatingValue] = useState(0);
  const [guideRatingValue, setGuideRatingValue] = useState(0);
  const [serviceRatingValue, setServiceRatingValue] = useState(0);
  const [priceRatingValue, setPriceRatingValue] = useState(0);
  const [starsRatingValue, setStarsRatingValue] = useState(0);
  const [comments, setComments] = useState(initComments);
  const user = useSelector(userSelector);

  const onSubmitHandler = async () => {
    try {
      const response = await onSubmit(
        starsRatingValue,
        interestingRatingValue,
        guideRatingValue,
        serviceRatingValue,
        priceRatingValue,
        commentText,
      );
      setComments([...comments, response.data]);
      setCommentText(' ');
      setShowRating(false);
    } catch (error) {
      showMessage({
        message: error.response?.data,
        type: 'error',
      });
    }
  };
  return (
    <CommentInputContainer>
      <Section
        title={`Reviews (${comments.length})`}
        showRightButton={true}
        data={comments}
        renderItem={({item}) => <Comment item={item} />}
      />
      <CommentInputWrapper>
        <UserInfoWrapper>
          <UserAvatar source={{uri: user?.profileInfo?.imageURL}} />
          <UserFirstNameTitle>{`${user?.profileInfo?.firstName} ${user?.profileInfo?.lastName}`}</UserFirstNameTitle>
        </UserInfoWrapper>
        {showRating && (
          <>
            <CriterionRatingContainer>
              <CriterionRating
                title={'Interesting'}
                ratingValue={interestingRatingValue}
                onValueChangeHandler={value => setInterestingRatingValue(value)}
              />
              <CriterionRating
                title={'Guide'}
                ratingValue={guideRatingValue}
                onValueChangeHandler={value => setGuideRatingValue(value)}
              />
              <CriterionRating
                title={'Service'}
                ratingValue={serviceRatingValue}
                onValueChangeHandler={value => setServiceRatingValue(value)}
              />
              <CriterionRating
                title={'Price'}
                ratingValue={priceRatingValue}
                onValueChangeHandler={value => setPriceRatingValue(value)}
              />
            </CriterionRatingContainer>
            <StarsRatingContainer>
              <StarsRating setStarRating={setStarsRatingValue} />
            </StarsRatingContainer>
          </>
        )}
        <CommentTextInput
          multiline={true}
          placeholderTextColor={colors.gray}
          placeholder={'Type a comment...'}
          value={commentText}
          onChangeText={text => {
            setCommentText(text);
          }}
        />
        <ButtonWrapper>
          <ButtonItem
            title={'Send'}
            titleSize={12}
            size={{height: 40, width: 100}}
            handler={onSubmitHandler}
          />
        </ButtonWrapper>
      </CommentInputWrapper>
    </CommentInputContainer>
  );
};
