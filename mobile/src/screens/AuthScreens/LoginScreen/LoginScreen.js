import React from 'react';
import {Formik} from 'formik';
import {ScrollView, Text} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {logInUser} from '../../../../redux/actions/AuthActions';
import {logInIsLoadingSelector} from '../../../../redux/selectors/UserSelector';

import {
  getValidationStyles,
  logInValidationSchema,
} from '../../../services/validation';
import colors from '../../../constants/colors';

import {ButtonItem} from '../../../components/Buttons/ButtonItem';

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
  ButtonWrapper,
} from './LoginScreen.style';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(logInIsLoadingSelector);
  const loginButtonHandler = ({email, password}) => {
    dispatch(logInUser({email, password}));
  };

  const singUpButtonHandler = () => {
    navigation.navigate('SingUpScreen');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <HeaderWrapper>
        <HeaderText>Log in</HeaderText>
      </HeaderWrapper>
      <SocialNetworksLoginContainer>
        {/*<SocialNetworkWrapper />*/}
        {/*<SocialNetworkWrapper />*/}
      </SocialNetworksLoginContainer>
      <FieldsContainer>
        <CenterPosition>
          {/*<ThinkText>or log in with email </ThinkText>*/}
        </CenterPosition>

        <Formik
          validationSchema={logInValidationSchema}
          initialValues={{email: 'c10@mail.com', password: '12345678_Client'}}
          onSubmit={loginButtonHandler}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
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
                <Text style={{color: colors.red}}> {errors.email}</Text>
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
                <Text style={{color: colors.red}}> {errors.password}</Text>
              )}
              <LeftPosition></LeftPosition>
              <ButtonWrapper>
                <ButtonItem
                  isLoading={isLoading}
                  title={'Log in'}
                  handler={handleSubmit}
                />
              </ButtonWrapper>
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
