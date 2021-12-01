import React from 'react';

import {
  AdventureImage,
  AdventureItem,
  AdventureLocation,
  AdventureName,
  AdventureTitleWrapper,
} from './Adventure.style';

export const Adventure = ({item}) => {
  return (
    <AdventureItem>
      <AdventureImage source={{uri: item.imageURL}}></AdventureImage>
      <AdventureTitleWrapper>
        <AdventureName>{item.name}</AdventureName>
        <AdventureLocation>{item.address}</AdventureLocation>
      </AdventureTitleWrapper>
    </AdventureItem>
  );
};
