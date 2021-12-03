import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  adventuresSelector,
  hasMoreAdventuresSelector,
  isLoadingAdventureSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {
  FlatListWrapper,
  MainContainer,
  SearchWrapper,
} from '../DestinationsCatalogScreen/DestinationsCatalog.style';
import {Search} from '../../components/Seacrh/Search';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {getAdventuresByDestination} from '../../../redux/actions/AdventureActions';

import {
  Footer,
  Spinner,
} from '../DestinationsCatalogScreen/DestinationsCatalog';

export const AdventuresCatalog = ({navigation, route}) => {
  const destination = route.params.destination;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const adventures = useSelector(adventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  useEffect(() => {
    hasMore &&
      dispatch(getAdventuresByDestination({page, limit: 8, destination}));
  }, [page]);

  return (
    <MainContainer>
      <SearchWrapper>
        <Search placeholder={'Where are you going?'} />
      </SearchWrapper>
      <FlatListWrapper>
        <FlatList
          numColumns={2}
          horizontal={false}
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
          ListFooterComponent={isLoading ? <Spinner /> : <Footer />}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
