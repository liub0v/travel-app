import React from 'react';
import {Text, View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../../../redux/actions/AuthActions';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <View>
      <Text>Home page</Text>
      <ButtonItem handler={logOutButtonHandler} title={'Log out'} />
    </View>
  );
};
