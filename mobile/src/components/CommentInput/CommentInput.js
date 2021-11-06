import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Section} from '../Section/Section';
import {DynamicText} from '../../screens/AdventureScreen/AdventureScreen';
import {dateParser} from '../../services/dataParser';
import {Stars} from '../Stars/Stars';
import {ButtonItem} from '../Buttons/ButtonItem';
import colors from '../../constants/colors';
import {
  CommentContainer,
  DateTitle,
  UserAvatar,
  UserContainer,
  UserFirstNameTitle,
  UserInfoContainer,
  UserInfoWrapper,
  UserRatingTitle,
  CommentInputContainer,
  CommentInputWrapper,
  CommentTextInput,
} from './CommentInput.style';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors/UserSelector';

export const Comment = ({item}) => {
  const date = new Date(item?.date);

  return (
    <CommentContainer>
      <UserContainer>
        <UserAvatar source={{uri: item.clientID?.profileInfo?.imageURL}} />
        <UserInfoContainer>
          <UserInfoWrapper>
            <UserFirstNameTitle>{`${item.clientID?.profileInfo?.firstName} ${item.clientID?.profileInfo?.lastName}`}</UserFirstNameTitle>
            <DateTitle>{dateParser(date)}</DateTitle>
          </UserInfoWrapper>
          <UserInfoWrapper>
            <UserRatingTitle>{item?.rating?.generalRating}</UserRatingTitle>
            <Stars starsNumber={item?.rating?.starsNumber} />
          </UserInfoWrapper>
        </UserInfoContainer>
      </UserContainer>
      <DynamicText text={item?.comment} lineNumber={3} />
    </CommentContainer>
  );
};
export const CommentInput = ({comments}) => {
  const [commentText, setCommentText] = useState('');
  const user = useSelector(userSelector);
  return (
    <CommentInputContainer>
      <Section
        title={`Reviews (${comments.length})`}
        showRightButton={true}
        data={comments}
        renderItem={({item}) => <Comment item={item} />}
      />
      <CommentInputWrapper>
        <UserAvatar source={{uri: user?.profileInfo?.imageURL}} />
        <UserFirstNameTitle>{`${user?.profileInfo?.firstName} ${user?.profileInfo?.lastName}`}</UserFirstNameTitle>
        <CommentTextInput
          placeholderTextColor={colors.gray}
          placeholder={'Type a comment...'}
          value={commentText}
          onChangeText={text => {
            setCommentText(text);
          }}
        />
      </CommentInputWrapper>

      <ButtonItem
        title={'Send'}
        titleSize={12}
        size={{height: 40, width: 20}}
        handler={() => {
          console.log(commentText);
          setCommentText(' ');
        }}
      />
    </CommentInputContainer>
  );
};
