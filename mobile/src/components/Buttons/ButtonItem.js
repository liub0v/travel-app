import React from 'react';
import PropTypes from 'prop-types';
import {ButtonWrapper, ButtonText, ButtonContainer} from './ButtonItem.style';
import {ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';

export const ButtonItem = ({
  handler = () => {},
  title = 'press',
  titleSize = 16,
  disabled = false,
  isLoading = false,
  theme = {
    backgroundColor: colors.blue,
    textColor: colors.white,
  },
  size = {
    height: 50,
    width: 80,
  },
}) => {
  return (
    <ButtonContainer>
      <ButtonWrapper
        disabled={disabled}
        onPress={handler}
        backgroundColor={theme.backgroundColor}
        height={size.height}
        width={size.width}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <ButtonText fontSize={titleSize} color={theme.textColor}>
            {title}
          </ButtonText>
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
