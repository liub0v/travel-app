import React, {useCallback, useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  clearAdventure,
  deleteSavedAdventure,
  getAdventure,
  saveAdventure,
} from '../../../redux/actions/AdventureActions';
import {
  addVisitedAdventureLoaderSelector,
  deleteVisitedAdventureLoaderSelector,
  likeAdventureLoaderSelector,
  roleSelector,
  tokenSelector,
} from '../../../redux/selectors/UserSelector';

import {adventureAPI} from '../../api/adventureAPI';
import colors from '../../constants/colors';

import {SectionHeader} from '../../components/Section/Section';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {Stars} from '../../components/Stars/Stars';
import {Like} from '../../components/Like/Like';

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
  LocationTitle,
  MainContainer,
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
  GuideNameWrapper,
  GuideNameTitle,
} from './AdventureScreen.style';
import {LikeWrapper} from '../HotelScreen/HotelScreen.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  addVisitedAdventure,
  deleteVisitedAdventure,
} from '../../../redux/actions/AuthActions';
import {
  currentAdventureIsLoadingSelector,
  currentAdventureReviewsSelector,
  currentAdventureSelector,
  getIsLikedAdventureSelector,
  getIsVisitedAdventureSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {RefreshControl} from 'react-native';
import {Comment} from '../ReviewsScreen/ReviewsScreen';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const role = useSelector(roleSelector);

  const likeLoader = useSelector(likeAdventureLoaderSelector);
  const markLoader = useSelector(addVisitedAdventureLoaderSelector);
  const unmarkLoader = useSelector(deleteVisitedAdventureLoaderSelector);

  const adventureID = route.params.adventureID;
  const adventure = useSelector(currentAdventureSelector);
  const like = !!useSelector(getIsLikedAdventureSelector);
  const isVisited = !!useSelector(getIsVisitedAdventureSelector);
  const reviews = useSelector(currentAdventureReviewsSelector);
  const adventureIsLoading = useSelector(currentAdventureIsLoadingSelector);

  const setLikeOnAdventure = () => {
    like && dispatch(deleteSavedAdventure(adventure._id));
    !like && dispatch(saveAdventure(adventure._id));
  };

  const saveReview = async (
    starsNumber,
    comment,
    interestingRating,
    guideRating,
    serviceRating,
    priceRating,
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

  const markAdventureHandler = () => {
    dispatch(addVisitedAdventure(adventureID));
  };
  const unmarkAdventureHandler = () => {
    dispatch(deleteVisitedAdventure(adventureID));
  };

  const goReviewsScreen = () => {
    navigation.navigate('ReviewsScreen', {
      type: 'adventure',
      onSubmit: saveReview,
    });
  };

  const onRefresh = useCallback(() => {
    dispatch(getAdventure(adventureID));
  }, [dispatch, getAdventure]);

  useEffect(() => {
    dispatch(getAdventure(adventureID));
  }, []);

  useEffect(() => {
    return () => dispatch(clearAdventure());
  }, []);

  const showButton = () => {
    switch (role) {
      case 'admin':
        return null;
      case 'client': {
        return isVisited ? (
          <ButtonItem
            title={'Unmark as visited'}
            isLoading={unmarkLoader}
            handler={unmarkAdventureHandler}
          />
        ) : (
          <ButtonItem
            title={'Mark as visited'}
            isLoading={markLoader}
            handler={markAdventureHandler}
          />
        );
      }
      case 'guide':
        return null;
    }
  };
  return (
    <MainContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl
          refreshing={adventureIsLoading}
          onRefresh={onRefresh}
          tintColor={colors.white}
          colors={colors.white}
        />
      }>
      {!adventureIsLoading && (
        <>
          <ImageContainer source={{uri: adventure?.imageURL}}>
            {adventure && (
              <LikeWrapper>
                {role !== 'admin' && (
                  <Like
                    handler={setLikeOnAdventure}
                    likeInit={like}
                    isLoading={likeLoader}
                  />
                )}
              </LikeWrapper>
            )}
          </ImageContainer>
          <InfoContainer>
            <NameContainer>
              <Stars starsNumber={adventure?.rating?.starsNumber} />
              <NameTitle>{adventure?.name}</NameTitle>
              <LocationTitle>{adventure?.address}</LocationTitle>
            </NameContainer>
            {adventure?.price ? (
              <PriceContainer>
                <PriceTitle>$ {adventure?.price}</PriceTitle>
                <RateTitle> per person</RateTitle>
              </PriceContainer>
            ) : null}
          </InfoContainer>
          {adventure?.summary && (
            <SummaryContainer>
              <SectionHeader showRightButton={false} title={'Summary'} />
              <DynamicText text={adventure?.summary} />
            </SummaryContainer>
          )}
          {adventure?.guideID && (
            <GuideContainer>
              <GuideAvatar
                source={{uri: adventure?.guideID?.profileInfo?.imageURL}}
              />
              <GuideNameWrapper>
                <GuideNameTitle>
                  {adventure?.guideID?.profileInfo?.firstName}
                </GuideNameTitle>
              </GuideNameWrapper>
              <DynamicText text={adventure?.summary} />
            </GuideContainer>
          )}
          {adventure?.rating && (
            <RatingContainer>
              <SectionHeader showRightButton={false} title={'Rating'} />
              <GeneralRatingWrapper>
                <GeneralRatingTitle>
                  {adventure?.rating?.generalRating?.toFixed(1)}
                </GeneralRatingTitle>
                <Stars starsNumber={adventure?.rating?.starsNumber} />
              </GeneralRatingWrapper>
              <Criterion
                title="Interesting"
                value={adventure?.rating?.interestingRating * 10}
              />
              <Criterion
                title="Guide"
                value={adventure?.rating?.guideRating * 10}
              />
              <Criterion
                title="Service"
                value={adventure?.rating?.serviceRating * 10}
              />
              <Criterion
                title="Price"
                value={adventure?.rating?.priceRating * 10}
              />
            </RatingContainer>
          )}
          {reviews && (
            <ReviewsContainer>
              <SectionHeader
                showRightButton
                title={'Reviews'}
                passHandler={goReviewsScreen}
              />
              <IntroReviews>
                {reviews?.slice(0, 3)?.map(item => (
                  <Comment item={item} key={item?._id} />
                ))}
              </IntroReviews>
            </ReviewsContainer>
          )}
          {adventure && <ButtonWrapper>{showButton()}</ButtonWrapper>}
        </>
      )}
    </MainContainer>
  );
};
