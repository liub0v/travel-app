import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import {useRoute} from '@react-navigation/native';
import {deleteGuideLoaderSelector} from '../../../redux/selectors/GuideSelectors';
import {dateParser} from '../../services/dataParser';
import {deleteUser, logOutUser} from '../../../redux/actions/AuthActions';
import {deleteGuide} from '../../../redux/actions/GuideActions';
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
} from './EditProfileScreen,style';
export const EditProfileScreen = () => {
  const route = useRoute();
  const user = route.params.user;
  const profileInfo = user?.profileInfo;
  let initBirthDateString = dateParser(profileInfo?.birthDate);
  const [birthDate, setBirthDate] = useState(new Date(initBirthDateString));
  const [birthDateString, setBirthDateString] = useState(initBirthDateString);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteIsLoading = useSelector(deleteGuideLoaderSelector);

  function updateAccountHandler(args) {
    console.log(args);
  }
  function deleteAccountHandler() {
    const userRole = user?.userID?.role;
    const userID = user?.userID?._id;

    switch (userRole) {
      case 'guide': {
        dispatch(deleteGuide(userID));
        break;
      }
      case 'admin': {
        break;
      }
      case 'client': {
        dispatch(deleteUser(userID));
        break;
      }
    }
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <Formik
        initialValues={{
          username: user?.userID?.username ?? '',
          email: user?.userID?.email ?? '',
          name: `${profileInfo?.firstName} ${profileInfo?.lastName}` ?? '',
          phone: profileInfo?.phone ?? '',
          birthDate: birthDate,
          address: profileInfo?.address ?? '',
        }}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <>
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
