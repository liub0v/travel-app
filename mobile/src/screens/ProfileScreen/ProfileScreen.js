import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logOutIsLoadingSelector} from '../../../redux/selectors/userSelector';
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
export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(logOutIsLoadingSelector);
  console.log('isLoading', isLoading);
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <MainInfo>
        <Avatar source={avatar} />
        <BoldWhiteText>{'Tanya Edwards'}</BoldWhiteText>
        <GreyText>{'San Francisco, CA'}</GreyText>
      </MainInfo>
      <InfoContainer>
        <InfoItem>
          <GreyText>{'Username'}</GreyText>
          <WhiteText>{'MariotaJin'}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Email'}</GreyText>
          <WhiteText>{'tanya.edwards@gmail.com'}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Phone'}</GreyText>
          <WhiteText>{'(239) 555-0108'}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Date of birth'}</GreyText>
          <WhiteText>{'March 27, 1989'}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Address'}</GreyText>
          <WhiteText>{'6391 Elgin St Celina, Delaware'}</WhiteText>
        </InfoItem>
      </InfoContainer>
      <ButtonWrapper>
        <ButtonItem
          theme={{backgroundColor: 'white', textColor: 'black'}}
          isLoading={isLoading}
          handler={logOutButtonHandler}
          title={'Log out'}
        />
      </ButtonWrapper>
    </Container>
  );
};
