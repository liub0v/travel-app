import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';

export const Container = styled.ScrollView``;

export const MainInfo = styled.View`
  align-items: center;
`;
export const Avatar = styled.Image`
  width: 125px;
  height: 125px;
  border-radius: 67.5px;
  margin-bottom: 16px;
  margin-top: 24px;
`;
export const BoldWhiteText = styled.Text`
  font-family: MontserratExtraBold;
  color: ${colors.white};
  font-size: 16px;
  margin-bottom: 4px;
`;
export const GreyText = styled.Text`
  font-size: 14px;
  font-family: Montserrat;
  color: ${colors.white};
  opacity: 0.5;
`;
export const WhiteText = styled.Text`
  font-size: 14px;
  font-family: Montserrat;
  color: ${colors.white};
`;
export const InfoContainer = styled.View`
  margin-top: 16px;
`;
export const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  padding-bottom: 22px;
  padding-top: 22px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
`;
