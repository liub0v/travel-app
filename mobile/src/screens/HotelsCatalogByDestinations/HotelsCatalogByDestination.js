import React from 'react';

import {
  BoldText,
  GreenText,
  InfoContainer,
  ItemContainer,
  MainContainer,
  NormalText,
} from './HotelsCatalogByDestination.style';
import {TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  destinationsLoader,
  destinationsSelector,
  hasMoreDestinationsSelector,
} from '../../../redux/selectors/DestinationSelector';
import {
  clearDestinations,
  getDestinations,
  getDestinationsByName,
} from '../../../redux/actions/DestinationActions';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {clearHotels} from '../../../redux/actions/HotelActions';
import {useNavigation} from '@react-navigation/core';
import {SearchList} from '../../admin/components/SearchList/SearchList';
import {AnimatedImage} from '../../components/Loaders/AnimatedImage';

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
        <AnimatedImage
          imageStyle={{width: 155, height: 155, borderRadius: 16}}
          viewStyle={{borderRadius: 16}}
          imageURL={item?.imageURL}
        />
        <InfoContainer>
          <NormalText>{'Trip\nto'}</NormalText>
          <BoldText>{item?.countryName}</BoldText>
          <GreenText>{`         `}</GreenText>
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
    <MainContainer>
      <SearchList
        clearItems={clearDestinations}
        getItems={getDestinations}
        data={destinations}
        hasMore={hasMore}
        flatListProps={{numColumns: 1}}
        getItemsByTerm={getDestinationsByName}
        renderItem={({item}) => <Destination item={item} />}
        isLoading={isLoading}
      />
    </MainContainer>
  );
};
