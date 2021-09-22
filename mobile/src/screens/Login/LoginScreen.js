import React from 'react';
import {Formik} from 'formik';
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
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

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
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
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

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <InputItem
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <InputItem
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <LeftPosition>
                <NormalText>Forgot password?</NormalText>
              </LeftPosition>
              <ButtonItem title={'Log in'} handler={handleSubmit} />
            </>
          )}
        </Formik>
      </FieldsContainer>
      <SingupWrapper>
        <CenterPosition>
          <ThinkText>Don’t have an account?</ThinkText>
        </CenterPosition>
        <ButtonItem title={'Sing up'} handler={SingupButtonHandler} />
      </SingupWrapper>
    </ScrollView>
  );
};
