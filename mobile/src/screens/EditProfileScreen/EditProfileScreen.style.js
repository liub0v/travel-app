import styled from 'styled-components/native/dist/styled-components.native.esm';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

export const WhiteText = styled.TextInput`
  font-size: 14px;
  font-family: ${fonts.normal};
  color: ${colors.white};
  padding-top: 12px;
  padding-bottom: 12px;
`;
export const InfoItem = styled.View`
  flex-direction: column;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  margin-top: 12px;
  margin-right: 12px;
  margin-left: 12px;
`;
export const ButtonWrapper = styled.View`
  margin-top: 24px;
  margin-bottom: 24px;
`;
export const BoldWhiteText = styled.TextInput`
  font-family: ${fonts.bold};
  color: ${colors.white};
  font-size: 16px;
  margin-bottom: 4px;
  width: auto;
  min-width: 130px;
  text-align: center;
`;
