import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const OnboardingBackground = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: rgba(26, 79, 226, 0);
  margin-top: 10%;
`;
export const TextHeader = styled.Text`
  padding-left: 15%;
  padding-right: 15%;
  text-align: center;
  color: #ffffff;
  font-style: normal;
  font-size: 28px;
  line-height: 34px;
  font-family: MontserratExtraBold;
  background-color: rgba(2, 3, 3, 0);
`;
export const TextDescription = styled.Text`
  padding: ${Platform.OS === 'android' ? 5 : 15}% ;
  font-style: normal;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.5);
  font-family: Montserrat;
`;

export const Images = styled.View`
  background-color: rgba(255, 0, 0, 0);
  margin-top: 15%;
  flex-direction: row;
  border-radius: 16px;
  justify-content: space-between;
`;
export const ImageItem1 = styled.Image`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 16px;
  border-top-left-radius: 0px;
  border-top-right-radius: 16px;
`;
export const ImageItem2 = styled.Image`
  border-radius: 16px;
`;

export const ImageItem3 = styled.Image`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 16px;
  border-top-right-radius: 0px;
`;
export const Point = styled.View`
  width: 10px;
  height: 10px;
  background: ${props => (props.active ? '#219653' : '#ffffff')};
  opacity: ${props => (props.active ? 1 : 0.5)};
  border-radius: 10px;
  margin: 3px;
`;
export const Pagination = styled.View`
  margin-top: 10%;
  flex-direction: row;
`;
export const PointsView = styled.View`
  margin-left: 20px;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  margin-bottom: 10%;
`;
export const Arrow = styled.Image`
  margin-right: 20px;
`;
export const ImageView = styled.Image`
  margin-top: 25%;
  width: 100%;
`;
export const ViewContainer = styled.View`
  margin-top: 5%;
  justify-content: space-around;
  flex: 1;
  flex-direction: column;
`;
export const ViewWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const ViewItem = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex: 1;
  background-color: blue;
  border-radius: 16px;
`;
export const ButtonStart = styled.Button`
  
`;
export const Next5 = styled.View``;
export const Next6 = styled.View``;
