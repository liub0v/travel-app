import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../constants/colors';

export const TitleWrapper = styled.View`
  margin-bottom: 48px;
  background-color: ${colors.green};
  color: ${colors.green};
  align-items: center;
  padding: 6px;
`;

export const Container = styled.ScrollView`
  flex: 1;
  margin-top: 24px;
`;
export const CommentsContainer = styled.View`
  margin-top: 50px;
`;
