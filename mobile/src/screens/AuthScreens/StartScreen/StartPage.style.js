import styled from 'styled-components/native';
import colors from '../../../constants/colors';

export const LogoContainer = styled.View`
  margin-top: 15%;
  flex-direction: column;
  align-items: center;
`;
export const Logo = styled.Image``;
export const LogoText = styled.Text`
  font-family: MontserratExtraBold;
  font-size: 28px;
  color: ${colors.white};
  padding: 5px;
`;
export const LogoDescription = styled.Text`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  color: ${colors.white};
`;
export const StartedContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
`;
export const LoginContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;
export const LoginText = styled.Text`
  font-weight: 500;
  font-family: Montserrat;
  font-size: 14px;
  color: ${colors.white};
`;
export const LoginButton = styled.Text`
  background-color: rgba(127, 255, 212, 0);
  padding: 10px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 12px;
  color: ${colors.blue};
`;
