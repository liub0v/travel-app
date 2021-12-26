import React from 'react';
import {TouchableWithoutFeedback, View, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  destinationsLoader,
  destinationsSelector,
  hasMoreDestinationsSelector,
} from '../../../redux/selectors/DestinationSelector';

import {
  BoldText,
  ItemContainer,
  NormalText,
  TitleWrapper,
} from './DestinationsCatalog.style';
import {
  clearDestinations,
  getDestinations,
  getDestinationsByName,
} from '../../../redux/actions/DestinationActions';
import {clearAdventures} from '../../../redux/actions/AdventureActions';
import {useNavigation} from '@react-navigation/native';
import {EditWrapper} from '../ExploreScreen/components/Destination.style';
import {Edit} from '../../components/Edit/Edit';
import {roleSelector} from '../../../redux/selectors/UserSelector';
import {SearchList} from '../../admin/components/SearchList/SearchList';
import {AnimatedImage} from '../../components/Loaders/AnimatedImage';

const Destination = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const role = useSelector(roleSelector);

  const goAdventuresCatalogByDestination = () => {
    dispatch(clearAdventures());
    navigation.navigate('AdventuresCatalog', {destination: item.countryName});
  };

  const goEditDestinationScreen = () => {
    navigation.navigate('EditDestinationScreen', {destination: item});
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (role === 'admin') {
        } else {
          goAdventuresCatalogByDestination();
        }
      }}>
      <ItemContainer>
        <AnimatedImage
          imageStyle={{width: 155, height: 155, borderRadius: 16}}
          viewStyle={{borderRadius: 16}}
          imageURL={item?.imageURL}
        />
        <TitleWrapper>
          <NormalText>{'Adventure in '}</NormalText>
          <BoldText>{item?.countryName ?? ' '}</BoldText>
        </TitleWrapper>
        {role === 'admin' && (
          <EditWrapper>
            <Edit handler={goEditDestinationScreen} />
          </EditWrapper>
        )}
      </ItemContainer>
    </TouchableWithoutFeedback>
  );
};

export const DestinationsCatalog = () => {
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
