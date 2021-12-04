import styled from 'styled-components/native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export const AdventureWrapper = styled.View`
  height: 250px;
  width: 100%;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: row;
`;

export const GuideContainer = styled.View`
  flex-direction: row;
`;
export const GuideImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;
export const GuideTitleWrapper = styled.View`
  padding-left: 12px;
`;
export const GuideTitle = styled.Text`
  font-family: ${fonts.bold};
  color: ${colors.white};
  font-size: 16px;
`;
export const GuideName = styled.Text`
  font-family: ${fonts.normal};
  color: ${colors.white};
  font-size: 16px;
`;
