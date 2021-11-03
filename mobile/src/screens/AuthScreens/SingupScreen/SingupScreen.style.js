import {Platform} from 'react-native';
import styled from 'styled-components/native';

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
export const Next3 = styled.View``;
export const Next4 = styled.View``;
export const Next5 = styled.View``;
export const Next6 = styled.View``;
