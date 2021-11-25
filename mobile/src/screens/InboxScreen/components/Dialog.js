import React from 'react';

import {
  BottomInfoLine,
  DialogAvatar,
  DialogInfo,
  DialogItem,
  Message,
  TopInfoLine,
  UserName,
} from './Dialog.style';

import {TouchableWithoutFeedback} from 'react-native';

export const Dialog = ({item, handler = () => {}}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handler(item)}>
      <DialogItem>
        <DialogAvatar source={{uri: item?.profileInfo?.imageURL}} />
        <DialogInfo>
          <TopInfoLine>
            <UserName>{`${item?.profileInfo?.firstName} ${item?.profileInfo?.lastName}`}</UserName>
          </TopInfoLine>
          <BottomInfoLine>
            <Message>{item?.profileInfo?.address}</Message>
          </BottomInfoLine>
        </DialogInfo>
      </DialogItem>
    </TouchableWithoutFeedback>
  );
};
