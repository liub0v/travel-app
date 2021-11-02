import star from '../../../../assets/images/start.png';
import React from 'react';
import {
  HotelImage,
  HotelInfoWrapper,
  HotelItem,
  HotelName,
  HotelPrice,
  HotelPricePeriod,
  HotelPriceWrapper,
  Star,
  StarsContainer,
} from './Hotel.style';
import {TouchableWithoutFeedback} from 'react-native';
export const Hotel = ({item, navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('HotelScreen', {hotel: item});
      }}>
      <HotelItem>
        <HotelImage source={{uri: item.imageURL}} />
        <HotelInfoWrapper>
          <HotelName>{`${item.name} ${item?.rating}*`}</HotelName>
          <StarsContainer>
            {[...Array(item.starsNumber)].map((item, index) => {
              return <Star key={index} source={star} />;
            })}
          </StarsContainer>
          <HotelPriceWrapper>
            <HotelPrice>{`$ ${item.price} / `}</HotelPrice>
            <HotelPricePeriod>{'per night'}</HotelPricePeriod>
          </HotelPriceWrapper>
        </HotelInfoWrapper>
      </HotelItem>
    </TouchableWithoutFeedback>
  );
};
