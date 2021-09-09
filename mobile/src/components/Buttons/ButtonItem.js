import React from 'react';
import {ButtonStart, ButtonText, ButtonWrapper} from './ButtonItem.style';

export const ButtonItem = ({handler, title}) => {
  return (
    <ButtonWrapper>
      <ButtonStart onPress={handler}>
        <ButtonText>{title}d</ButtonText>
      </ButtonStart>
    </ButtonWrapper>
  );
};
