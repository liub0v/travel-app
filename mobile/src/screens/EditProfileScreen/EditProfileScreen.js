import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import {useRoute} from '@react-navigation/native';
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
import {TouchableWithoutFeedback} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {deleteUserIsLoadingSelector} from '../../../redux/selectors/UserSelector';
export const EditProfileScreen = () => {
  const route = useRoute().params.route;
  const profileInfo = route.params?.profileInfo;
  const userInfo = route.params?.userInfo;
  let initBirthDateString = dateParser(profileInfo?.birthDate);
  const [birthDate, setBirthDate] = useState(new Date(initBirthDateString));
  const [birthDateString, setBirthDateString] = useState(initBirthDateString);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteIsLoading = useSelector(deleteUserIsLoadingSelector);
  function updateAccountHandler({
    name,
    username,
    phone,
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
        initialValues={{
          username: userInfo?.username ?? '',
          email: userInfo?.email ?? '',
          name: `${profileInfo?.firstName} ${profileInfo?.lastName}` ?? '',
          phone: profileInfo?.phone ?? '',
          birthDate: birthDate,
          address: profileInfo?.address ?? '',
          image: profileInfo?.imageURL,
        }}
        onSubmit={values => updateAccountHandler(values)}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
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
                isLoading={false}
                handler={handleSubmit}
                title={'Save'}
              />
            </ButtonWrapper>
          </>
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
