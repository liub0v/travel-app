import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser} from '../../../redux/actions/AuthActions';
import {logOutIsLoadingSelector} from '../../../redux/selectors/userSelector';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(logOutIsLoadingSelector);
  console.log('isLoading', isLoading);
  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  return (
    <View>
      <Text>Home page</Text>
      <ButtonItem
        isLoading={isLoading}
        handler={logOutButtonHandler}
        title={'Log out'}
      />
    </View>
  );
};
