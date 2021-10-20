import React from 'react';
import {
  DestinationImage,
  DestinationItem,
  DestinationTitle,
  DestinationTitleWrapper,
} from './Destination.style';

export const Destination = ({item}) => {
  return (
    <DestinationItem>
      <DestinationImage source={{uri: item.imageURL}} />
      <DestinationTitleWrapper>
        <DestinationTitle>{item.countryName}</DestinationTitle>
      </DestinationTitleWrapper>
    </DestinationItem>
  );
};
