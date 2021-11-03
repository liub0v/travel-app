import React from 'react';

import {
  BottomInfoLine,
  DialogAvatar,
  DialogInfo,
  DialogItem,
  Message,
  MessageNumber,
  MessageNumberWrapper,
  MessageTime,
  TopInfoLine,
  UserName,
} from './Dialog.style';

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
