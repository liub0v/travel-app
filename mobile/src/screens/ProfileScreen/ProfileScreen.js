import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  logOutIsLoadingSelector,
  roleSelector,
} from '../../../redux/selectors/UserSelector';
import {deleteUser, logOutUser} from '../../../redux/actions/AuthActions';

import {ButtonItem} from '../../components/Buttons/ButtonItem';

import colors from '../../constants/colors';
import {dateParser} from '../../services/dataParser';

import {
  Avatar,
  ButtonWrapper,
  Container,
  InfoContainer,
  WhiteText,
  InfoItem,
  GreyText,
  MainInfo,
  BoldWhiteText,
} from './Profile.style';
import {useRoute} from '@react-navigation/native';
import {deleteGuide} from '../../../redux/actions/GuideActions';
import {deleteGuideLoaderSelector} from '../../../redux/selectors/GuideSelectors';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const user = route.params.user;
  const role = useSelector(roleSelector);
  const isLoading = useSelector(logOutIsLoadingSelector);
  const deleteIsLoading = useSelector(deleteGuideLoaderSelector);
  const profileInfo = user?.profileInfo;
  let birthDate = dateParser(profileInfo?.birthDate);
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }
  function deleteAccountHandler() {
    const userRole = user?.userID?.role;
    const userID = user?.userID?._id;

    switch (userRole) {
      case 'guide': {
        console.log('screen', userID);
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
      <MainInfo>
        <Avatar source={{uri: profileInfo?.imageURL}} />
        {profileInfo ? (
          <>
            <BoldWhiteText>
              {`${profileInfo?.firstName} ${profileInfo?.lastName}`}
            </BoldWhiteText>
            <GreyText>{`${profileInfo?.address}`}</GreyText>
          </>
        ) : (
          <BoldWhiteText>{`${user?.userID?.username}`}</BoldWhiteText>
        )}
      </MainInfo>
      <InfoContainer>
        <InfoItem>
          <GreyText>{'Username'}</GreyText>
          <WhiteText>{`${user?.userID?.username}`}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Email'}</GreyText>
          <WhiteText>{`${user?.userID?.email}`}</WhiteText>
        </InfoItem>
        {profileInfo && (
          <>
            <InfoItem>
              <GreyText>{'Phone'}</GreyText>
              <WhiteText>{`${profileInfo?.phone}`}</WhiteText>
            </InfoItem>
            <InfoItem>
              <GreyText>{'Date of birth'}</GreyText>
              <WhiteText>{`${birthDate}`}</WhiteText>
            </InfoItem>
            <InfoItem>
              <GreyText>{'Address'}</GreyText>
              <WhiteText>{`${profileInfo?.address}`}</WhiteText>
            </InfoItem>
          </>
        )}
      </InfoContainer>
      <ButtonWrapper>
        <ButtonItem
          theme={{backgroundColor: colors.white, textColor: 'black'}}
          isLoading={isLoading}
          handler={logOutButtonHandler}
          title={'Log out'}
        />
      </ButtonWrapper>
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
