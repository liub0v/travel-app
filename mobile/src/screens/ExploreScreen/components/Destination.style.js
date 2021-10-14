import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../constants/colors';

export const DestinationItem = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;
export const DestinationImage = styled.Image`
  border-radius: 16px;
  height: 130px;
  width: 200px;
`;
export const DestinationTitleWrapper = styled.View`
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: ${colors.white};
  border-radius: 8px;
`;
export const DestinationTitle = styled.Text`
  padding: 5px 20px 5px 15px;
  font-family: Montserrat;
  font-size: 12px;
  color: ${colors.screenBackground};
`;
