import React, {useCallback, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  deleteSavedAdventure,
  saveAdventure,
} from '../../../redux/actions/AdventureActions';
import {
  roleSelector,
  savedAdventuresSelector,
  tokenSelector,
} from '../../../redux/selectors/UserSelector';

import {adventureAPI} from '../../api/adventureAPI';
import colors from '../../constants/colors';

import {SectionHeader} from '../../components/Section/Section';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {Stars} from '../../components/Stars/Stars';
import {Like} from '../../components/Like/Like';
import {Comment} from '../../components/CommentInput/CommentInput';

import {
  ButtonWrapper,
  CategoryRatingItem,
  CategoryRatingLine,
  CategoryRatingLineValue,
  CategoryRatingTitle,
  ImageContainer,
  GeneralRatingTitle,
  GeneralRatingWrapper,
  GuideAvatar,
  GuideContainer,
  InfoContainer,
  LocationContainer,
  LocationTitle,
  MainContainer,
  Map,
  NameContainer,
  NameTitle,
  PriceContainer,
  PriceTitle,
  RateTitle,
  RatingContainer,
  ReviewsContainer,
  SummaryContainer,
  SummaryText,
  SummaryWrapper,
  IntroReviews,
} from './AdventureScreen.style';
import {LikeWrapper} from '../HotelScreen/HotelScreen.style';

import guideAvatar from '../../../assets/images/avatarBig.png';
import {getAdventureReviewsSelector} from '../../../redux/selectors/AdventureSelectors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Edit} from '../../components/Edit/Edit';

export const DynamicText = ({text, lineNumber = 5}) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);
  return (
    <SummaryWrapper>
      <SummaryText
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : lineNumber}>
        {text}
      </SummaryText>
      {lengthMore && (
        <SummaryText onPress={toggleNumberOfLines} style={{color: colors.blue}}>
          {textShown ? 'Hide text' : 'Read more'}
        </SummaryText>
      )}
    </SummaryWrapper>
  );
};

export const Criterion = ({title = 'criterion', value = 100}) => {
  return (
    <CategoryRatingItem>
      <CategoryRatingTitle>{title}</CategoryRatingTitle>
      <CategoryRatingLine>
        <CategoryRatingLineValue value={value} />
      </CategoryRatingLine>
    </CategoryRatingItem>
  );
};

export const AdventureScreen = () => {
  const route = useRoute();
  const adventure = route.params.adventure;
  const commentSelector = getAdventureReviewsSelector(adventure._id);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const role = useSelector(roleSelector);
  const savedAdventures = useSelector(savedAdventuresSelector);
  const like =
    savedAdventures?.filter(item => item._id === adventure._id).length > 0;
  const setLikeOnAdventure = () => {
    like && dispatch(deleteSavedAdventure(adventure._id));
    !like && dispatch(saveAdventure(adventure._id));
  };

  const goEditScreen = () => {
    navigation.navigate('EditAdventureScreen', {adventure: adventure});
  };

  const saveReview = async (
    starsNumber,
    interestingRating,
    guideRating,
    serviceRating,
    priceRating,
    comment,
  ) => {
    return await adventureAPI.saveAdventureReview(
      token,
      adventure._id,
      starsNumber,
      interestingRating,
      guideRating,
      serviceRating,
      priceRating,
      comment,
    );
  };
  return (
    <MainContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <ImageContainer source={{uri: adventure.imageURL}}>
        <LikeWrapper>
          {role === 'admin' ? (
            <Edit handler={goEditScreen} />
          ) : (
            <Like handler={setLikeOnAdventure} likeInit={like} />
          )}
        </LikeWrapper>
      </ImageContainer>
      <InfoContainer>
        <NameContainer>
          <Stars starsNumber={adventure?.rating?.starsNumber} />
          <NameTitle>{adventure.name}</NameTitle>
          <LocationTitle>{adventure.address}</LocationTitle>
        </NameContainer>
        <PriceContainer>
          <PriceTitle>$ {adventure.price}</PriceTitle>
          <RateTitle> per person</RateTitle>
        </PriceContainer>
      </InfoContainer>
      <SummaryContainer>
        <SectionHeader showRightButton={false} title={'Summary'} />
        <DynamicText text={adventure.summary} />
      </SummaryContainer>
      <GuideContainer>
        <GuideAvatar source={guideAvatar} />
        <DynamicText text={adventure.summary} />
      </GuideContainer>
      <RatingContainer>
        <SectionHeader showRightButton={false} title={'Rating'} />
        <GeneralRatingWrapper>
          <GeneralRatingTitle>
            {adventure?.rating?.generalRating.toFixed(1)}
          </GeneralRatingTitle>
          <Stars starsNumber={adventure?.rating?.starsNumber} />
        </GeneralRatingWrapper>
        <Criterion
          title="Interesting"
          value={adventure?.rating?.interestingRating * 10}
        />
        <Criterion title="Guide" value={adventure?.rating?.guideRating * 10} />
        <Criterion
          title="Service"
          value={adventure?.rating?.serviceRating * 10}
        />
        <Criterion title="Price" value={adventure?.rating?.priceRating * 10} />
      </RatingContainer>
      <ReviewsContainer>
        <SectionHeader
          showRightButton
          title={'Reviews'}
          passHandler={() => {
            navigation.navigate('ReviewsScreen', {
              comments: adventure?.reviews,
              commentSelector: commentSelector,
              onSubmit: saveReview,
              showCriterionRating: true,
            });
          }}
        />
        <IntroReviews>
          {adventure?.reviews.slice(0, 3).map(item => (
            <Comment item={item} />
          ))}
        </IntroReviews>
      </ReviewsContainer>
      <LocationContainer>
        <SectionHeader showRightButton={false} title={'Location'} />
        <Map />
      </LocationContainer>
      <ButtonWrapper>
        {role !== 'admin' && <ButtonItem title={'Book now'} />}
      </ButtonWrapper>
    </MainContainer>
  );
};
