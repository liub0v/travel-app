import React from 'react';
import {Text, View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {
  SocialNetworksLoginContainer,
  CenterPosition,
  InputItem,
  LeftPosition,
  LoginContainer,
  HeaderText,
  NormalText,
  ThinkText,
  SocialNetworkWrapper,
  SingupWrapper,
  HeaderWrapper,
  FieldsContainer,
} from './LoginScreen.style';

export const LoginScreen = ({navigation}) => {
  const loginButtonHandler = () => {
    // setPage(1);
    navigation.navigate('Onboarding');
  };

  const SingupButtonHandler = () => {
    // setPage(1);
    navigation.navigate('SingupScreen');
  };
  return (
    <LoginContainer>
      <HeaderWrapper>
        <HeaderText>Log in</HeaderText>
      </HeaderWrapper>
      <SocialNetworksLoginContainer>
        <SocialNetworkWrapper />
        <SocialNetworkWrapper />
      </SocialNetworksLoginContainer>
      <FieldsContainer>
        <CenterPosition>
          <ThinkText>or log in with email </ThinkText>
        </CenterPosition>
        <InputItem value={'email'} />
        <InputItem value={'password'} />
        <LeftPosition>
          <NormalText>Forgot password?</NormalText>
        </LeftPosition>
        <ButtonItem title={'Log in'} handler={loginButtonHandler} />
      </FieldsContainer>
      <SingupWrapper>
        <CenterPosition>
          <ThinkText>Don’t have an account?</ThinkText>
        </CenterPosition>
        <ButtonItem title={'Sing up'} handler={SingupButtonHandler} />
      </SingupWrapper>
    </LoginContainer>
  );
};
