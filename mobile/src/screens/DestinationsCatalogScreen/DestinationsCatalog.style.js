import styled from 'styled-components/native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
export const MainContainer = styled.View`
  flex: 1;
`;

export const SearchWrapper = styled.View`
  width: 100%;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 10px;
`;

export const ItemContainer = styled.View`
  margin: 10px;
`;
export const ImageWrapper = styled.View``;

export const TitleWrapper = styled.View`
  position: absolute;
  top: 10px;
  left: 5px;
`;
export const NormalText = styled.Text`
  font-family: ${fonts.normal};
  font-size: 28px;
  color: ${colors.white};
`;
export const BoldText = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${colors.white};
`;

export const FlatListWrapper = styled.View`
  flex: 1;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;
