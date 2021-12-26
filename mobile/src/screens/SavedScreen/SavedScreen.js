import React from 'react';
import {ScrollView, View} from 'react-native';

import {useSelector} from 'react-redux';
import {
  savedAdventuresSelector,
  savedHotelsSelector,
} from '../../../redux/selectors/UserSelector';

import {Section, SectionHeader} from '../../components/Section/Section';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const SavedScreen = () => {
  const hotels = useSelector(savedHotelsSelector);
  const adventures = useSelector(savedAdventuresSelector);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {!!adventures?.length && (
        <Section
          title={'Adventures'}
          isHorizontal={true}
          data={adventures}
          renderItem={({item}) => <Adventure item={item} type={'saved'} />}
        />
      )}
      {!!hotels?.length && (
        <View>
          <SectionHeader title={'Hotels'} />
          {hotels?.map(item => (
            <Hotel item={item} key={item._id} type={'saved'} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
