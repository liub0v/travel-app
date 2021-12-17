import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
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
import {ButtonWrapper} from '../HotelsListScreen/HotelsScreen.style';
import {Spinner} from '../../../components/Loaders/Spinner';
import {Search} from '../../../components/Seacrh/Search';
import {SearchWrapper} from '../../../screens/DestinationsCatalogScreen/DestinationsCatalog.style';

import {PAGE_SIZE} from '../../../constants/api';
import {Footer} from '../../../components/Footer/Footer';

export const AdventuresScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const adventures = useSelector(adventuresSelector);
  const hasMore = useSelector(hasMoreAdventuresSelector);
  const isLoading = useSelector(isLoadingAdventureSelector);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [timerId, setTimerId] = useState();

  const goAddAdventureScreen = () => {
    navigation.navigate('AddAdventureScreen');
  };

  const searchAdventures = useCallback(
    (term, page) => {
      if (term.trim()) {
        dispatch(getAdventuresByTerm({page, limit: PAGE_SIZE, term}));
      } else {
        dispatch(getAdventures({page, limit: PAGE_SIZE}));
      }
    },
    [dispatch],
  );
  const handleEndReached = useCallback(() => {
    if (hasMore) {
      setPage(page + 1);
      searchAdventures(searchTerm, page + 1);
    }
  }, [page, hasMore, searchTerm, searchAdventures]);

  useEffect(() => {
    searchAdventures('', 1);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearAdventures());
    };
  }, []);

  const handleSearchTermChange = (term: string) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newId = setTimeout(() => {
      dispatch(clearAdventures());
      setPage(1);
      setSearchTerm(term);
      searchAdventures(term, 1);
    }, 500);

    setTimerId(newId);
  };
  const footerComponent = useCallback(() => {
    if (!hasMore) {
      return <Footer />;
    } else {
      return isLoading ? <Spinner /> : null;
    }
  }, [isLoading, hasMore]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <>
        <SearchWrapper>
          <Search
            placeholder={'Where are you going?'}
            onChangeHandler={handleSearchTermChange}
          />
        </SearchWrapper>
        <ButtonWrapper>
          <ButtonItem
            title={'Add adventure'}
            theme={{
              backgroundColor: colors.white,
              textColor: colors.screenBackground,
            }}
            handler={goAddAdventureScreen}
          />
        </ButtonWrapper>

        <FlatList
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={adventures}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          renderItem={({item}) => <Adventure item={item} />}
          keyExtractor={item => item._id}
          ListFooterComponent={footerComponent}
        />
      </>
    </View>
  );
};
