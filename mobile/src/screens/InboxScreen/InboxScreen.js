import React from 'react';
import {ScrollView, FlatList} from 'react-native';
import {dialogs} from '../../api/mock';
import {Dialog} from './components/Dialog';
import searchIcon from '../../../assets/images/searchIcon.png';
import {
  SearchBarIcon,
  SearchBarInput,
  SearchBarWrapper,
  SearchWrapper,
} from './Inbox.style';

const Search = () => {
  const [value, onChangeText] = React.useState();
  return (
    <SearchBarWrapper>
      <SearchBarIcon source={searchIcon} />
      <SearchBarInput
        placeholder={'Find people...'}
        editable
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={() => console.log(value)}
      />
    </SearchBarWrapper>
  );
};

export const InboxScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <FlatList data={dialogs} renderItem={Dialog} />
    </ScrollView>
  );
};
