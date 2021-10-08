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
  theme = {backgroundColor: '#2d9cdb', textColor: 'white'},
}) => {
  return (
    <ButtonWrapper>
      <ButtonStart
        disabled={disabled}
        onPress={handler}
        backgroundColor={theme.backgroundColor}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonText color={theme.textColor}>{title}</ButtonText>
        )}
      </ButtonStart>
    </ButtonWrapper>
  );
};
