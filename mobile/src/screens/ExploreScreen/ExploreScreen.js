import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {popularDestinationsSelector} from '../../../redux/selectors/DestinationSelector';
import {popularAdventuresSelector} from '../../../redux/selectors/AdventureSelectors';
import {popularHotelsSelector} from '../../../redux/selectors/HotelSelectors';
import {Section} from '../../components/Section/Section';
import {Destination} from './components/Destination';
import {Adventure} from './components/Adventure';
import {Hotel} from './components/Hotel';
import {Preview} from './components/Preview';
import {
  CategoriesContainer,
  CategoryTitle,
  CategoryItem,
  MainContainer,
} from './ExploreScreen.style';
import hotelsIcon from '../../../assets/images/hotelsIcon.png';
import destinationsIcon from '../../../assets/images/DestinationsIcon.png';
import adventuresIcon from '../../../assets/images/AdventuresIcon.png';
import guidesIcon from '../../../assets/images/GiudesIcon.png';

const Category = ({image, title, passHandler = () => {}}) => {
  return (
    <TouchableWithoutFeedback onPress={passHandler}>
      <CategoryItem>
        <Image source={image} />
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryItem>
    </TouchableWithoutFeedback>
  );
};

export const ExploreScreen = ({navigation}) => {
  const goAdventureCatalog = () => {
    navigation.navigate('DestinationsCatalog');
  };

  const goHotelsCatalog = () => {
    navigation.navigate('HotelsCatalogByDestination');
  };
  const destinations = useSelector(popularDestinationsSelector);
  const adventures = useSelector(popularAdventuresSelector);
  const hotels = useSelector(popularHotelsSelector);
  return (
    <MainContainer
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
      }}>
      <Preview />
      <CategoriesContainer>
        <Category
          image={hotelsIcon}
          passHandler={goHotelsCatalog}
          title={'Hotels'}
        />
        <Category
          image={destinationsIcon}
          title={'Destinations'}
          passHandler={goAdventureCatalog}
        />
        <Category
          image={adventuresIcon}
          title={'Adventures'}
          passHandler={goAdventureCatalog}
        />
        <Category image={guidesIcon} title={'Giudes'} />
      </CategoriesContainer>
      <Section
        title={'Popular destination'}
        isHorizontal={true}
        data={destinations}
        renderItem={Destination}
        showRightButton={false}
      />
      <Section
        title={'Adventures'}
        isHorizontal={true}
        data={adventures}
        renderItem={({item}) => (
          <Adventure item={item} navigation={navigation} />
        )}
        passHandler={goAdventureCatalog}
      />
      <Section
        title={'Hotel Best deals'}
        isHorizontal={false}
        data={hotels}
        renderItem={({item}) => <Hotel item={item} navigation={navigation} />}
        passHandler={goHotelsCatalog}
      />
    </MainContainer>
  );
};
