import React from 'react';
import {ScrollView, Text, TouchableWithoutFeedback} from 'react-native';
import {Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';
import {singUpUser} from '../../../../redux/actions/AuthActions';
import {signUpIsLoadingSelector} from '../../../../redux/selectors/userSelector';

import {
  getValidationStyles,
  singUpValidationSchema,
} from '../../../services/validation';

import {ButtonItem} from '../../../components/Buttons/ButtonItem';

import {LoginButton, LoginText} from '../StartScreen/StartPage.style';
import {LoginWrapper} from './SingupScreen.style';
import {
  CenterPosition,
  FieldsContainer,
  HeaderText,
  HeaderWrapper,
  InputItem,
  SocialNetworksLoginContainer,
  SocialNetworkWrapper,
  ThinkText,
} from '../LoginScreen/LoginScreen.style';

export const SingUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(signUpIsLoadingSelector);
  const signupButtonHandler = ({username, email, password}) => {
    username = username.toLowerCase();
    dispatch(singUpUser({username, email, password}));
  };

  const loginHandler = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
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
                style={getValidationStyles(errors.username, touched.username)}
              />
              {errors.username && touched.username && (
                <Text style={{color: 'red'}}> {errors.username}</Text>
              )}
              <InputItem
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
                style={getValidationStyles(errors.email, touched.email)}
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
                style={getValidationStyles(errors.password, touched.password)}
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
                style={getValidationStyles(
                  errors.confirmPassword,
                  touched.confirmPassword,
                )}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={{color: 'red'}}> {errors.confirmPassword}</Text>
              )}
              <ButtonItem
                disabled={!isValid}
                isLoading={isLoading}
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
