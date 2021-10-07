import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Section} from '../../components/Section/Section';
import {adventures, destinations, hotels} from '../../api/mock';
import {Destination} from '../ExploreScreen/components/Destination';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {Hotel} from '../ExploreScreen/components/Hotel';

export const TripsScreen = () => {
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
    </ScrollView>
  );
};
