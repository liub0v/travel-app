import styled from 'styled-components/native/dist/styled-components.native.esm';
import {Animated} from 'react-native';

export const Container = styled.ImageBackground`
  width: 100%;
  height: 430px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 60px;
`;
export const Wrapper = styled.View`
  width: 100%;
`;
export const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const PointContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const BookingButton = styled.View`
  background-color: #2d9cdb;
  width: 160px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;
export const BookingButtonTitle = styled.Text`
  font-family: Montserrat;
  font-size: 12px;
  color: white;
`;
export const Title = styled.Text`
  font-family: MontserratExtraBold;
  font-size: 28px;
  color: #ffffff;
`;
export const Description = styled.Text`
  font-family: Montserrat;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
`;
export const TextWrapper = styled.View`
  width: 80%;
  margin-bottom: 12px;
`;
export const IconWrapper = styled.View`
  margin-left: 24px;
  margin-right: 12px;
`;
export const SearchBarWrapper = styled(Animated.View)`
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;
export const SearchBarInput = styled.TextInput`
  font-family: Montserrat;
  font-size: 14px;
  color: rgba(3, 25, 37, 0.5);
  height: 40px;
  padding-left: 0px;
`;
