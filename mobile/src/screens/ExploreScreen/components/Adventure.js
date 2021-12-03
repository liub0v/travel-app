import React from 'react';

import {
  AdventureImage,
  AdventureItem,
  AdventureLocation,
  AdventureName,
  AdventureTitleWrapper,
} from './Adventure.style';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getPopularAdventureReviewsSelector} from '../../../../redux/selectors/AdventureSelectors';

export const Adventure = ({item}) => {
  const navigation = useNavigation();
  const popularAdventureReviewsSelector = getPopularAdventureReviewsSelector(
    item?._id,
  );
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('AdventureScreen', {
          adventure: item,
          reviewsSelector: popularAdventureReviewsSelector,
        });
      }}>
      <AdventureItem>
        <AdventureImage source={{uri: item?.imageURL}} />
        <AdventureTitleWrapper>
          <AdventureName>{item?.name}</AdventureName>
          <AdventureLocation>{item?.address}</AdventureLocation>
        </AdventureTitleWrapper>
      </AdventureItem>
    </TouchableWithoutFeedback>
  );
};
