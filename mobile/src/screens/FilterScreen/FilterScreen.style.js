import styled from 'styled-components/native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export const MainContainer = styled.View`
  flex: 1;
  padding-left: 12px;
  padding-right: 12px;
  justify-content: space-between;
`;
export const SectionsWrapper = styled.View`
  width: 100%;
`;
export const SectionContainer = styled.View`
  width: 100%;
  border-bottom-color: ${colors.grey};
  border-bottom-width: 0.5px;
  margin-top: 24px;
  padding-bottom: 24px;
  padding-left: 12px;
  padding-right: 12px;
`;
export const SectionTitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.normal};
  color: ${colors.grey};
  padding: 12px;
`;
export const RowWrapper = styled.View`
  flex-direction: row;
`;
export const SectionWhiteText = styled.Text`
  font-size: 14px;
  font-family: ${fonts.normal};
  color: ${colors.white};
  padding-left: 12px;
`;
export const SectionGreenText = styled.Text`
  font-size: 14px;
  font-family: ${fonts.normal};
  color: ${colors.green};
`;

export const ButtonWrapper = styled.View`
  margin-bottom: 24px;
`;

export const SliderContainer = styled.View`
  align-items: center;
  margin-top: 12px;
`;
export const SliderWrapper = styled.View`
  width: 100%;
  justify-content: center;
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

export const LabelText = styled.Text`
  font-size: 14px;
`;
