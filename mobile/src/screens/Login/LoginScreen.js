import React from 'react';
import {Formik} from 'formik';
import {
  SocialNetworksLoginContainer,
  CenterPosition,
  InputItem,
  LeftPosition,
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
import {useDispatch} from 'react-redux';
import {logInUser} from '../../../redux/actions/AuthActions';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loginButtonHandler = ({email, password}) => {
    // navigation.navigate('Onboarding');
    dispatch(logInUser({email, password}));
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
          onSubmit={loginButtonHandler}>
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
