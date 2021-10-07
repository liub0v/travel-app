import React from 'react';
import {
  BottomInfoLine,
  DialogAvatar,
  DialogInfo,
  DialogItem,
  Message,
  MessageNumber,
  MessageNumberContainer,
  MessageNumberWrapper,
  MessageTime,
  TopInfoLine,
  UserName,
} from './Dialog.style';
import {
  getValidationStyles,
  logInValidationSchema,
} from '../../../services/validation';
import {
  InputItem,
  LeftPosition,
  NormalText,
} from '../../AuthScreens/LoginScreen/LoginScreen.style';
import {Text} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';

export const Dialog = ({item}) => {
  return (
    <DialogItem>
      <DialogAvatar source={item.image} />
      <DialogInfo>
        <TopInfoLine>
          <UserName>{item.name}</UserName>
          <MessageTime>{item.messageTime}</MessageTime>
        </TopInfoLine>
        <BottomInfoLine>
          <Message>{item.message}</Message>

          <MessageNumberWrapper>
            <MessageNumber>{item.messageNumber}</MessageNumber>
          </MessageNumberWrapper>
        </BottomInfoLine>
      </DialogInfo>
    </DialogItem>
  );
};
