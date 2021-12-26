import React from 'react';

import {
  AdventureItem,
  AdventureLocation,
  AdventureName,
  AdventureTitleWrapper,
} from './Adventure.style';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AnimatedImage} from '../../../components/Loaders/AnimatedImage';

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
        <AnimatedImage
          imageStyle={{width: 150, height: 250, borderRadius: 16}}
          viewStyle={{borderRadius: 16}}
          imageURL={item?.imageURL}
        />
        <AdventureTitleWrapper>
          <AdventureName>{item?.name}</AdventureName>
          <AdventureLocation>{item?.address}</AdventureLocation>
        </AdventureTitleWrapper>
      </AdventureItem>
    </TouchableWithoutFeedback>
  );
};
