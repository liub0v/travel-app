import React, {useCallback, useEffect} from 'react';
import {RefreshControl, TouchableWithoutFeedback} from 'react-native';
import {
  BoldText,
  ButtonSeeMoreWrapper,
  ButtonWrapper,
  ColumnWrapper,
  GalleryContainer,
  GalleryHeader,
  GalleryMainImage,
  GalleryMoreImage,
  GalleryMoreTitle,
  GallerySecondImage,
  GalleryThirdImage,
  GalleryWrapper,
  ImageContainer,
  InfoContainer,
  InfoWrapper,
  LikeWrapper,
  MainContainer,
  NameContainer,
  NormalText,
  OptionIcon,
  OptionsContainer,
  OptionTitle,
  OptionWrapper,
  RatingTitle,
  ReviewsTitle,
  RowWrapper,
  SummeryContainer,
} from './HotelScreen.style';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {DynamicText} from '../AdventureScreen/AdventureScreen';
import {Like} from '../../components/Like/Like';
import {useDispatch, useSelector} from 'react-redux';
import {
  addVisitedHotelLoaderSelector,
  deleteVisitedHotelLoaderSelector,
  likeHotelLoaderSelector,
  roleSelector,
  tokenSelector,
} from '../../../redux/selectors/UserSelector';
import {useNavigation, useRoute} from '@react-navigation/native';
import {hotelAPI} from '../../api/hotelAPI';

import {HotelsOptions} from '../../services/HotelOptions';
import {
  addVisitedHotel,
  deleteSavedHotel,
  deleteVisitedHotel,
  saveHotel,
} from '../../../redux/actions/AuthActions';
import {clearHotel, getHotel} from '../../../redux/actions/HotelActions';
import {
  currentHotelIsLoadingSelector,
  currentHotelSelector,
  getIsLikedHotelSelector,
  getIsVisitedHotelSelector,
} from '../../../redux/selectors/HotelSelectors';
import colors from '../../constants/colors';

const Option = ({title, icon}) => {
  return (
    <OptionWrapper>
      <OptionIcon source={icon} />
      <OptionTitle>{title}</OptionTitle>
    </OptionWrapper>
  );
};

export const HotelScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(tokenSelector);
  const role = useSelector(roleSelector);

  const likeLoader = useSelector(likeHotelLoaderSelector);
  const markLoader = useSelector(addVisitedHotelLoaderSelector);
  const unmarkLoader = useSelector(deleteVisitedHotelLoaderSelector);

  const hotel = useSelector(currentHotelSelector);
  const hotelIsLoading = useSelector(currentHotelIsLoadingSelector);
  const hotelID = route.params.hotelID;

  const like = !!useSelector(getIsLikedHotelSelector(hotelID));
  const isVisited = !!useSelector(getIsVisitedHotelSelector(hotelID));
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);

  const onRefresh = useCallback(() => {
    dispatch(getHotel(hotelID));
  }, [dispatch, getHotel]);

  useEffect(() => {
    dispatch(getHotel(hotelID));
  }, []);

  useEffect(() => {
    return () => dispatch(clearHotel());
  }, []);

  const setLikeOnHotel = () => {
    like && dispatch(deleteSavedHotel(hotel._id));
    !like && dispatch(saveHotel(hotel._id));
  };

  const goEditGalleryScreen = () => {
    navigation.navigate('EditGalleryScreen', {hotel: hotel});
  };
  const goHotelGalleryScreen = () => {
    navigation.navigate('HotelGalleryScreen', {hotelID: hotel._id});
  };
  const goReviewsScreen = () => {
    navigation.navigate('ReviewsScreen', {
      type: 'hotel',
      onSubmit: saveReview,
    });
  };

  const saveReview = async (starsNumber, comment) => {
    return await hotelAPI.saveHotelReview(
      token,
      hotel._id,
      starsNumber,
      comment,
    );
  };

  const markHotelHandler = () => {
    dispatch(addVisitedHotel(hotelID));
  };

  const unmarkHotelHandler = () => {
    dispatch(deleteVisitedHotel(hotelID));
  };

  const showButton = () => {
    switch (role) {
      case 'admin':
        return (
          <ButtonItem title={'Edit Gallery'} handler={goEditGalleryScreen} />
        );
      case 'client': {
        return isVisited ? (
          <ButtonItem
            isLoading={unmarkLoader}
            handler={unmarkHotelHandler}
            title={'Unmark as visited'}
          />
        ) : (
          <ButtonItem
            isLoading={markLoader}
            handler={markHotelHandler}
            title={'Mark as visited'}
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
          refreshing={hotelIsLoading}
          onRefresh={onRefresh}
          tintColor={colors.white}
          colors={[colors.green]}
        />
      }>
      {!hotelIsLoading && (
        <>
          <ImageContainer source={{uri: hotel?.imageURL}}>
            <LikeWrapper>
              {role !== 'admin' && (
                <Like
                  handler={setLikeOnHotel}
                  likeInit={like}
                  isLoading={likeLoader}
                />
              )}
            </LikeWrapper>
            <NameContainer>
              <BoldText>{hotel?.name}</BoldText>
              <NormalText>{hotel?.address}</NormalText>
            </NameContainer>
          </ImageContainer>
          <InfoContainer>
            <InfoWrapper>
              <BoldText>{`$ ${hotel?.price}`}</BoldText>

              <RatingTitle>{hotel?.rating?.generalRating ?? '0.0'}</RatingTitle>
            </InfoWrapper>
            <InfoWrapper>
              <NormalText>{'06 July - 14 July, 2 guest'}</NormalText>
              <TouchableWithoutFeedback onPress={goReviewsScreen}>
                <ReviewsTitle>{`${hotel?.reviews?.length} Reviews`}</ReviewsTitle>
              </TouchableWithoutFeedback>
            </InfoWrapper>
          </InfoContainer>
          <OptionsContainer>
            {hotelOptions.show().map((item, index) => (
              <Option title={item.title} icon={item.image} key={index} />
            ))}
          </OptionsContainer>
          <SummeryContainer>
            <DynamicText text={hotel?.summary} lineNumber={3} />
          </SummeryContainer>
          <GalleryContainer>
            <GalleryHeader>{'Gallery'}</GalleryHeader>
            <GalleryWrapper>
              <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                <GalleryMainImage source={{uri: hotel?.gallery?.[0]}} />
              </TouchableWithoutFeedback>
              <ColumnWrapper>
                <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                  <GallerySecondImage source={{uri: hotel?.gallery?.[1]}} />
                </TouchableWithoutFeedback>
                <RowWrapper>
                  <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                    <GalleryThirdImage source={{uri: hotel?.gallery?.[2]}} />
                  </TouchableWithoutFeedback>
                  {hotel?.gallery?.length > 4 ? (
                    <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                      <GalleryMoreImage
                        blurRadius={3}
                        imageStyle={{borderRadius: 8}}
                        source={{uri: hotel?.gallery?.[3]}}>
                        <GalleryMoreTitle>
                          {hotel?.gallery?.length - 4}+
                        </GalleryMoreTitle>
                      </GalleryMoreImage>
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                      <GalleryMoreImage
                        imageStyle={{borderRadius: 8}}
                        source={{uri: hotel?.gallery?.[3]}}></GalleryMoreImage>
                    </TouchableWithoutFeedback>
                  )}
                </RowWrapper>
              </ColumnWrapper>
            </GalleryWrapper>
          </GalleryContainer>
          <ButtonWrapper>{showButton()}</ButtonWrapper>
        </>
      )}
    </MainContainer>
  );
};
