import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  hasMoreHotelsSelector,
  hotelsSelector,
  isLoadingHotelSelector,
} from '../../../redux/selectors/HotelSelectors';
import colors from '../../constants/colors';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {getHotels} from '../../../redux/actions/HotelActions';
import {Hotel} from '../../screens/ExploreScreen/components/Hotel';

export const HotelsScreen = ({navigation}) => {
  const hotels = useSelector(hotelsSelector);
  const hasMore = useSelector(hasMoreHotelsSelector);
  const isLoading = useSelector(isLoadingHotelSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getHotels({page, limit: 8}));
  }, [page]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color={colors.green}
        />
      ) : (
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={hotels}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            hasMore && setPage(page + 1);
          }}
          renderItem={({item}) => <Hotel item={item} navigation={navigation} />}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};
