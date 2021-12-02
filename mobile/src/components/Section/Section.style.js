import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export const SectionContainer = styled.View`
  width: 100%;
`;
export const SectionHeaderWrapper = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const SectionHeaderButton = styled.View`
  margin-right: 24px;
`;

export const SectionHeaderTitleWrapper = styled.View`
  background-color: ${colors.green};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
`;
export const SectionHeaderTitle = styled.Text`
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${colors.white};
  padding: 7px 16px 7px 24px;
`;
