import React from 'react';
import {ScrollView} from 'react-native';

import {hotels} from '../../api/mock';

import {Section} from '../../components/Section/Section';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {Hotel} from '../ExploreScreen/components/Hotel';

export const TripsScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      {!!hotels.length && (
        <Section
          title={'Hotels'}
          isHorizontal={false}
          data={[hotels[0], hotels[1]]}
          renderItem={Hotel}
        />
      )}

      {!![].length && (
        <Section
          title={'Adventures'}
          isHorizontal={true}
          data={[]}
          renderItem={Adventure}
        />
      )}
    </ScrollView>
  );
};
