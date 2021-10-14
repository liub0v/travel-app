import styled from 'styled-components/native';
import {Platform} from 'react-native';
export const SingupContainer = styled.View`
  align-items: center;
  flex: 1;
`;
export const LoginWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  flex: 2;
  padding-top: ${Platform.OS === 'android' ? 10 : 0}%;
`;
