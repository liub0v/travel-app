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
import {
  getAdventureReviewsSelector,
  getPopularAdventureReviewsSelector,
} from '../../../../redux/selectors/AdventureSelectors';
import {
  getSavedAdventureReviewsSelector,
  getVisitedAdventureReviewsSelector,
} from '../../../../redux/selectors/UserSelector';

export const Adventure = ({item, type}) => {
  const navigation = useNavigation();
  const goAdventureScreen = () => {
    let reviewsSelector;

    switch (type) {
      case 'popular': {
        reviewsSelector = getPopularAdventureReviewsSelector(item._id);
        break;
      }
      case 'saved': {
        reviewsSelector = getSavedAdventureReviewsSelector(item._id);
        break;
      }
      case 'visited': {
        reviewsSelector = getVisitedAdventureReviewsSelector(item._id);
        break;
      }
      default: {
        reviewsSelector = getAdventureReviewsSelector(item._id);
      }
    }
    navigation.navigate('AdventureScreen', {
      adventure: item,
      reviewsSelector,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goAdventureScreen}>
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
