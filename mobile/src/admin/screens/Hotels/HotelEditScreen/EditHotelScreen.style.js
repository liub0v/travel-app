import styled from 'styled-components/native/dist/styled-components.native.esm';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${fonts.normal};
  color: ${colors.grey};
  margin-top: 12px;
  margin-bottom: 12px;
`;
export const CheckBoxTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.normal};
  color: ${colors.white};
`;
export const NameInput = styled.TextInput`
  height: 50px;
  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.grey};
  font-family: ${fonts.bold};
  font-size: 24px;
  color: ${colors.white};
`;
export const SummaryInput = styled.TextInput`
  height: 200px;
  width: 100%;
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${colors.white};
`;
export const PriceInput = styled.TextInput`
  background-color: ${colors.white};
  border-radius: 16px;
  height: 50px;
  width: 25%;
  font-family: ${fonts.normal};
  font-size: 16px;
  line-height: 20px;
  color: rgba(3, 25, 37, 0.5);
  text-align: center;
`;
export const AddressInput = styled.TextInput`
  height: 50px;
  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.grey};
  font-family: ${fonts.normal};
  font-size: 24px;
  color: ${colors.white};
`;
export const CheckBoxWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
  align-items: center;
`;
export const CheckBoxWrapperChild = styled.View`
  flex-direction: column;
`;
export const CheckBoxContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const InputWrapper = styled.View`
  width: 90%;
`;

export const Container = styled.ScrollView`
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
`;
export const ButtonWrapper = styled.View`
  margin-bottom: 48px;
  width: 100%;
`;
