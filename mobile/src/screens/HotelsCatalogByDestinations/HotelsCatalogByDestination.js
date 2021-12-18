import React from 'react';

import {
  BoldText,
  GreenText,
  InfoContainer,
  ItemContainer,
  NormalText,
} from './HotelsCatalogByDestination.style';
import {TouchableWithoutFeedback, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/core';
import {SearchList} from '../../admin/components/SearchList/SearchList';

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
export const HotelsCatalogByDestination = () => {
  const destinations = useSelector(destinationsSelector);
  const hasMore = useSelector(hasMoreDestinationsSelector);
  const isLoading = useSelector(destinationsLoader);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SearchList
        clearItems={clearDestinations}
        getItems={getDestinations}
        data={destinations}
        hasMore={hasMore}
        flatListProps={{numColumns: 2}}
        getItemsByTerm={getDestinationsByName}
        renderItem={({item}) => <Destination item={item} />}
        isLoading={isLoading}
      />
    </View>
  );
};
