import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
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
  LocationContainer,
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
import {Map} from '../AdventureScreen/AdventureScreen.style';
import {Like} from '../../components/Like/Like';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSavedHotel, saveHotel} from '../../../redux/actions/HotelActions';
import {
  roleSelector,
  savedHotelsSelector,
  tokenSelector,
} from '../../../redux/selectors/UserSelector';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getHotelReviewsSelector} from '../../../redux/selectors/HotelSelectors';
import {hotelAPI} from '../../api/hotelAPI';
import {Edit} from '../../components/Edit/Edit';
import {HotelsOptions} from '../../admin/screens/Hotels/HotelEditScreen/EditHotelScreen';
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
  const hotel = route.params.hotel;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const savedHotels = useSelector(savedHotelsSelector);
  const commentSelector = getHotelReviewsSelector(hotel._id);
  const token = useSelector(tokenSelector);
  const role = useSelector(roleSelector);
  const like = savedHotels?.filter(item => item._id === hotel._id).length > 0;
  const setLikeOnHotel = () => {
    like && dispatch(deleteSavedHotel(hotel._id));
    !like && dispatch(saveHotel(hotel._id));
  };
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);

  const goEditScreen = () => {
    navigation.navigate('EditHotelScreen', {hotel: hotel});
  };
  const goEditGalleryScreen = () => {
    navigation.navigate('EditGalleryScreen', {hotel: hotel});
  };
  const goHotelGalleryScreen = () => {
    navigation.navigate('HotelGalleryScreen', {hotelID: hotel._id});
  };
  const saveReview = async (starsNumber, comment) => {
    return await hotelAPI.saveHotelReview(
      token,
      hotel._id,
      starsNumber,
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
      <ImageContainer source={{uri: hotel.imageURL}}>
        <LikeWrapper>
          {role === 'admin' ? (
            <Edit handler={goEditScreen} />
          ) : (
            <Like handler={setLikeOnHotel} likeInit={like} />
          )}
        </LikeWrapper>
        <NameContainer>
          <BoldText>{hotel.name}</BoldText>
          <NormalText>{hotel.address}</NormalText>
        </NameContainer>
      </ImageContainer>
      <InfoContainer>
        <InfoWrapper>
          <BoldText>{`$ ${hotel.price}`}</BoldText>
          <RatingTitle>{`${hotel?.rating?.generalRating}`}</RatingTitle>
        </InfoWrapper>
        <InfoWrapper>
          <NormalText>{'06 July - 14 July, 2 guest'}</NormalText>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('ReviewsScreen', {
                comments: hotel?.reviews,
                commentSelector: commentSelector,
                onSubmit: saveReview,
              });
            }}>
            <ReviewsTitle>{`${hotel.reviews.length} Reviews`}</ReviewsTitle>
          </TouchableWithoutFeedback>
        </InfoWrapper>
      </InfoContainer>
      <OptionsContainer>
        {hotelOptions.show().map(item => (
          <Option title={item.title} icon={item.image} />
        ))}
        <ButtonSeeMoreWrapper>
          <ButtonItem
            size={{width: 100, height: 24}}
            titleSize={12}
            title={'See more'}
          />
        </ButtonSeeMoreWrapper>
      </OptionsContainer>
      <SummeryContainer>
        <DynamicText text={hotel.summary} lineNumber={3} />
      </SummeryContainer>
      <LocationContainer>
        <Map />
      </LocationContainer>
      <GalleryContainer>
        <GalleryHeader>{'Gallery'}</GalleryHeader>
        <GalleryWrapper>
          <GalleryMainImage source={{uri: hotel.gallery[2]}} />
          <ColumnWrapper>
            <GallerySecondImage source={{uri: hotel.gallery[0]}} />
            <RowWrapper>
              <GalleryThirdImage source={{uri: hotel.gallery[1]}} />
              <TouchableWithoutFeedback onPress={goHotelGalleryScreen}>
                <GalleryMoreImage
                  blurRadius={3}
                  imageStyle={{borderRadius: 8}}
                  source={{uri: hotel.gallery[3]}}>
                  <GalleryMoreTitle>{'6+'}</GalleryMoreTitle>
                </GalleryMoreImage>
              </TouchableWithoutFeedback>
            </RowWrapper>
          </ColumnWrapper>
        </GalleryWrapper>
      </GalleryContainer>
      <ButtonWrapper>
        {role === 'admin' ? (
          <ButtonItem title={'Edit Gallery'} handler={goEditGalleryScreen} />
        ) : (
          <ButtonItem title={'Book now'} />
        )}
      </ButtonWrapper>
    </MainContainer>
  );
};
