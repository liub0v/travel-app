import styled from 'styled-components/native/dist/styled-components.native.esm';
import fonts from '../../constants/fonts';
export const ButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 16px;
  height: ${props => props.height}px;
  width: ${props => props.width}%;
`;
export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
`;
export const ButtonText = styled.Text`
  font-family: ${fonts.normal};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
`;
