import React from 'react';

import {
  BottomInfoLine,
  DialogAvatar,
  DialogInfo,
  DialogItem,
  Message,
  TopInfoLine,
  UserName,
} from './Guide.style';

import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DEFAULT_PROFILE_IMAGE} from '../../../constants/api';

export const Guide = ({item, handler = undefined}) => {
  const navigation = useNavigation();

  const goGuideProfile = () => {
    navigation.navigate('GuideScreen', {guideID: item._id});
  };
  const pressHandler = () => {
    if (handler) {
      handler(item);
    } else {
      goGuideProfile();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <DialogItem style={{flex: 1, flexDirection: 'row'}}>
        {item?.profileInfo?.imageURL ? (
          <DialogAvatar source={{uri: item?.profileInfo?.imageURL}} />
        ) : (
          <DialogAvatar source={DEFAULT_PROFILE_IMAGE} />
        )}

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
