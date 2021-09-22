import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {LoginWrapper, SingupContainer} from './SingupScreen.style';
import {
  CenterPosition,
  FieldsContainer,
  HeaderText,
  HeaderWrapper,
  InputItem,
  SocialNetworksLoginContainer,
  SocialNetworkWrapper,
  ThinkText,
} from '../Login/LoginScreen.style';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {
  LoginButton,
  LoginContainer,
  LoginText,
} from '../StartScreen/StartPage.style';

export const SingUpScreen = ({navigation}) => {
  const signupButtonHandler = () => {
    navigation.navigate('HomeScreen');
  };

  const loginHandler = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <SingupContainer>
      <HeaderWrapper>
        <HeaderText>Sing up</HeaderText>
      </HeaderWrapper>
      <SocialNetworksLoginContainer>
        <SocialNetworkWrapper />
        <SocialNetworkWrapper />
      </SocialNetworksLoginContainer>
      <FieldsContainer>
        <CenterPosition>
          <ThinkText>or sing up with email </ThinkText>
        </CenterPosition>
        <InputItem value={'Username'} />
        <InputItem value={'Your email'} />
        <InputItem value={'password'} />
        <InputItem value={'Confirm password'} />
        <ButtonItem title={'Sign up'} handler={signupButtonHandler} />
      </FieldsContainer>
      <LoginWrapper>
        <LoginText>Already have an account?</LoginText>
        <TouchableWithoutFeedback onPress={loginHandler}>
          <LoginButton>Log in</LoginButton>
        </TouchableWithoutFeedback>
      </LoginWrapper>
    </SingupContainer>
  );
};
