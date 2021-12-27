import React, {useCallback} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {Section, SectionHeader} from '../../components/Section/Section';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {useDispatch, useSelector} from 'react-redux';
import {
  getVisitedItemsLoaderSelector,
  visitedAdventuresSelector,
  visitedHotelsSelector,
} from '../../../redux/selectors/UserSelector';
import colors from '../../constants/colors';
import {getVisitedItems} from '../../../redux/actions/AuthActions';

export const TripsScreen = () => {
  const adventures = useSelector(visitedAdventuresSelector);
  const hotels = useSelector(visitedHotelsSelector);

  const isLoading = useSelector(getVisitedItemsLoaderSelector);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(getVisitedItems());
  }, [dispatch, getVisitedItems]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          colors={[colors.green]}
          tintColor={colors.white}
        />
      }>
      {!!adventures?.length && (
        <Section
          title={'Adventures'}
          isHorizontal={true}
          data={adventures}
          renderItem={({item}) => <Adventure item={item} type={'visited'} />}
        />
      )}
      {!!hotels?.length && (
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
