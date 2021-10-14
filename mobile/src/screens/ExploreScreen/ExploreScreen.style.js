import styled from 'styled-components/native';
import colors from '../../constants/colors';
export const MainContainer = styled.ScrollView``;

export const CategoriesContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  margin-top: 30px;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
`;
export const CategoryItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
export const CategoryTitle = styled.Text`
  color: ${colors.white};
  font-family: Montserrat;
  font-size: 12px;
`;
