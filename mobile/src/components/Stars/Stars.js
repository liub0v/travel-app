import {
  Star,
  StarsContainer,
} from '../../screens/ExploreScreen/components/Hotel.style';
import star from '../../../assets/images/start.png';
import React from 'react';

export const Stars = ({starsNumber}) => {
  return (
    <StarsContainer>
      {[...Array(starsNumber)].map((item, index) => {
        return <Star key={index} source={star} />;
      })}
    </StarsContainer>
  );
};
