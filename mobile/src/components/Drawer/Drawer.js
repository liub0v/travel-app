import React from 'react';
import drawerIcon from '../../../assets/images/drawerIcon.png';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
export const Drawer = ({handler}) => {
  return (
    <TouchableWithoutFeedback onPress={handler}>
      <View style={{marginLeft: 24}}>
        <Image style={{width: 24, height: 24}} source={drawerIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
};
