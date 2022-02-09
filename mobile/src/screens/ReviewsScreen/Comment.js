import React, {useMemo} from 'react';
import {
  CommentContainer,
  CommentTextWrapper,
  DateTitle,
  UserAvatar,
  UserContainer,
  UserFirstNameTitle,
  UserInfoContainer,
  UserInfoFirstLineWrapper,
  UserInfoWrapper,
  UserRatingTitle,
} from './CommentInput.style';
import {DEFAULT_PROFILE_IMAGE} from '../../constants/api';
import {dateParser} from '../../services/dataParser';
import {Stars as Rating} from '../../components/Stars/Stars';
import {DynamicText} from '../AdventureScreen/AdventureScreen';

export const Comment = ({item}) => {
  const date = new Date(item?.date);

  const nameTitle = useMemo(() => {
    const firstName = item?.clientID?.profileInfo?.firstName ?? '';
    const lastName = item?.clientID?.profileInfo?.lastName ?? '';
    const name = `${firstName} ${lastName}`;
    return name.trim() || item?.clientID?.userID?.username || 'Anonymous';
  }, [item]);
  return (
    <CommentContainer>
      <UserContainer style={{flexDirection: 'row', flex: 1}}>
        {item?.clientID?.profileInfo?.imageURL ? (
          <UserAvatar source={{uri: item?.clientID?.profileInfo?.imageURL}} />
        ) : (
          <UserAvatar source={DEFAULT_PROFILE_IMAGE} />
        )}
        <UserInfoContainer style={{justifyContent: 'space-between', flex: 1}}>
          <UserInfoFirstLineWrapper
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <UserFirstNameTitle>{nameTitle}</UserFirstNameTitle>
            <DateTitle>{dateParser(date)}</DateTitle>
          </UserInfoFirstLineWrapper>
          <UserInfoWrapper>
            <UserRatingTitle>{item?.rating?.generalRating}</UserRatingTitle>
            <Rating starsNumber={item?.rating?.starsNumber} />
          </UserInfoWrapper>
        </UserInfoContainer>
      </UserContainer>
      <CommentTextWrapper>
        <DynamicText text={item?.comment} lineNumber={3} />
      </CommentTextWrapper>
    </CommentContainer>
  );
};
