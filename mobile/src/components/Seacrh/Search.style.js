import styled from 'styled-components/native';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

export const SearchBarInput = styled.TextInput`
  font-family: ${fonts.normal};
  font-size: 14px;
  color: rgba(3, 25, 37, 0.5);
  height: 40px;
  padding-left: 15%;
`;

export const SearchBarWrapper = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 16px;
`;
export const SearchBarIcon = styled.Image`
  position: absolute;
  top: 11px;
  left: 5%;
`;
