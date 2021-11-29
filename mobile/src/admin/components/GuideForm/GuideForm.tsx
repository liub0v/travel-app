import React from 'react';
import {FieldsContainer} from '../../../screens/AuthScreens/LoginScreen/LoginScreen.style';
import {Formik} from 'formik';
import {
  getValidationStyles,
  singUpValidationSchema,
} from '../../../services/validation';
import {Text} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {GreyText} from '../../../screens/ProfileScreen/Profile.style';
import {
  ButtonWrapper,
  InfoItem,
  WhiteText,
} from '../../../screens/EditProfileScreen/EditProfileScreen.style';
import colors from '../../../constants/colors';

type Props = {
  submitHandler: any;
  isLoading: boolean;
};

export const GuideForm: React.FC<Props> = ({submitHandler, isLoading}) => {
  return (
    <FieldsContainer>
      <Formik
        validationSchema={singUpValidationSchema}
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={submitHandler}>
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
            <InfoItem>
              <GreyText styte={{color: colors.white}}>{'Username'}</GreyText>
              <WhiteText
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="username"
                maxLength={16}
                autoCapitalize="none"
                autoCorrect={false}
                style={getValidationStyles(errors.username, touched.username)}
              />
            </InfoItem>
            {errors.username && touched.username && (
              <Text style={{color: 'red'}}> {errors.username}</Text>
            )}
            <InfoItem>
              <GreyText styte={{color: colors.white}}>{'Email'}</GreyText>
              <WhiteText
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                style={getValidationStyles(errors.email, touched.email)}
              />
            </InfoItem>
            {errors.email && touched.email && (
              <Text style={{color: 'red'}}> {errors.email}</Text>
            )}
            <InfoItem>
              <GreyText styte={{color: colors.white}}>{'Password'}</GreyText>
              <WhiteText
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="password"
                maxLength={128}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={getValidationStyles(errors.password, touched.password)}
              />
            </InfoItem>
            {errors.password && touched.password && (
              <Text style={{color: 'red'}}> {errors.password}</Text>
            )}
            <InfoItem>
              <GreyText styte={{color: colors.white}}>
                {'Confirm password'}
              </GreyText>
              <WhiteText
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="confirm password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={getValidationStyles(
                  errors.confirmPassword,
                  touched.confirmPassword,
                )}
              />
            </InfoItem>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={{color: 'red'}}> {errors.confirmPassword}</Text>
            )}
            <ButtonWrapper>
              <ButtonItem
                disabled={!isValid}
                isLoading={isLoading}
                title={'Save'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </FieldsContainer>
  );
};
