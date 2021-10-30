import React, {useEffect, useState} from 'react';
import {MainContainer} from './HotelsCatalog.style';
import {ActivityIndicator, FlatList} from 'react-native';
import {
  hasMoreHotelsSelector,
  hotelsSelector,
  isLoadingHotelSelector,
} from '../../../redux/selectors/HotelSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {getHotels} from '../../../redux/actions/HotelActions';
import colors from '../../constants/colors';
import {Hotel} from '../ExploreScreen/components/Hotel';

export const HotelsCatalog = ({navigation, route}) => {
  const destination = route.params.destination;
  const hotels = useSelector(hotelsSelector);
  const hasMore = useSelector(hasMoreHotelsSelector);
  const isLoading = useSelector(isLoadingHotelSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getHotels({page, limit: 8, destination}));
  }, [page]);
  return (
    <MainContainer>
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
          renderItem={({item}) => (
            <Hotel
              item={item}
              handler={() => {
                navigation.navigate('HotelScreen', {hotel: item});
              }}
            />
          )}
          keyExtractor={item => item._id}
          // ListFooterComponent={hasMore ? Loader : Footer}
        />
      )}
    </MainContainer>
  );
};
