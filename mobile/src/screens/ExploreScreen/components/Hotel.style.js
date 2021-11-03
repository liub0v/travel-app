import styled from 'styled-components/native/dist/styled-components.native.esm';

export const HotelItem = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 16px;
  margin-bottom: 20px;
`;
export const HotelImage = styled.Image`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 16px;
  height: 90px;
  width: 150px;
`;
export const HotelInfoWrapper = styled.View`
  flex: 1;
  background-color: #2f3546;
  flex-direction: column;
  padding-left: 18px;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
`;
export const HotelName = styled.Text`
  font-family: Montserrat;
  font-size: 12px;
  color: #ffffff;
`;
export const HotelStarsContainer = styled.View`
  flex-direction: row;
`;
export const HotelStar = styled.Image`
  margin-right: 5px;
`;
export const HotelPriceWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const HotelPrice = styled.Text`
  font-family: Montserrat;
  font-size: 16px;
  color: #ffffff;
`;
export const HotelPricePeriod = styled.Text`
  font-family: Montserrat;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
`;
