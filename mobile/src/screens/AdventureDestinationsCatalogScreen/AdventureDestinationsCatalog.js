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
const Destination = ({item, navigation}) => {
  const goAdventuresCatalogByDestination = () => {
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
export const AdventureDestinationsCatalog = ({navigation}) => {
  const destinations = useSelector(destinationsSelector);

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
            <Destination item={item} navigation={navigation} />
          )}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
