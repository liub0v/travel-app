import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import {Container, DeleteImage} from './Delete.style';

export const Delete = ({handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback onPress={handler}>
      <Container>
        <DeleteImage source={deleteIcon} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
