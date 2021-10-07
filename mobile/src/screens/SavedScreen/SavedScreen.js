import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Section} from '../../components/Section/Section';
import {hotels} from '../../api/mock';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const SavedScreen = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <Section
        title={'Hotels'}
        isHorizontal={false}
        data={[hotels[0], hotels[1]]}
        renderItem={Hotel}
      />
      <Section
        title={'Adventures'}
        isHorizontal={true}
        data={[]}
        renderItem={Adventure}
      />
      <Section
        title={'Guides'}
        isHorizontal={false}
        data={[]}
        renderItem={Adventure}
      />
    </ScrollView>
  );
};
