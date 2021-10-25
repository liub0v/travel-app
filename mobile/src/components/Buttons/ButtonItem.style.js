import styled from 'styled-components/native/dist/styled-components.native.esm';
import fonts from '../../constants/fonts';
export const ButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 16px;
  height: 50px;
  width: 300px;
`;
export const ButtonContainer = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;
export const ButtonText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${props => props.color};
`;
