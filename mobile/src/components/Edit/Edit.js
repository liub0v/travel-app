import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Container, InitImage} from '../Like/Like.style';
import editIcon from '../../../assets/images/editIconPen.png';
export const Edit = ({handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
      }}>
      <Container>
        <InitImage source={editIcon} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
