import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  logOutIsLoadingSelector,
  profileInfoSelector,
  userSelector,
} from '../../../redux/selectors/UserSelector';
import {logOutUser} from '../../../redux/actions/AuthActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
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
import avatar from '../../../assets/images/avatar.png';
import colors from '../../constants/colors';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(logOutIsLoadingSelector);
  const user = useSelector(userSelector);
  const profileInfo = useSelector(profileInfoSelector);
  console.log(user);
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <MainInfo>
        <Avatar source={{avatar}} />
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
          <WhiteText>{`${profileInfo?.birthDate}`}</WhiteText>
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
