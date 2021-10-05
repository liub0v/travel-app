import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logOutIsLoadingSelector} from '../../../redux/selectors/userSelector';
import {logOutUser} from '../../../redux/actions/AuthActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';

export const ProfileScreen = () => {
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
