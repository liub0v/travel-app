import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {useNavigation} from '@react-navigation/native';
import {Adventure} from '../../../screens/ExploreScreen/components/Adventure';
import {getAdventures} from '../../../../redux/actions/AdventureActions';
import {
  adventuresSelector,
  hasMoreAdventuresSelector,
  isLoadingAdventureSelector,
} from '../../../../redux/selectors/AdventureSelectors';

export const AdventuresScreen = () => {
  const adventures = useSelector(adventuresSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAdventures({page, limit: 8}));
  }, [page]);

  const goAddAdventureScreen = () => {
    navigation.navigate('AddAdventureScreen');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color={colors.green}
        />
      ) : (
        <>
          <ButtonItem
            title={'Add adventure'}
            theme={{
              backgroundColor: colors.white,
              textColor: colors.screenBackground,
            }}
            handler={goAddAdventureScreen}
          />

          <FlatList
            horizontal={false}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={adventures}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              hasMore && setPage(page + 1);
            }}
            renderItem={({item}) => (
              <Adventure item={item} navigation={navigation} />
            )}
            keyExtractor={item => item._id}
          />
        </>
      )}
    </View>
  );
};
