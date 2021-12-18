import React from 'react';
import {useSelector} from 'react-redux';
import {
  hasMoreHotelsSelector,
  hotelsSelector,
  isLoadingHotelSelector,
} from '../../../../redux/selectors/HotelSelectors';

import {View} from 'react-native';
import {
  clearHotels,
  getHotels,
  getHotelsByTerm,
} from '../../../../redux/actions/HotelActions';
import {Hotel} from '../../../screens/ExploreScreen/components/Hotel';

import {SearchList} from '../../components/SearchList/SearchList';

export const HotelsScreen = () => {
  const hotels = useSelector(hotelsSelector);
  const hasMore = useSelector(hasMoreHotelsSelector);
  const isLoading = useSelector(isLoadingHotelSelector);

  return (
    <View style={{flex: 1}}>
      <SearchList
        renderItem={({item}) => <Hotel item={item} />}
        data={hotels}
        hasMore={hasMore}
        isLoading={isLoading}
        getItemsByTerm={getHotelsByTerm}
        getItems={getHotels}
        clearItems={clearHotels}
      />
    </View>
  );
};
