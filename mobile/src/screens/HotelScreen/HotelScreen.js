import React, {useCallback, useEffect} from 'react';
import {RefreshControl, TouchableWithoutFeedback, View} from 'react-native';
import {
  BoldText,
  ButtonWrapper,
  ColumnWrapper,
  GalleryContainer,
  GalleryHeader,
  GalleryMoreImage,
  GalleryMoreTitle,
  GalleryWrapper,
  ImageContainer,
  InfoContainer,
  InfoWrapper,
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
import {AnimatedImage} from '../../components/Loaders/AnimatedImage';

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
    like && dispatch(deleteSavedHotel(hotelID));
    !like && dispatch(saveHotel(hotelID));
  };

  React.useLayoutEffect(() => {
    if (role !== 'admin') {
      navigation.setOptions({
        headerRight: () => (
          <Like
            handler={setLikeOnHotel}
            likeInit={like}
            isLoading={likeLoader}
          />
        ),
      });
    }
  }, [navigation, likeLoader, like, setLikeOnHotel]);

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
      {hotel && (
        <>
          <ImageContainer>
            <AnimatedImage
              imageStyle={{width: '100%', height: 320}}
              viewStyle={{width: '100%'}}
              imageURL={hotel?.imageURL}
            />
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
          {hotel?.gallery?.length !== 0 && (
            <GalleryContainer>
              <GalleryHeader>{'Gallery'}</GalleryHeader>
              <GalleryWrapper>
                <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                  <View>
                    {hotel?.gallery?.[0] && (
                      <AnimatedImage
                        imageStyle={{width: 130, height: 152, borderRadius: 8}}
                        viewStyle={{borderRadius: 8}}
                        imageURL={hotel?.gallery?.[0]}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>

                <ColumnWrapper>
                  <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                    <View style={{width: '90%'}}>
                      {hotel?.gallery?.[1] && (
                        <AnimatedImage
                          imageStyle={{
                            width: '100%',
                            height: 70,
                            borderRadius: 8,
                          }}
                          viewStyle={{borderRadius: 8, width: '100%'}}
                          imageURL={hotel?.gallery?.[1]}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                  <RowWrapper>
                    <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                      <View style={{width: '43%'}}>
                        {hotel?.gallery?.[2] && (
                          <AnimatedImage
                            imageStyle={{
                              width: '100%',
                              height: 70,
                              borderRadius: 8,
                            }}
                            viewStyle={{borderRadius: 8, width: '100%'}}
                            imageURL={hotel?.gallery?.[2]}
                          />
                        )}
                      </View>
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
                        <View style={{width: '43%'}}>
                          {hotel?.gallery?.[3] && (
                            <AnimatedImage
                              imageStyle={{
                                width: '100%',
                                height: 70,
                                borderRadius: 8,
                                marginLeft: '4%',
                              }}
                              viewStyle={{borderRadius: 8, width: '100%'}}
                              imageURL={hotel?.gallery?.[3]}
                            />
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  </RowWrapper>
                </ColumnWrapper>
              </GalleryWrapper>
            </GalleryContainer>
          )}
          <ButtonWrapper>{showButton()}</ButtonWrapper>
        </>
      )}
    </MainContainer>
  );
};
