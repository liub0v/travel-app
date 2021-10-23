import React from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {destinationsSelector} from '../../../redux/selectors/DestinationSelector';
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
} from './AdventureDestinationsCatalog.style';
const Destination = ({item, pressHandler = () => {}}) => {
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
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
export const AdventureDestinationsCatalog = ({navigation}) => {
  const destinations = useSelector(destinationsSelector);
  const goAdventuresCatalogByLocation = () => {
    console.log('navigate');
    navigation.navigate('AdventuresCatalog', {destination: 'Spain'});
  };
  return (
    <MainContainer>
      <SearchWrapper>
        <Search placeholder={'Where are you going?'} />
      </SearchWrapper>
      <FlatListWrapper>
        <FlatList
          numColumns={2}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          data={destinations}
          renderItem={({item}) => (
            <Destination
              pressHandler={goAdventuresCatalogByLocation}
              item={item}
            />
          )}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
