import React from 'react';
import {Formik} from 'formik';
import {
  Avatar,
  Container,
  GreyText,
  InfoContainer,
  MainInfo,
} from '../../../screens/ProfileScreen/Profile.style';
import {Text, View} from 'react-native';
import {
  BoldWhiteText,
  ButtonWrapper,
  InfoItem,
  WhiteText,
} from '../../../screens/EditProfileScreen/EditProfileScreen.style';
import colors from '../../../constants/colors';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {deleteGuide, updateGuide} from '../../../../redux/actions/GuideActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentGuideSelector,
  deleteGuideLoaderSelector,
  updateGuideLoaderSelector,
} from '../../../../redux/selectors/GuideSelectors';
import {DEFAULT_PROFILE_IMAGE} from '../../../constants/api';
import {profileValidationSchema} from '../../../services/validation';

export type Props = {
  route: any;
};
export const EditGuideScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const deleteIsLoading = useSelector(deleteGuideLoaderSelector);
  const updateIsLoading = useSelector(updateGuideLoaderSelector);

  const guide = useSelector(currentGuideSelector);
  const profileInfo = guide?.profileInfo;
  const userInfo = guide?.userID;
  const userID = guide?.userID?._id;
  const updateGuideHandler = ({
    name,
    username,
    email,
  }: {
    name: string;
    username: string;
    email: string;
  }) => {
    const [firstName, lastName] = name.split(' ');
    dispatch(updateGuide({userID, firstName, lastName, username, email}));
  };
  const deleteAccountHandler = () => {
    dispatch(deleteGuide(userID));
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <Formik
        validationSchema={profileValidationSchema}
        initialValues={{
          username: userInfo?.username ?? '',
          email: userInfo?.email ?? '',
          name: `${profileInfo?.firstName} ${profileInfo?.lastName}` ?? '',
        }}
        onSubmit={values => updateGuideHandler(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            <MainInfo>
              {profileInfo?.imageURL ? (
                <Avatar source={{uri: profileInfo?.imageURL}} />
              ) : (
                <Avatar source={DEFAULT_PROFILE_IMAGE} />
              )}
              <BoldWhiteText
                placeholder="Enter name"
                placeholderTextColor={colors.grey}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </MainInfo>
            <InfoContainer>
              <InfoItem>
                <GreyText>{'Username'}</GreyText>
                <WhiteText
                  placeholder="Enter username"
                  placeholderTextColor={colors.grey}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </InfoItem>
              {errors.username && touched.username && (
                <Text style={{color: colors.red, padding: 6}}>
                  {' '}
                  {errors.username}
                </Text>
              )}
              <InfoItem>
                <GreyText>{'Email'}</GreyText>
                <WhiteText
                  placeholder="Enter email"
                  placeholderTextColor={colors.grey}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </InfoItem>
              {errors.email && touched.email && (
                <Text style={{color: colors.red, padding: 6}}>
                  {' '}
                  {errors.email}
                </Text>
              )}
            </InfoContainer>
            <ButtonWrapper>
              <ButtonItem
                isLoading={updateIsLoading}
                handler={handleSubmit}
                title={'Save'}
              />
            </ButtonWrapper>
          </View>
        )}
      </Formik>
      <ButtonWrapper>
        <ButtonItem
          theme={{backgroundColor: colors.red, textColor: colors.white}}
          isLoading={deleteIsLoading}
          handler={deleteAccountHandler}
          title={'Delete account'}
        />
      </ButtonWrapper>
    </Container>
  );
};
