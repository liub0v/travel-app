import React from 'react';
import {View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import colors from '../../constants/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ErrorComponent} from './ErrorComponent';
import {ButtonWrapper} from '../ProfileScreen/Profile.style';
import {useDispatch} from 'react-redux';

export const ErrorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const action = route?.params?.action;
  const tryAgainHandler = () => {
    dispatch(action);
    navigation.goBack();
  };
  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <ErrorComponent />
      <View style={{width: '100%'}}>
        {action && (
          <ButtonWrapper>
            <ButtonItem title={'Try again'} handler={tryAgainHandler} />
          </ButtonWrapper>
        )}
        <ButtonItem
          handler={() => navigation.goBack()}
          title={'Back'}
          theme={{backgroundColor: colors.white, textColor: 'black'}}
        />
      </View>
    </View>
  );
};
