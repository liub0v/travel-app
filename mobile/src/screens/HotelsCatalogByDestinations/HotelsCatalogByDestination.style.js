import styled from 'styled-components/native/dist/styled-components.native.esm';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

export const MainContainer = styled.View`
  flex: 1;
`;
export const ItemContainer = styled.View`
  width: 100%;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: row;
`;
export const ImageItem = styled.Image`
  height: 165px;
  width: 165px;
`;
export const InfoContainer = styled.View`
  padding-left: 24px;
  flex: 1;
  justify-content: space-between;
`;
export const NormalText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 20px;
  color: ${colors.white};
`;
export const BoldText = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${colors.white};
`;
export const GreenText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 12px;
  color: ${colors.green};
`;
export const ButtonWrapper = styled.View``;
export const SearchWrapper = styled.View`
  width: 100%;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 10px;
`;

export const FlatListWrapper = styled.View`
  margin-top: 20px;
  flex: 1;
  flex-direction: column;
`;
