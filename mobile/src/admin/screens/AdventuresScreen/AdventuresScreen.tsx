import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Adventure} from '../../../screens/ExploreScreen/components/Adventure';
import {
  clearAdventures,
  getAdventures,
  getAdventuresByTerm,
} from '../../../../redux/actions/AdventureActions';
import {
  adventuresSelector,
  hasMoreAdventuresSelector,
  isLoadingAdventureSelector,
} from '../../../../redux/selectors/AdventureSelectors';
import {SearchList} from '../../components/SearchList/SearchList';

export const AdventuresScreen = () => {
  const adventures = useSelector(adventuresSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SearchList
        renderItem={({item}) => <Adventure item={item} />}
        data={adventures}
        hasMore={hasMore}
        isLoading={isLoading}
        getItemsByTerm={getAdventuresByTerm}
        getItems={getAdventures}
        clearItems={clearAdventures}
        flatListProps={{numColumns: 2}}
      />
    </View>
  );
};
