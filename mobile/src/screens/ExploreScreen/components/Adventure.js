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
      <AdventureImage source={item.image}></AdventureImage>
      <AdventureTitleWrapper>
        <AdventureName>{item.name}</AdventureName>
        <AdventureLocation>{item.location}</AdventureLocation>
      </AdventureTitleWrapper>
    </AdventureItem>
  );
};
