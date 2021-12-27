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
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';
import {AvatarWrapper} from '../../screens/EditProfileScreen/EditProfileScreen.style';
import {AnimatedImage} from '../Loaders/AnimatedImage';

export const ProfileForm = ({profileInfo, userInfo, isLoading}) => {
  let birthDate = dateParser(profileInfo?.birthDate);

  return (
    <>
      {!isLoading && (
        <>
          <MainInfo>
            <AvatarWrapper>
              {profileInfo?.imageURL ? (
                <AnimatedImage
                  imageStyle={{width: 125, height: 125, borderRadius: 67.5}}
                  viewStyle={{borderRadius: 67.5}}
                  imageURL={profileInfo?.imageURL}
                />
              ) : (
                // <Avatar source={{uri: profileInfo?.imageURL}} />
                <Avatar source={DEFAULT_PROFILE_IMAGE} />
              )}
            </AvatarWrapper>

            {profileInfo ? (
              <>
                <BoldWhiteText>
                  {`${profileInfo?.firstName} ${profileInfo?.lastName}`}
                </BoldWhiteText>
                {profileInfo?.address && (
                  <GreyText>{`${profileInfo?.address}`}</GreyText>
                )}
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
                {profileInfo?.phone && (
                  <InfoItem>
                    <GreyText>{'Phone'}</GreyText>
                    <WhiteText>{`${profileInfo?.phone}`}</WhiteText>
                  </InfoItem>
                )}
                {profileInfo?.birthDate && (
                  <InfoItem>
                    <GreyText>{'Date of birth'}</GreyText>
                    <WhiteText>{`${birthDate}`}</WhiteText>
                  </InfoItem>
                )}
                {profileInfo?.address && (
                  <InfoItem>
                    <GreyText>{'Address'}</GreyText>
                    <WhiteText>{`${profileInfo?.address}`}</WhiteText>
                  </InfoItem>
                )}
              </>
            )}
          </InfoContainer>
        </>
      )}
    </>
  );
};
