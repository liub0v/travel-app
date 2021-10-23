import React from 'react';
import {ScrollView, FlatList} from 'react-native';
import {dialogs} from '../../api/mock';
import {Dialog} from './components/Dialog';
import {Search} from '../../components/Seacrh/Search';
import {SearchWrapper} from './Inbox.style';

export const InboxScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      <SearchWrapper>
        <Search placeholder={'Find people...'} />
      </SearchWrapper>
      <FlatList data={dialogs} renderItem={Dialog} />
    </ScrollView>
  );
};
