import React from 'react';
import PropTypes from 'prop-types';
import {ButtonWrapper, ButtonText, ButtonContainer} from './ButtonItem.style';
import {ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';

export const ButtonItem = ({
  handler = () => {},
  title = 'press',
  disabled = false,
  isLoading = false,
  theme = {backgroundColor: colors.blue, textColor: colors.white},
}) => {
  return (
    <ButtonContainer>
      <ButtonWrapper
        disabled={disabled}
        onPress={handler}
        backgroundColor={theme.backgroundColor}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <ButtonText color={theme.textColor}>{title}</ButtonText>
        )}
      </ButtonWrapper>
    </ButtonContainer>
  );
};

ButtonItem.propTypes = {
  handler: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  theme: PropTypes.object,
};
