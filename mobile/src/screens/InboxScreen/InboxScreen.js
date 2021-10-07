import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {dialogs} from '../../api/mock';
import {Dialog} from './components/Dialog';
import {Formik} from 'formik';
import {
  getValidationStyles,
  logInValidationSchema,
} from '../../services/validation';
import {
  InputItem,
  LeftPosition,
  NormalText,
} from '../AuthScreens/LoginScreen/LoginScreen.style';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
const Search = () => {
  const [value, onChangeText] = React.useState();
  return (
    <InputItem
      placeholder={'Find people...'}
      editable
      onChangeText={text => onChangeText(text)}
      value={value}
      onSubmitEditing={() => console.log(value)}
    />
  );
};

export const InboxScreen = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <Search />
      <FlatList data={dialogs} renderItem={Dialog} />
    </ScrollView>
  );
};
