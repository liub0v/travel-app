import React from 'react';
import {View} from 'react-native';
import {Avatar, GreyText} from '../ProfileScreen/Profile.style';
import {BoldText} from '../HotelScreen/HotelScreen.style';
import reloadIcon from '../../../assets/images/reload.png';

export const ErrorComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <Avatar
        style={{width: 140, height: 165, marginBottom: 24}}
        source={reloadIcon}
      />
      <BoldText>Ooops....</BoldText>
      <GreyText style={{textAlign: 'center', width: '80%', marginTop: 24}}>
        Something went wrong. We're doing everything to fix it and should be up
        and running soon
      </GreyText>
    </View>
  );
};
