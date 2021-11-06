import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
export const CommentInputWrapper = styled.View``;
export const CommentInputContainer = styled.View``;
export const CommentTextInput = styled.TextInput`
  background-color: ${colors.white};
`;

export const CommentContainer = styled.View`
  padding-bottom: 24px;
`;
export const UserContainer = styled.View`
  flex-direction: row;
  padding: 24px;

  flex: 1;
`;
export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;
export const UserInfoWrapper = styled.View`
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
`;
export const UserFirstNameTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.white};
`;
export const DateTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
  padding-left: 12px;
`;
export const UserRatingTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 14px;
  color: ${colors.white};
  padding-right: 12px;
`;
