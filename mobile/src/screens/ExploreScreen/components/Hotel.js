import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {
  HotelInfoWrapper,
  HotelItem,
  HotelName,
  HotelPrice,
  HotelPricePeriod,
  HotelPriceWrapper,
  Star,
  StarsContainer,
} from './Hotel.style';

import star from '../../../../assets/images/start.png';
import {useNavigation} from '@react-navigation/native';
import {AnimatedImage} from '../../../components/Loaders/AnimatedImage';

export const Hotel = ({item}) => {
  const navigation = useNavigation();
  const goHotelScreen = () => {
    navigation.navigate('HotelScreen', {
      hotelID: item._id,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goHotelScreen}>
      <HotelItem>
        <AnimatedImage
          imageStyle={{
            width: 150,
            height: 90,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
          viewStyle={{borderTopLeftRadius: 16, borderBottomLeftRadius: 16}}
          imageURL={item?.imageURL}
        />
        <HotelInfoWrapper>
          <HotelName>{`${item?.name} ${item?.starsNumber}*`}</HotelName>
          <StarsContainer>
            {[...Array(item?.starsNumber)].map((item, index) => {
              return <Star key={index} source={star} />;
            })}
          </StarsContainer>
          <HotelPriceWrapper>
            <HotelPrice>{`$ ${item?.price} / `}</HotelPrice>
            <HotelPricePeriod>{'per night'}</HotelPricePeriod>
          </HotelPriceWrapper>
        </HotelInfoWrapper>
      </HotelItem>
    </TouchableWithoutFeedback>
  );
};
