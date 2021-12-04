import React, {useEffect, useState, useCallback} from 'react';
import {Search} from '../../components/Seacrh/Search';
import {
  BoldText,
  FlatListWrapper,
  GreenText,
  InfoContainer,
  ItemContainer,
  MainContainer,
  NormalText,
  SearchWrapper,
} from './HotelsCatalogByDestination.style';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  destinationsLoader,
  destinationsSelector,
  hasMoreDestinationsSelector,
} from '../../../redux/selectors/DestinationSelector';
import FastImage from 'react-native-fast-image';
import {
  clearDestinations,
  getDestinations,
  getDestinationsByName,
} from '../../../redux/actions/DestinationActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {clearHotels} from '../../../redux/actions/HotelActions';
import {
  Footer,
  Spinner,
} from '../DestinationsCatalogScreen/DestinationsCatalog';
import {PAGE_SIZE} from '../../constants/api';
import {useNavigation} from '@react-navigation/core';

const Destination = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goHotelsCatalog = () => {
    dispatch(clearHotels());
    navigation.navigate('HotelsCatalog', {destination: item.countryName});
  };

  return (
    <TouchableWithoutFeedback>
      <ItemContainer>
        <FastImage
          style={{width: 155, height: 155, borderRadius: 16}}
          blurRadius={5}
          source={{uri: item.imageURL}}
        />
        <InfoContainer>
          <NormalText>{'Trip\nto'}</NormalText>
          <BoldText>{item.countryName}</BoldText>
          <GreenText>{`From $${100} /per night`}</GreenText>
          <ButtonItem
            handler={goHotelsCatalog}
            titleSize={12}
            title={'Find hotel'}
            size={{height: 40, width: 100}}
          />
        </InfoContainer>
      </ItemContainer>
    </TouchableWithoutFeedback>
  );
};
export const HotelsCatalogByDestination = ({navigation}) => {
  const destinations = useSelector(destinationsSelector);
  const hasMore = useSelector(hasMoreDestinationsSelector);
  const dispatch = useDispatch();
  const isLoading = useSelector(destinationsLoader);

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
