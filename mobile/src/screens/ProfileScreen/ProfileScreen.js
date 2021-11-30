import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  logOutIsLoadingSelector,
  profileInfoSelector,
  userInfoSelector,
} from '../../../redux/selectors/UserSelector';
import {logOutUser} from '../../../redux/actions/AuthActions';

import {ButtonItem} from '../../components/Buttons/ButtonItem';

import colors from '../../constants/colors';

import {ButtonWrapper, Container} from './Profile.style';
import {useRoute} from '@react-navigation/native';
import {ProfileForm} from '../../components/ProfileForm/ProfileForm';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const profileInfo = useSelector(profileInfoSelector);
  const userInfo = useSelector(userInfoSelector);
  const role = userInfo?.role;
  const isLoading = useSelector(logOutIsLoadingSelector);
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <ProfileForm profileInfo={profileInfo} userInfo={userInfo} />

      <ButtonWrapper>
        <ButtonItem
          theme={{backgroundColor: colors.white, textColor: 'black'}}
          isLoading={isLoading}
          handler={logOutButtonHandler}
          title={'Log out'}
        />
      </ButtonWrapper>
    </Container>
  );
};
