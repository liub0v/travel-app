import React from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {
  adventuresByDestinationSelector,
  adventuresSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {
  FlatListWrapper,
  MainContainer,
  SearchWrapper,
} from '../AdventureDestinationsCatalogScreen/AdventureDestinationsCatalog.style';
import {Search} from '../../components/Seacrh/Search';
import {Adventure} from '../ExploreScreen/components/Adventure';

export const AdventuresCatalog = ({route}) => {
  const destination = route.params.destination;
  const adventures = useSelector(state =>
    adventuresByDestinationSelector(state, destination),
  );
  console.log('destination', destination);
  console.log('adv', adventures);

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
