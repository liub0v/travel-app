import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../constants/colors';

export const DialogItem = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 20px;
`;
export const DialogAvatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;
export const DialogInfo = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 8px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
`;
export const TopInfoLine = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const BottomInfoLine = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 15px;
`;

export const MessageNumberWrapper = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${colors.green};
  justify-content: center;
  align-items: center;
`;
export const MessageTime = styled.Text`
  font-family: Montserrat;
  font-size: 16px;
  color: ${colors.white};
  opacity: 0.5;
`;
export const MessageNumber = styled.Text`
  font-family: Montserrat;
  font-size: 10px;
  color: ${colors.white};
`;
export const UserName = styled.Text`
  font-family: MontserratExtraBold;
  font-size: 16px;
  color: ${colors.white};
`;
export const Message = styled.Text`
  font-family: Montserrat;
  font-size: 14px;
  color: ${colors.white};
  opacity: 0.5;
  width: 90%;
`;
