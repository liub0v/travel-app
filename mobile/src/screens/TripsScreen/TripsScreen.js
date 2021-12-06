import React from 'react';
import {ScrollView, View} from 'react-native';
import {Section, SectionHeader} from '../../components/Section/Section';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {useSelector} from 'react-redux';
import {
  visitedAdventuresSelector,
  visitedHotelsSelector,
} from '../../../redux/selectors/UserSelector';

export const TripsScreen = () => {
  const adventures = useSelector(visitedAdventuresSelector);
  const hotels = useSelector(visitedHotelsSelector);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}>
      {!!adventures.length && (
        <Section
          title={'Adventures'}
          isHorizontal={true}
          data={adventures}
          renderItem={({item}) => <Adventure item={item} type={'visited'} />}
        />
      )}
      {!!hotels.length && (
        <View>
          <SectionHeader title={'Hotels'} />
          {hotels?.map(item => (
            <Hotel item={item} key={item._id} type={'visited'} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
