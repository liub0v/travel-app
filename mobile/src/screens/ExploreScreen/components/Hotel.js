import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

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

import star from '../../../../assets/images/start.png';
import {useNavigation} from '@react-navigation/native';
import {getPopularHotelReviewsSelector} from '../../../../redux/selectors/HotelSelectors';
import {getSavedHotelReviewsSelector} from '../../../../redux/selectors/UserSelector';

export const Hotel = ({item, type = 'popular'}) => {
  const navigation = useNavigation();
  const goHotelScreen = () => {
    switch (type) {
      case 'popular': {
        const popularHotelReviewsSelector = getPopularHotelReviewsSelector(
          item._id,
        );
        navigation.navigate('HotelScreen', {
          hotel: item,
          reviewsSelector: popularHotelReviewsSelector,
        });
        break;
      }
      case 'saved': {
        const savedHotelReviewsSelector = getSavedHotelReviewsSelector(
          item._id,
        );
        navigation.navigate('HotelScreen', {
          hotel: item,
          reviewsSelector: savedHotelReviewsSelector,
        });
        break;
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={goHotelScreen}>
      <HotelItem>
        <HotelImage source={{uri: item.imageURL}} />
        <HotelInfoWrapper>
          <HotelName>{`${item.name} ${item?.starsNumber}*`}</HotelName>
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
