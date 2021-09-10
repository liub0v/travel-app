import styled from 'styled-components/native';
export const LoginContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;
export const LoginHeader = styled.Text`
  color: #ffffff;
  font-size: 28px;
  line-height: 34px;
  font-family: MontserratExtraBold;
  margin-top: 10%;
`;
export const AccountLoginWrapper = styled.View`
  margin-top: 5%;
  flex-direction: row;
  width: 100%;
  height: 10%;
  padding-right: 5%;
  padding-left: 5%;
  margin-bottom: 10%;
`;

export const TwitterView = styled.View`
  margin: 2%;
  flex: 1;
  background: #3b5998;
  border-radius: 16px;
`;
export const FacebookView = styled.View`
  margin: 2%;
  flex: 1;
  background: #55acee;
  border-radius: 16px;
`;
export const ThinkText = styled.Text`
  font-family: Montserrat;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;
export const EmailInput = styled.TextInput`
  background-color: #ffffff;
  border-radius: 16px;
  height: 50px;
  width: 300px;
  font-family: Montserrat;
  font-size: 16px;
  line-height: 20px;
  color: rgba(3, 25, 37, 0.5);
  padding-left: 5%;
`;
export const PasswordInput = styled.TextInput`
  background-color: #ffffff;
  border-radius: 16px;
  height: 50px;
  width: 300px;
  font-family: Montserrat;
  font-size: 16px;
  line-height: 20px;
  color: rgba(3, 25, 37, 0.5);
  padding-left: 5%;
`;
export const NormalText = styled.Text`
  font-family: Montserrat;
  font-size: 14px;
  color: #ffffff;
`;
export const ViewWrapper = styled.View`
  align-items: stretch;
  margin-top: 10%;
  flex: 4;
  justify-content: space-around;
`;
export const ViewButtomWrapper = styled.View`
  align-items: stretch;
  margin-top: 35%;
  flex: 2;
`;
export const LeftPosition = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
export const CenterPosition = styled.View`
  flex-direction: row;
  justify-content: center;
`;
