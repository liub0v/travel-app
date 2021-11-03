import React from 'react';
import {ImageBackground, TouchableWithoutFeedback} from 'react-native';

import {ButtonItem} from '../../../components/Buttons/ButtonItem';

import {
  LogoText,
  LogoContainer,
  Logo,
  LogoDescription,
  StartedContainer,
  LoginText,
  LoginContainer,
  LoginButton,
} from './StartPage.style';

import imageBackground from '../../../../assets/images/startBackground.png';
import logo from '../../../../assets/images/Logo.png';

export const StartScreen = ({navigation}) => {
  const loginHandler = () => {
    navigation.navigate('LoginScreen');
  };
  const buttonHandler = () => {
    navigation.navigate('SingUpScreen');
  };
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      source={imageBackground}>
      <LogoContainer>
        <Logo source={logo} />
        <LogoText>Travel Guide</LogoText>
        <LogoDescription>Find your best place for...</LogoDescription>
      </LogoContainer>
      <StartedContainer>
        <ButtonItem title={'Get started'} handler={buttonHandler} />
        <LoginContainer>
          <LoginText>Already have an account?</LoginText>
          <TouchableWithoutFeedback onPress={loginHandler}>
            <LoginButton>Log in</LoginButton>
          </TouchableWithoutFeedback>
        </LoginContainer>
      </StartedContainer>
    </ImageBackground>
  );
};
