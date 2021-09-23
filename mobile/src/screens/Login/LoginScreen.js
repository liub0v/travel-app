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
import {ScrollView, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {logInUser} from '../../../redux/actions/AuthActions';
import {
  getValidationStyles,
  logInValidationSchema,
  singUpValidationSchema,
} from '../../services/validation';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const loginButtonHandler = ({email, password}) => {
    dispatch(logInUser({email, password}));
  };

  const singUpButtonHandler = () => {
    navigation.navigate('SingUpScreen');
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
          validationSchema={logInValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={loginButtonHandler}>
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
                secureTextEntry
                style={getValidationStyles(errors.password, touched.password)}
              />
              {errors.password && touched.password && (
                <Text style={{color: 'red'}}> {errors.password}</Text>
              )}
              <LeftPosition>
                <NormalText>Forgot password?</NormalText>
              </LeftPosition>
              <ButtonItem
                // disabled={!isValid}
                title={'Log in'}
                handler={handleSubmit}
              />
            </>
          )}
        </Formik>
      </FieldsContainer>
      <SingupWrapper>
        <CenterPosition>
          <ThinkText>Don’t have an account?</ThinkText>
        </CenterPosition>
        <ButtonItem title={'Sing up'} handler={singUpButtonHandler} />
      </SingupWrapper>
    </ScrollView>
  );
};
