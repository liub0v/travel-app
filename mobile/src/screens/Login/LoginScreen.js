import React from 'react';
import {Text, View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
export const LoginScreen = ({navigation}) => {
  const buttonHandler = () => {
    // setPage(1);
    navigation.navigate('Onboarding');
  };
  return (
    <View>
      <Text>LOGIN</Text>
      <ButtonItem title={'Log in'} handler={buttonHandler} />
    </View>
  );
};
