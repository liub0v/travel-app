import React from 'react';
import {Formik} from 'formik';
import {
  Avatar,
  Container,
  GreyText,
  InfoContainer,
  MainInfo,
} from '../../../screens/ProfileScreen/Profile.style';
import {View} from 'react-native';
import {
  BoldWhiteText,
  ButtonWrapper,
  InfoItem,
  WhiteText,
} from '../../../screens/EditProfileScreen/EditProfileScreen.style';
import colors from '../../../constants/colors';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {useRoute} from '@react-navigation/native';
import {deleteGuide, updateGuide} from '../../../../redux/actions/GuideActions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGuideLoaderSelector} from '../../../../redux/selectors/GuideSelectors';

export type Props = {
  route: any;
};
export const EditGuideScreen: React.FC<Props> = () => {
  const route = useRoute().params.route;
  const dispatch = useDispatch();
  const deleteIsLoading = useSelector(deleteGuideLoaderSelector);

  const profileInfo = route.params?.profileInfo;
  const userInfo = route.params?.userInfo;
  const userID = userInfo._id;
  const updateGuideHandler = ({name, username, email}) => {
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
        initialValues={{
          username: userInfo?.username ?? '',
          email: userInfo?.email ?? '',
          name: `${profileInfo?.firstName} ${profileInfo?.lastName}` ?? '',
        }}
        onSubmit={values => updateGuideHandler(values)}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View>
            <MainInfo>
              <Avatar source={{uri: profileInfo?.imageURL}} />
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
            </InfoContainer>
            <ButtonWrapper>
              <ButtonItem
                isLoading={false}
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
