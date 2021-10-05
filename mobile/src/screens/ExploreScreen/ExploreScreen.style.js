import styled from 'styled-components/native';
export const MainContainer = styled.ScrollView``;
export const MainImage = styled.Image`
  width: 100%;
`;
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
export const CategoryWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
export const CategoryTitle = styled.Text`
  color: white;
  font-family: Montserrat;
  font-size: 12px;
`;
export const DestinationsContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 10px;
`;
export const CategoryHeaderWrapper = styled.View`
  align-self: flex-start;
  background-color: #219653;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
`;
export const CategoryHeader = styled.Text`
  font-family: Montserrat;
  font-size: 16px;
  color: white;
  padding: 7px 16px 7px 24px;
`;

export const DestinationItemsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;
export const DestinationItem = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;
export const DestinationItemImage = styled.Image`
  border-radius: 16px;
  height: 130px;
  width: 200px;
`;
export const DestinationItemTitleWrapper = styled.View`
  position: absolute;
  left: 10px;
  bottom: 10px;
  background: #ffffff;
  border-radius: 8px;
`;
export const DestinationItemTitle = styled.Text`
  padding: 5px 20px 5px 15px;
  font-family: Montserrat;
  font-size: 12px;
  color: #031925;
`;
export const AdventuresContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 10px;
`;
export const AdventuresItemsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;
export const AdventuresItem = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;
export const AdventuresItemImage = styled.Image`
  border-radius: 16px;
  height: 250px;
  width: 150px;
`;
export const AdventuresItemTitleWrapper = styled.View``;
export const AdventuresItemName = styled.Text`
  width: 140px;
  font-family: Montserrat;
  font-size: 14px;
  color: #ffffff;
`;
export const AdventuresItemLocation = styled.Text`
  font-family: Montserrat;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5); ;
`;
export const HotelsContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 10px;
`;
