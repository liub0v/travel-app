import styled from 'styled-components/native/dist/styled-components.native.esm';

export const ButtonStart = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 16px;
  height: 50px;
  width: 300px;
`;
export const ButtonWrapper = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;
export const ButtonText = styled.Text`
  font-family: Montserrat;
  font-size: 16px;
  color: ${props => props.color};
`;
