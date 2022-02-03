import {
  Avatar,
  BoldWhiteText,
  GreyText,
  InfoContainer,
  InfoItem,
  MainInfo,
  WhiteText,
} from '../../screens/ProfileScreen/Profile.style';
import React, {useMemo} from 'react';
import {dateParser} from '../../services/dataParser';
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';
import {AvatarWrapper} from '../../screens/EditProfileScreen/EditProfileScreen.style';
import {AnimatedImage} from '../Loaders/AnimatedImage';
import {ProfileFormWrapper, ProfileInfoWrapper} from './ProfileInfo.style';

export const ProfileForm = ({profileInfo, userInfo, isLoading}) => {
  let birthDate = dateParser(profileInfo?.birthDate);

  const nameTitle = useMemo(() => {
    const firstName = profileInfo?.firstName ?? '';
    const lastName = profileInfo?.lastName ?? '';
    const name = `${firstName} ${lastName}`;
    return name.trim() || userInfo?.username || 'Anonymous';
  }, [profileInfo, userInfo]);

  return (
    <>
      {!isLoading && (
        <ProfileFormWrapper>
          <MainInfo>
            <AvatarWrapper>
              {profileInfo?.imageURL ? (
                <AnimatedImage
                  imageStyle={{width: 125, height: 125, borderRadius: 67.5}}
                  viewStyle={{borderRadius: 67.5}}
                  imageURL={profileInfo?.imageURL}
                />
              ) : (
                <Avatar source={DEFAULT_PROFILE_IMAGE} />
              )}
            </AvatarWrapper>

            {profileInfo ? (
              <>
                <BoldWhiteText>{nameTitle}</BoldWhiteText>
                {profileInfo?.address && (
                  <GreyText>{`${profileInfo?.address}`}</GreyText>
                )}
              </>
            ) : (
              <BoldWhiteText>{`${userInfo?.username}`}</BoldWhiteText>
            )}
          </MainInfo>
          <InfoContainer>
            {userInfo?.username && (
              <InfoItem testID={'username'}>
                <GreyText>{'Username'}</GreyText>
                <WhiteText>{`${userInfo?.username}`}</WhiteText>
              </InfoItem>
            )}
            {userInfo?.email && (
              <InfoItem testID={'email'}>
                <GreyText>{'Email'}</GreyText>
                <WhiteText>{`${userInfo?.email}`}</WhiteText>
              </InfoItem>
            )}
            {profileInfo && (
              <ProfileInfoWrapper>
                {profileInfo?.phone && (
                  <InfoItem testID={'phone'}>
                    <GreyText>{'Phone'}</GreyText>
                    <WhiteText>{`${profileInfo?.phone}`}</WhiteText>
                  </InfoItem>
                )}
                {profileInfo?.birthDate && (
                  <InfoItem testID={'birthDate'}>
                    <GreyText>{'Date of birth'}</GreyText>
                    <WhiteText>{`${birthDate}`}</WhiteText>
                  </InfoItem>
                )}
                {profileInfo?.address && (
                  <InfoItem testID={'address'}>
                    <GreyText>{'Address'}</GreyText>
                    <WhiteText>{`${profileInfo?.address}`}</WhiteText>
                  </InfoItem>
                )}
              </ProfileInfoWrapper>
            )}
          </InfoContainer>
        </ProfileFormWrapper>
      )}
    </>
  );
};
