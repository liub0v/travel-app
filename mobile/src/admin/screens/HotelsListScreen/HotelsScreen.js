import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  hasMoreHotelsSelector,
  hotelsSelector,
  isLoadingHotelSelector,
} from '../../../../redux/selectors/HotelSelectors';
import colors from '../../../constants/colors';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {getHotels} from '../../../../redux/actions/HotelActions';
import {Hotel} from '../../../screens/ExploreScreen/components/Hotel';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {ButtonWrapper} from './HotelsScreen.style';
import {useNavigation} from '@react-navigation/native';

export const HotelsScreen = () => {
  const hotels = useSelector(hotelsSelector);
  const hasMore = useSelector(hasMoreHotelsSelector);
  const isLoading = useSelector(isLoadingHotelSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getHotels({page, limit: 8}));
  }, [page]);

  const goAddHotelScreen = () => {
    navigation.navigate('AddHotelScreen');
  };
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color={colors.green}
        />
      ) : (
        <>
          <ButtonWrapper>
            <ButtonItem
              title={'Add hotel'}
              theme={{
                backgroundColor: colors.white,
                textColor: colors.screenBackground,
              }}
              handler={goAddHotelScreen}
            />
          </ButtonWrapper>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={hotels}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              hasMore && setPage(page + 1);
            }}
            renderItem={({item}) => <Hotel item={item} />}
            keyExtractor={item => item._id}
          />
        </>
      )}
    </View>
  );
};
