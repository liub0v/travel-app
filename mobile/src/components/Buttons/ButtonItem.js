import React from 'react';
import {ButtonStart, ButtonText, ButtonWrapper} from './ButtonItem.style';

export const ButtonItem = ({handler, title, disabled}) => {
  return (
    <ButtonWrapper>
      <ButtonStart disabled={disabled} onPress={handler}>
        <ButtonText>{title}</ButtonText>
      </ButtonStart>
    </ButtonWrapper>
  );
};
