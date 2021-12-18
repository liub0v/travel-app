import {Text} from 'react-native';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import React from 'react';

export const Footer = () => {
  return (
    <Text
      style={{
        width: '100%',
        fontFamily: fonts.normal,
        color: colors.grey,
        textAlign: 'center',
        marginTop: 24,
      }}>
      No more results
    </Text>
  );
};
