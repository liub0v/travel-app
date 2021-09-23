import React from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Formik} from 'formik';
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
import {LoginButton, LoginText} from '../StartScreen/StartPage.style';
import {singUpValidationSchema, validate} from '../../services/validation';
import {useDispatch} from 'react-redux';
import {logInUser, singUpUser} from '../../../redux/actions/AuthActions';

export const SingUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const signupButtonHandler = ({username, email, password}) => {
    dispatch(singUpUser({username, email, password}));
  };

  const loginHandler = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
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
        <Formik
          validationSchema={singUpValidationSchema}
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={signupButtonHandler}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <InputItem
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="username"
                maxLength={16}
              />
              {errors.username && touched.username && (
                <Text style={{color: 'red'}}> {errors.username}</Text>
              )}
              <InputItem
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
              />
              {errors.email && touched.email && (
                <Text style={{color: 'red'}}> {errors.email}</Text>
              )}
              <InputItem
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="password"
                maxLength={128}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={{color: 'red'}}> {errors.password}</Text>
              )}
              <InputItem
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="confirm password"
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={{color: 'red'}}> {errors.confirmPassword}</Text>
              )}
              <ButtonItem
                disabled={!isValid}
                title={'Sign up'}
                handler={handleSubmit}
              />
            </>
          )}
        </Formik>
      </FieldsContainer>
      <LoginWrapper>
        <LoginText>Already have an account?</LoginText>
        <TouchableWithoutFeedback onPress={loginHandler}>
          <LoginButton>Log in</LoginButton>
        </TouchableWithoutFeedback>
      </LoginWrapper>
    </ScrollView>
  );
};
