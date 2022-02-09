import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  StarItem,
  StarsWrapper,
} from '../../screens/ReviewsScreen/CommentInput.style';
import activeStar from '../../../assets/images/activeStar.png';
import star from '../../../assets/images/star.png';

export const StarsRating = React.memo(
  ({initStarsNumber = 0, setStarRating}) => {
    const [currentIndex, setCurrentIndex] = useState(initStarsNumber);

    const Star = ({isActive = false, index}) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (currentIndex === index) {
              setCurrentIndex(0);
              setStarRating(0);
            } else {
              setCurrentIndex(index);
              setStarRating(index);
            }
          }}>
          {isActive ? (
            <StarItem source={activeStar} />
          ) : (
            <StarItem source={star} />
          )}
        </TouchableWithoutFeedback>
      );
    };
    return (
      <StarsWrapper>
        <Star index={1} isActive={currentIndex > 0} />
        <Star index={2} isActive={currentIndex > 1} />
        <Star index={3} isActive={currentIndex > 2} />
        <Star index={4} isActive={currentIndex > 3} />
        <Star index={5} isActive={currentIndex > 4} />
      </StarsWrapper>
    );
  },
);
