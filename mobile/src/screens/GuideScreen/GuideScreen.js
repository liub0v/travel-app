import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ProfileForm} from '../../components/ProfileForm/ProfileForm';
import {Container} from '../ProfileScreen/Profile.style';

export const GuideScreen = () => {
  const route = useRoute();
  const userInfo = route.params.userInfo;
  const profileInfo = route.params.profileInfo;

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
      <ProfileForm profileInfo={profileInfo} userInfo={userInfo} />
    </Container>
  );
};
