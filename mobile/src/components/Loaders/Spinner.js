import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';

export const Spinner = ({size = 'large', color = colors.green}) => {
  return (
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      size={size}
      color={color}
    />
  );
};
