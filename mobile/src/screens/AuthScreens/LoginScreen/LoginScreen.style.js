import styled from 'styled-components/native';
import colors from '../../../constants/colors';
export const LoginContainer = styled.ScrollView`
  flex: 1;
`;
export const HeaderWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const HeaderText = styled.Text`
  color: ${colors.white};
  font-size: 28px;
  font-family: MontserratExtraBold;
`;
export const SocialNetworksLoginContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
export const FieldsContainer = styled.View`
  flex: 4;
`;
export const SingupWrapper = styled.View`
  flex: 2;
`;
export const SocialNetworkWrapper = styled.View`
  flex: 1;
  background: #3b5998;
  border-radius: 16px;
  height: 50px;
  max-width: 144px;
  margin: 6px;
`;

export const ThinkText = styled.Text`
  font-family: Montserrat;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;
export const InputItem = styled.TextInput`
  background-color: ${colors.white};
  border-radius: 16px;
  height: 50px;
  width: 300px;
  font-family: Montserrat;
  font-size: 16px;
  line-height: 20px;
  color: rgba(3, 25, 37, 0.5);
  padding-left: 5%;
  margin-bottom: 2%;
  margin-top: 5%;
`;

export const NormalText = styled.Text`
  font-family: Montserrat;
  font-size: 14px;
  color: ${colors.white};
`;

export const LeftPosition = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
export const CenterPosition = styled.View`
  flex-direction: row;
  justify-content: center;
`;
