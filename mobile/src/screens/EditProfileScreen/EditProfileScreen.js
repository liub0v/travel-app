import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import {dateParser} from '../../services/dataParser';
import {deleteUser, updateUser} from '../../../redux/actions/AuthActions';
import {
  Avatar,
  Container,
  GreyText,
  InfoContainer,
  MainInfo,
} from '../ProfileScreen/Profile.style';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import colors from '../../constants/colors';
import {
  BoldWhiteText,
  ButtonWrapper,
  InfoItem,
  WhiteText,
} from './EditProfileScreen.style';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  deleteUserIsLoadingSelector,
  profileInfoSelector,
  updateUserIsLoadingSelector,
  userInfoSelector,
} from '../../../redux/selectors/UserSelector';
import {profileValidationSchema} from '../../services/validation';
export const EditProfileScreen = () => {
  const profileInfo = useSelector(profileInfoSelector);
  const userInfo = useSelector(userInfoSelector);

  let initBirthDateString = profileInfo?.birthDate
    ? dateParser(profileInfo?.birthDate)
    : 'Choose date';
  const initDate = profileInfo?.birthDate
    ? new Date(initBirthDateString)
    : new Date();
  const [birthDate, setBirthDate] = useState(initDate);
  console.log(birthDate);
  console.log(new Date());
  const [birthDateString, setBirthDateString] = useState(initBirthDateString);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteIsLoading = useSelector(deleteUserIsLoadingSelector);
  const updateIsLoading = useSelector(updateUserIsLoadingSelector);
  const firstName = profileInfo?.firstName ?? '';
  const lastName = profileInfo?.lastName ?? '';
  function updateAccountHandler({
    name,
    username,
    phone,
    email,
    birthDate,
    address,
    image,
  }) {
    const [firstName, lastName] = name.split(' ');
    dispatch(
      updateUser({
        userID: userInfo._id,
        firstName,
        lastName,
        username,
        email,
        phone,
        birthDate,
        address,
        image,
      }),
    );
  }
  function deleteAccountHandler() {
    dispatch(deleteUser(userInfo._id));
  }
  const selectFile = async setFieldValue => {
    const res = await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      mediaType: 'photo',
    });
    setFieldValue('image', res?.assets?.[0]);
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
          name: firstName + lastName,
          phone: profileInfo?.phone ?? '',
          birthDate: birthDate,
          address: profileInfo?.address ?? '',
          image: profileInfo?.imageURL,
        }}
        onSubmit={values => updateAccountHandler(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <MainInfo>
              <TouchableWithoutFeedback
                onPress={() => selectFile(setFieldValue)}>
                <Avatar source={{uri: values.image?.uri || values.image}} />
              </TouchableWithoutFeedback>

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
              <InfoItem>
                <GreyText>{'Phone'}</GreyText>
                <WhiteText
                  placeholder="Enter phone"
                  placeholderTextColor={colors.grey}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </InfoItem>
              <InfoItem>
                <GreyText>{'Date of birth'}</GreyText>
                <ButtonWrapper>
                  <ButtonItem
                    theme={{
                      backgroundColor: colors.white,
                      textColor: colors.screenBackground,
                    }}
                    handler={() => setOpen(true)}
                    title={birthDateString}
                  />
                </ButtonWrapper>
                <DatePicker
                  modal
                  open={open}
                  mode="date"
                  date={birthDate}
                  onConfirm={date => {
                    setOpen(false);
                    setBirthDateString(dateParser(date));
                    setBirthDate(date);
                    setFieldValue('birthDate', date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </InfoItem>
              <InfoItem>
                <GreyText>{'Address'}</GreyText>
                <WhiteText
                  placeholder="Enter address"
                  placeholderTextColor={colors.grey}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
              </InfoItem>
            </InfoContainer>
            <ButtonWrapper>
              <ButtonItem
                isLoading={updateIsLoading}
                handler={handleSubmit}
                title={'Save'}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>

      <ButtonItem
        theme={{backgroundColor: colors.red, textColor: colors.white}}
        isLoading={deleteIsLoading}
        handler={deleteAccountHandler}
        title={'Delete account'}
      />
    </Container>
  );
};
