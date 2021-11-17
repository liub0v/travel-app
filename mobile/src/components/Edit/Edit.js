import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Container, InitImage} from '../Like/Like.style';

export const Edit = ({handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handler();
      }}>
      <Container>
        <InitImage
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png',
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};
