import React, {useCallback} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {
  getSavedItemsLoaderSelector,
  savedAdventuresSelector,
  savedHotelsSelector,
} from '../../../redux/selectors/UserSelector';

import {Section, SectionHeader} from '../../components/Section/Section';
import {Hotel} from '../ExploreScreen/components/Hotel';
import {Adventure} from '../ExploreScreen/components/Adventure';
import colors from '../../constants/colors';
import {getSavedItems} from '../../../redux/actions/AuthActions';

export const SavedScreen = () => {
  const hotels = useSelector(savedHotelsSelector);
  const adventures = useSelector(savedAdventuresSelector);
  const isLoading = useSelector(getSavedItemsLoaderSelector);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(getSavedItems());
  }, [dispatch, getSavedItems]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
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
