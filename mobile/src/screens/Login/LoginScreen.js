import React from 'react';
import {Text, View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {
  AccountLoginWrapper,
  CenterPosition,
  EmailInput,
  FacebookView,
  LeftPosition,
  LoginContainer,
  LoginHeader,
  NormalText,
  PasswordInput,
  ThinkText,
  TwitterView,
  ViewButtomWrapper,
  ViewWrapper,
} from './Login.style';

export const LoginScreen = ({navigation}) => {
  const buttonHandler = () => {
    // setPage(1);
    navigation.navigate('Onboarding');
  };
  return (
    <LoginContainer>
      <LoginHeader>Log in</LoginHeader>
      <AccountLoginWrapper>
        <TwitterView />
        <FacebookView />
      </AccountLoginWrapper>
      <ThinkText>or log in with email </ThinkText>
      <ViewWrapper>
        <EmailInput value={'email'} />
        <PasswordInput value={'password'} />
        <LeftPosition>
          <NormalText>Forgot password?</NormalText>
        </LeftPosition>
        <ButtonItem title={'Log in'} handler={buttonHandler} />
      </ViewWrapper>
      <ViewButtomWrapper>
        <CenterPosition>
          <ThinkText>Don’t have an account?</ThinkText>
        </CenterPosition>
        <ButtonItem title={'Sing up'} handler={buttonHandler} />
      </ViewButtomWrapper>
    </LoginContainer>
  );
};
