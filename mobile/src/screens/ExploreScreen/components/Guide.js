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
import {
  getGuideInfoSelector,
  getGuideProfileInfoSelector,
} from '../../../../redux/selectors/GuideSelectors';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const Guide = ({item, handler = undefined}) => {
  const navigation = useNavigation();
  const guideProfileInfoSelector = getGuideProfileInfoSelector(
    item?.userID?._id,
  );
  const guideInfoSelector = getGuideInfoSelector(item?.userID?._id);

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
