import React, {useEffect, useState} from 'react';
import {MainContainer} from '../HotelsCatalogScreen/HotelsCatalog.style';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors';
import {getGuides} from '../../../redux/actions/GuideActions';
import {
  guidesSelector,
  hasMoreGuidesSelector,
  isLoadingGuidesSelector,
} from '../../../redux/selectors/GuideSelectors';
import {Guide} from '../ExploreScreen/components/Guide';
import {SearchWrapper} from '../HotelsCatalogByDestinations/HotelsCatalogByDestination.style';
import {Search} from '../../components/Seacrh/Search';

export const GuidesCatalogScreen = () => {
  const guides = useSelector(guidesSelector);
  const hasMore = useSelector(hasMoreGuidesSelector);
  const isLoading = useSelector(isLoadingGuidesSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    hasMore && dispatch(getGuides({page, limit: 8}));
  }, [page]);

  return (
    <MainContainer>
      <SearchWrapper>
        <Search placeholder={'Where are you going?'} />
      </SearchWrapper>
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
          data={guides}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            hasMore && setPage(page + 1);
          }}
          renderItem={({item}) => <Guide item={item} />}
          keyExtractor={item => item._id}
        />
      )}
    </MainContainer>
  );
};
