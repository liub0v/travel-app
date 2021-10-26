import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {adventuresSelector} from '../../../redux/selectors/AdventureSelectors';
import {
  FlatListWrapper,
  MainContainer,
  SearchWrapper,
} from '../AdventureDestinationsCatalogScreen/AdventureDestinationsCatalog.style';
import {Search} from '../../components/Seacrh/Search';
import {Adventure} from '../ExploreScreen/components/Adventure';
import {getAdventures} from '../../../redux/actions/AdventureActions';

export const AdventuresCatalog = ({route}) => {
  const destination = route.params.destination;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const adventures = useSelector(adventuresSelector);

  useEffect(() => {
    dispatch(getAdventures({page, limit: 8, destination}));
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
          data={adventures}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            setPage(page + 1);
          }}
          renderItem={({item}) => (
            <Adventure
              // pressHandler={goAdventuresCatalogByDestination}
              item={item}
            />
          )}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
