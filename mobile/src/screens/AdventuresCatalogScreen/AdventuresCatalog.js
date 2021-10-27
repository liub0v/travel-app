import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
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
} from '../AdventureDestinationsCatalogScreen/AdventureDestinationsCatalog.style';
import {Search} from '../../components/Seacrh/Search';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {getAdventures} from '../../../redux/actions/AdventureActions';
import colors from '../../constants/colors';

export const AdventuresCatalog = ({route}) => {
  const destination = route.params.destination;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const adventures = useSelector(adventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  useEffect(() => {
    console.log(page);
    dispatch(getAdventures({page, limit: 8, destination}));
  }, [page]);

  return (
    <MainContainer>
      <SearchWrapper>
        <Search placeholder={'Where are you going?'} />
      </SearchWrapper>
      <FlatListWrapper>
        {isLoading ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            size="large"
            color={colors.green}
          />
        ) : (
          <FlatList
            numColumns={2}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={adventures}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              hasMore && setPage(page + 1);
            }}
            renderItem={({item}) => <Adventure item={item} />}
            keyExtractor={item => item._id}
          />
        )}
      </FlatListWrapper>
    </MainContainer>
  );
};
