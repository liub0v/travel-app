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
      <DestinationImage source={item.image}></DestinationImage>
      <DestinationTitleWrapper>
        <DestinationTitle>{item.title}</DestinationTitle>
      </DestinationTitleWrapper>
    </DestinationItem>
  );
};
