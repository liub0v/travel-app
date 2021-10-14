import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../constants/colors';

export const AdventureItem = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;
export const AdventureImage = styled.Image`
  border-radius: 16px;
  height: 250px;
  width: 150px;
`;
export const AdventureTitleWrapper = styled.View``;
export const AdventureName = styled.Text`
  width: 140px;
  font-family: Montserrat;
  font-size: 14px;
  color: ${colors.white};
`;
export const AdventureLocation = styled.Text`
  font-family: Montserrat;
  font-size: 12px;
  color: ${colors.white};
  opacity: 0.5;
`;
