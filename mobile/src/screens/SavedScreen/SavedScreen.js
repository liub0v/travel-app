import React from 'react';
import {ScrollView} from 'react-native';

import {useSelector} from 'react-redux';
import {
  savedAdventuresSelector,
  savedHotelsSelector,
} from '../../../redux/selectors/UserSelector';

import {Section} from '../../components/Section/Section';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const SavedScreen = ({navigation}) => {
  const hotels = useSelector(savedHotelsSelector);
  const adventures = useSelector(savedAdventuresSelector);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {!!hotels.length && (
        <Section
          title={'Hotels'}
          isHorizontal={false}
          data={hotels}
          renderItem={({item}) => <Hotel item={item} navigation={navigation} />}
        />
      )}

      {!!adventures.length && (
        <Section
          title={'Adventures'}
          isHorizontal={true}
          data={adventures}
          renderItem={({item}) => (
            <Adventure item={item} navigation={navigation} />
          )}
        />
      )}
    </ScrollView>
  );
};
