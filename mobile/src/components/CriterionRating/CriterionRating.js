import {
  CriterionRatingWrapper,
  CriterionTitle,
  RatingValueTitle,
} from '../../screens/ReviewsScreen/CommentInput.style';
import Slider from '@react-native-community/slider';
import colors from '../../constants/colors';
import React from 'react';
import {View} from 'react-native';

export const CriterionRating = ({
  testID,
  ratingValue,
  title,
  onValueChangeHandler,
}) => {
  return (
    <View testID={testID}>
      <CriterionRatingWrapper>
        <CriterionTitle>{title}</CriterionTitle>
        <RatingValueTitle>{ratingValue}</RatingValueTitle>
      </CriterionRatingWrapper>
      <Slider
        testID={`${testID}-slider`}
        step={1}
        value={ratingValue}
        onValueChange={onValueChangeHandler}
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={colors.blue}
        maximumTrackTintColor={colors.white}
        thumbTintColor={colors.blue}
      />
    </View>
  );
};
