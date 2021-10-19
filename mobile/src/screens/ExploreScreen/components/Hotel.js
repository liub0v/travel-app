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
  HotelStar,
  HotelStarsContainer,
} from './Hotel.style';

export const Hotel = ({item}) => {
  return (
    <HotelItem>
      <HotelImage source={{uri: item.imageURL}} />
      <HotelInfoWrapper>
        <HotelName>{`${item.name} ${item?.rating}*`}</HotelName>
        <HotelStarsContainer>
          {[...Array(item.starsNumber)].map((item, index) => {
            return <HotelStar key={index} source={star} />;
          })}
        </HotelStarsContainer>
        <HotelPriceWrapper>
          <HotelPrice>{`$ ${item.price} / `}</HotelPrice>
          <HotelPricePeriod>{'per night'}</HotelPricePeriod>
        </HotelPriceWrapper>
      </HotelInfoWrapper>
    </HotelItem>
  );
};
