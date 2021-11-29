import {
  Avatar,
  BoldWhiteText,
  GreyText,
  InfoContainer,
  InfoItem,
  MainInfo,
  WhiteText,
} from '../../screens/ProfileScreen/Profile.style';
import React from 'react';
import {dateParser} from '../../services/dataParser';

export const ProfileForm = ({profileInfo, userInfo}) => {
  let birthDate = dateParser(profileInfo?.birthDate);
  return (
    <>
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
          <BoldWhiteText>{`${userInfo?.username}`}</BoldWhiteText>
        )}
      </MainInfo>
      <InfoContainer>
        <InfoItem>
          <GreyText>{'Username'}</GreyText>
          <WhiteText>{`${userInfo?.username}`}</WhiteText>
        </InfoItem>
        <InfoItem>
          <GreyText>{'Email'}</GreyText>
          <WhiteText>{`${userInfo?.email}`}</WhiteText>
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
    </>
  );
};
