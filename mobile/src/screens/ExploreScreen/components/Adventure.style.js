import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export const AdventureItem = styled.View`
  margin-top: 24px;
  padding-right: 12px;
  padding-left: 12px;
`;
export const AdventureImage = styled.Image`
  border-radius: 16px;
  height: 250px;
  width: 150px;
`;
export const AdventureTitleWrapper = styled.View``;
export const AdventureName = styled.Text`
  width: 140px;
  font-family: ${fonts.normal};
  font-size: 14px;
  color: ${colors.white};
`;
export const AdventureLocation = styled.Text`
  width: 140px;
  font-family: ${fonts.normal};
  font-size: 12px;
  color: ${colors.white};
  opacity: 0.5;
`;
