import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
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
  return <Text style={{fontFamily: fonts.normal, color: colors.white}}> </Text>;
};
export const DestinationsCatalog = () => {
  const destinations = useSelector(destinationsSelector);
  const hasMore = useSelector(hasMoreDestinationsSelector);
  const dispatch = useDispatch();
  const isLoading = useSelector(destinationsLoader);

  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(hasMore);
    hasMore && dispatch(getDestinations({page: page, limit: 8}));
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(clearDestinations());
    };
  }, []);

  const searchHandler = countryName => {
    setPage(1);
    dispatch(getDestinationsByName({page: 1, limit: 8, countryName}));
  };

  return (
    <MainContainer>
      <SearchWrapper>
        <Search
          placeholder={'Where are you going?'}
          onChangeHandler={searchHandler}
        />
      </SearchWrapper>
      <FlatListWrapper>
        <FlatList
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={destinations}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            hasMore && setPage(page + 1);
          }}
          renderItem={({item}) => <Destination item={item} />}
          keyExtractor={item => item._id}
          ListFooterComponent={isLoading ? <Spinner /> : <Footer />}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
