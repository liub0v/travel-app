import styled from 'styled-components/native';

export const OnboardingBackground = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(26, 79, 226, 0);
  margin-top: 10%;
`;
export const TextHeader = styled.Text`
  padding: 15%;
  text-align: center;
  color: #ffffff;
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  font-family: Montserrat;
`;
export const TextDescription = styled.Text`
  padding: 15%;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.5);
  font-family: Montserrat;
`;

export const Images = styled.View`
  background-color: rgba(255, 0, 0, 0);

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
  background: #219653;
  border-radius: 10px;
  margin: 3px;
`;
export const Pagination = styled.View`
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  flex: 3;
`;
export const Arrow = styled.Image`
  margin-left: 50px;
`;
export const Next = styled.View``;
