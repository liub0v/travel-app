import React from 'react';
import {
  AdventureImage,
  AdventureItem,
  AdventureLocation,
  AdventureName,
  AdventureTitleWrapper,
} from './Adventure.style';
import {TouchableWithoutFeedback} from 'react-native';

export const Adventure = ({item, navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('AdventureScreen', {adventure: item});
      }}>
      <AdventureItem>
        <AdventureImage source={{uri: item.imageURL}} />
        <AdventureTitleWrapper>
          <AdventureName>{item.name}</AdventureName>
          <AdventureLocation>{item.address}</AdventureLocation>
        </AdventureTitleWrapper>
      </AdventureItem>
    </TouchableWithoutFeedback>
  );
};
