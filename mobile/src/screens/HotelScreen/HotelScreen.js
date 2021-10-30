import React from 'react';
import { TouchableWithoutFeedback} from 'react-native';
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
import optionIcon from '../../../assets/images/coffeOption.png';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {DynamicText} from '../AdventureScreen/AdventureScreen';
import {Map} from '../AdventureScreen/AdventureScreen.style';
const Option = ({title, icon}) => {
  return (
    <OptionWrapper>
      <OptionIcon source={icon} />
      <OptionTitle>{title}</OptionTitle>
    </OptionWrapper>
  );
};
export const HotelScreen = ({route}) => {
  const hotel = route.params.hotel;
  console.log(hotel);
  return (
    <MainContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <ImageContainer source={{uri: hotel.imageURL}}>
        <NameContainer>
          <BoldText>{hotel.name}</BoldText>
          <NormalText>{hotel.address}</NormalText>
        </NameContainer>
      </ImageContainer>
      <InfoContainer>
        <InfoWrapper>
          <BoldText>{`$ ${hotel.price}`}</BoldText>

          <RatingTitle>{'4.9'}</RatingTitle>
        </InfoWrapper>
        <InfoWrapper>
          <NormalText>{'06 July - 14 July, 2 guest'}</NormalText>
          <ReviewsTitle>{'54 Reviews'}</ReviewsTitle>
        </InfoWrapper>
      </InfoContainer>
      <OptionsContainer>
        {hotel.hotelOptions.split(',').map(item => (
          <Option title={item.trim()} icon={optionIcon} />
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
              <TouchableWithoutFeedback onPress={() => {}}>
                <GalleryMoreImage
                  blurRadius={3}
                  imageStyle={{borderRadius: 8}}
                  source={{uri: hotel.gallery[1]}}>
                  <GalleryMoreTitle>{'6+'}</GalleryMoreTitle>
                </GalleryMoreImage>
              </TouchableWithoutFeedback>
            </RowWrapper>
          </ColumnWrapper>
        </GalleryWrapper>
      </GalleryContainer>
      <ButtonWrapper>
        <ButtonItem title={'Book now'} />
      </ButtonWrapper>
    </MainContainer>
  );
};
