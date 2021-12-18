import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Container, InitImage} from '../Like/Like.style';
import addIcon from '../../../assets/images/plus.png';
import colors from '../../constants/colors';
export const Add = ({handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
      }}>
      <Container
        style={{backgroundColor: colors.screenBackground, marginRight: 12}}>
        <InitImage style={{width: 24, height: 24}} source={addIcon} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
