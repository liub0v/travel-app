import React from 'react';
import {ScrollView} from 'react-native';
import {Section} from '../../components/Section/Section';
import {hotels} from '../../api/mock';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const SavedScreen = () => {
  return (
    <ScrollView style={{flex: 1}}>
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
      {!![].length && (
        <Section
          title={'Guides'}
          isHorizontal={false}
          data={[]}
          renderItem={Adventure}
        />
      )}
    </ScrollView>
  );
};
