import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {destinationsSelector} from '../../../redux/selectors/DestinationSelector';
import FastImage from 'react-native-fast-image';
import {Search} from '../../components/Seacrh/Search';
import {
  BoldText,
  FlatListWrapper,
  ImageItem,
  ImageWrapper,
  ItemContainer,
  MainContainer,
  NormalText,
  SearchWrapper,
  TextItem,
  TextWrapper,
  TitleWrapper,
} from './AdventuresCatalog.style';
const Destination = ({item}) => {
  return (
    <ItemContainer>
      <ImageWrapper>
        <FastImage
          style={{width: 155, height: 155, borderRadius: 16}}
          blurRadius={5}
          source={{uri: item.imageURL}}
        />
      </ImageWrapper>
      <TitleWrapper>
        <NormalText>{'Adventure in '}</NormalText>
        <BoldText>{item.countryName}</BoldText>
      </TitleWrapper>
    </ItemContainer>
  );
};
export const AdventuresCatalog = () => {
  const destinations = useSelector(destinationsSelector);
  console.log(destinations);
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
          renderItem={Destination}
        />
      </FlatListWrapper>
    </MainContainer>
  );
};
