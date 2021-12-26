import React from 'react';

import {
  DestinationItem,
  DestinationTitle,
  DestinationTitleWrapper,
} from './Destination.style';
import {AnimatedImage} from '../../../components/Loaders/AnimatedImage';

export const Destination = ({item}) => {
  return (
    <DestinationItem>
      <AnimatedImage
        imageStyle={{width: 200, height: 130, borderRadius: 16}}
        viewStyle={{borderRadius: 16}}
        imageURL={item?.imageURL}
      />
      <DestinationTitleWrapper>
        <DestinationTitle>{item.countryName}</DestinationTitle>
      </DestinationTitleWrapper>
    </DestinationItem>
  );
};
