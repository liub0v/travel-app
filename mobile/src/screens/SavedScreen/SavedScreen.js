import React from 'react';
import {ScrollView} from 'react-native';

import {hotels} from '../../api/mock';

import {Section} from '../../components/Section/Section';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const SavedScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      {!!hotels.length && (
        <Section
          title={'Hotels'}
          data={[hotels[0], hotels[1]]}
          renderItem={Hotel}
        />
      )}

      {!![].length && (
        <Section
          title={'Adventures'}
          isHorizontal
          data={[]}
          renderItem={Adventure}
        />
      )}
      {!![].length && (
        <Section title={'Guides'} data={[]} renderItem={Adventure} />
      )}
    </ScrollView>
  );
};
