import React from 'react';
import {ButtonStart, ButtonText, ButtonWrapper} from './ButtonItem.style';
import {ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';

export const ButtonItem = ({
  handler,
  title,
  disabled = false,
  isLoading = false,
  theme = {backgroundColor: colors.blue, textColor: colors.white},
}) => {
  return (
    <ButtonWrapper>
      <ButtonStart
        disabled={disabled}
        onPress={handler}
        backgroundColor={theme.backgroundColor}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <ButtonText color={theme.textColor}>{title}</ButtonText>
        )}
      </ButtonStart>
    </ButtonWrapper>
  );
};
