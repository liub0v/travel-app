import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {
  logOutIsLoadingSelector,
  profileInfoSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {logOutUser} from '../../../redux/actions/AuthActions';

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

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(logOutIsLoadingSelector);
  const user = useSelector(userSelector);
  const profileInfo = useSelector(profileInfoSelector);

  let birthDate = dateParser(profileInfo?.birthDate);

  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <MainInfo>
        <Avatar source={{uri: profileInfo?.imageURL}} />
        <BoldWhiteText>
          {`${profileInfo?.firstName} ${profileInfo?.lastName}`}
        </BoldWhiteText>
        <GreyText>{`${profileInfo?.address}`}</GreyText>
      </MainInfo>
      <InfoContainer>
        <InfoItem>
          <GreyText>{'Username'}</GreyText>
          <WhiteText>{`${user?.username}`}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Email'}</GreyText>
          <WhiteText>{`${user?.email}`}</WhiteText>
        </InfoItem>
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
      </InfoContainer>
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
