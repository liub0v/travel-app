import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
export const CommentInputWrapper = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;
export const CommentInputContainer = styled.ScrollView`
  flex: 1;
  height: 400px;
`;
export const CriterionRatingContainer = styled.View`
  flex: 1;
  margin-top: 24px;
`;
export const StarsRatingContainer = styled.View`
  flex: 1;
  margin-top: 24px;
`;
export const CriterionRatingWrapper = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
`;
export const CommentTextInput = styled.TextInput`
  background-color: ${colors.white};
  color: ${colors.blue};
  font-family: ${fonts.normal};
  font-size: 14px;
  border-radius: 16px;
  margin-top: 12px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const CommentContainer = styled.View``;
export const UserContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: row;
  flex: 1;
`;
export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
export const ButtonWrapper = styled.View`
  align-self: flex-end;
  margin-top: 24px;
  width: 30%;
`;
export const UserInfoContainer = styled.View``;
export const UserInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  padding-top: 24px;
`;
export const UserInfoFirstLineWrapper = styled.View``;
export const CommentTextWrapper = styled.View`
  margin-top: -12px;
  padding-left: 48px;
`;
export const UserFirstNameTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.white};
  padding-left: 12px;
`;
export const RatingValueTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 14px;
  color: ${colors.white};
  padding-left: 12px;
`;
export const CriterionTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
  padding-left: 12px;
`;
export const StarsRatingTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 14px;
  color: ${colors.white};
  padding-left: 12px;
`;
export const StarsTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.grey};
  padding-left: 12px;
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
  padding-left: 12px;
  padding-right: 12px;
`;
export const StarItem = styled.Image`
  width: 32px;
  height: 32px;
`;
export const StarsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-right: 24px;
  padding-left: 24px;
  margin-bottom: 24px;
`;
