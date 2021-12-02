import React, {useEffect, useState} from 'react';
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
import {
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
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
} from '../../../redux/actions/DestinationActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {clearHotels} from '../../../redux/actions/HotelActions';
import colors from '../../constants/colors';

const Destination = ({item, navigation}) => {
  const dispatch = useDispatch();
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
  const [page, setPage] = useState(1);
  const isLoading = useSelector(destinationsLoader);
  useEffect(() => {
    hasMore && dispatch(getDestinations({page: page, limit: 8}));
  }, [page]);
  useEffect(() => {
    return () => {
      dispatch(clearDestinations());
    };
  }, []);
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
        <FlatListWrapper>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={destinations}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              hasMore && setPage(page + 1);
            }}
            renderItem={({item}) => (
              <Destination item={item} navigation={navigation} />
            )}
            keyExtractor={item => item._id}
          />
        </FlatListWrapper>
      )}
    </MainContainer>
  );
};
