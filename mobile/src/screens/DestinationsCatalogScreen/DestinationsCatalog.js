import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  destinationsLoader,
  destinationsSelector,
  hasMoreDestinationsSelector,
} from '../../../redux/selectors/DestinationSelector';
import FastImage from 'react-native-fast-image';
import {Search} from '../../components/Seacrh/Search';
import {
  BoldText,
  FlatListWrapper,
  ItemContainer,
  MainContainer,
  NormalText,
  SearchWrapper,
  TitleWrapper,
} from './DestinationsCatalog.style';
import {
  clearDestinations,
  getDestinations,
  getDestinationsByName,
} from '../../../redux/actions/DestinationActions';
import {clearAdventures} from '../../../redux/actions/AdventureActions';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {PAGE_SIZE} from '../../constants/api';

const Destination = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goAdventuresCatalogByDestination = () => {
    dispatch(clearAdventures());
    navigation.navigate('AdventuresCatalog', {destination: item.countryName});
  };
  return (
    <TouchableWithoutFeedback onPress={goAdventuresCatalogByDestination}>
      <ItemContainer>
        <FastImage
          style={{width: 155, height: 155, borderRadius: 16}}
          blurRadius={5}
          source={{uri: item.imageURL}}
        />
        <TitleWrapper>
          <NormalText>{'Adventure in '}</NormalText>
          <BoldText>{item.countryName}</BoldText>
        </TitleWrapper>
      </ItemContainer>
    </TouchableWithoutFeedback>
  );
};

export const Spinner = () => {
  return (
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      size="large"
      color={colors.green}
    />
  );
};

export const Footer = () => {
  return (
    // <View style={{width: '100%', alignItems: 'center'}}>
    <Text
      style={{
        width: '100%',
        fontFamily: fonts.normal,
        color: colors.grey,
        textAlign: 'center',
      }}>
      No more results
    </Text>
    // </View>
  );
};

export const DestinationsCatalog = () => {
  const destinations = useSelector(destinationsSelector);
  const hasMore = useSelector(hasMoreDestinationsSelector);
  const isLoading = useSelector(destinationsLoader);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [timerId, setTimerId] = useState();

  const searchDestinations = useCallback(
    (countryName, page) => {
      if (countryName.trim()) {
        dispatch(getDestinationsByName({page, limit: PAGE_SIZE, countryName}));
      } else {
        dispatch(getDestinations({page, limit: PAGE_SIZE}));
      }
    },
    [dispatch],
  );

  const handleEndReached = useCallback(() => {
    if (hasMore) {
      setPage(page + 1);
      searchDestinations(searchTerm, page + 1);
    }
  }, [page, hasMore, searchTerm, searchDestinations]);

  useEffect(() => {
    searchDestinations('', 1);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDestinations());
    };
  }, []);

  const handleSearchTermpChange = countryName => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newId = setTimeout(() => {
      dispatch(clearDestinations());
      setPage(1);
      setSearchTerm(countryName);
      searchDestinations(countryName, 1);
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
    <MainContainer>
      <SearchWrapper>
        <Search
          placeholder={'Where are you going?'}
          onChangeHandler={handleSearchTermpChange}
        />
      </SearchWrapper>
      <FlatListWrapper>
        <FlatList
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={destinations}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
          renderItem={({item}) => <Destination item={item} />}
          keyExtractor={item => item._id}
          ListFooterComponent={footerComponent}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
