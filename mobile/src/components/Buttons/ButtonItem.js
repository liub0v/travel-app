import React from 'react';
import {
  ButtonLoader,
  ButtonStart,
  ButtonText,
  ButtonWrapper,
} from './ButtonItem.style';
import {ActivityIndicator} from 'react-native';

export const ButtonItem = ({
  handler,
  title,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <ButtonWrapper>
      <ButtonStart disabled={disabled} onPress={handler}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonText>{title}</ButtonText>
        )}
      </ButtonStart>
    </ButtonWrapper>
  );
};
