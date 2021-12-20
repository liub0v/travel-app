import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
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
import {getDestinations} from '../../../redux/actions/DestinationActions';
import {clearAdventures} from '../../../redux/actions/AdventureActions';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const Destination = ({item, navigation}) => {
  const dispatch = useDispatch();

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
export const Loader = () => {
  return <ActivityIndicator size="large" color={colors.green} />;
};
export const Footer = () => {
  return (
    <Text style={{fontFamily: fonts.normal, color: colors.white}}>
      {'the end'}
    </Text>
  );
};
export const DestinationsCatalog = ({navigation}) => {
  const destinations = useSelector(destinationsSelector);
  const hasMore = useSelector(hasMoreDestinationsSelector);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getDestinations({page: page, limit: 8}));
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
          ListFooterComponent={hasMore ? Loader : Footer}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
