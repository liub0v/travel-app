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

export const Adventure = ({item}) => {
  const navigation = useNavigation();
  const goAdventureScreen = () => {
    navigation.navigate('AdventureScreen', {
      adventureID: item._id,
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
