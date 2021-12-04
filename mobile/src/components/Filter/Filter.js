import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {Container, InitImage} from '../Like/Like.style';
import filterIcon from '../../../assets/images/filterIcon.png';
export const Filter = ({handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
      }}>
      <View>
        <InitImage style={{width: 24}} source={filterIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
};
