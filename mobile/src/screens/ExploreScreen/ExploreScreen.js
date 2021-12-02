import React, {useRef, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {useSelector} from 'react-redux';
import {popularDestinationsSelector} from '../../../redux/selectors/DestinationSelector';
import {
  popularAdventureLoaderSelector,
  popularAdventuresSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {popularHotelsSelector} from '../../../redux/selectors/HotelSelectors';

import {Section, SectionHeader} from '../../components/Section/Section';
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
import {HotelContainer} from '../SavedScreen/SavedScreen.style';
import {AdventureLoader} from '../../components/Loaders/AdventureLoader/AdventureLoader';

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
  const [adventuresY, setAdventuresY] = useState(0);
  const [hotelsY, setHotelsY] = useState(0);
  const [destinationsY, setDestinationsY] = useState(0);

  const popularAdventuresIsLoading = useSelector(
    popularAdventureLoaderSelector,
  );

  const goAdventureCatalog = () => {
    navigation.navigate('DestinationsCatalog');
  };
  const goHotelsCatalog = () => {
    navigation.navigate('HotelsCatalogByDestination');
  };
  const goGuidesCatalog = () => {
    navigation.navigate('GuidesCatalogScreen');
  };
  const scrollRef = useRef();

  const goToAdventureSection = () => {
    scrollRef.current?.scrollTo({
      y: adventuresY,
      animated: true,
    });
  };
  const goToHotelSection = () => {
    scrollRef.current?.scrollTo({
      y: hotelsY,
      animated: true,
    });
  };
  const goToDestinationSection = () => {
    scrollRef.current?.scrollTo({
      y: destinationsY,
      animated: true,
    });
  };
  const destinations = useSelector(popularDestinationsSelector);
  const adventures = useSelector(popularAdventuresSelector);
  const hotels = useSelector(popularHotelsSelector);
  return (
    <MainContainer
      ref={scrollRef}
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
          passHandler={goToHotelSection}
          title={'Hotels'}
        />
        <Category
          image={destinationsIcon}
          title={'Destinations'}
          passHandler={goToDestinationSection}
        />
        <Category
          image={adventuresIcon}
          title={'Adventures'}
          // passHandler={goAdventureCatalog}
          passHandler={goToAdventureSection}
        />
        <Category
          image={guidesIcon}
          title={'Guides'}
          passHandler={goGuidesCatalog}
        />
      </CategoriesContainer>
      <View onLayout={event => setDestinationsY(event.nativeEvent.layout.y)}>
        <Section
          title={'Popular destination'}
          isHorizontal={true}
          data={destinations}
          renderItem={Destination}
          showRightButton={false}
        />
      </View>

      <View onLayout={event => setAdventuresY(event.nativeEvent.layout.y)}>
        {popularAdventuresIsLoading ? (
          <AdventureLoader />
        ) : (
          <Section
            title={'Adventures'}
            isHorizontal={true}
            data={adventures}
            renderItem={({item}) => <Adventure item={item} />}
            passHandler={goAdventureCatalog}
          />
        )}
      </View>

      <View
        style={{width: '100%', flex: 1}}
        onLayout={event => setHotelsY(event.nativeEvent.layout.y)}>
        <SectionHeader
          passHandler={goHotelsCatalog}
          title={'Hotel Best deals'}
          showRightButton={true}
        />
        <HotelContainer>
          {hotels?.map(item => (
            <Hotel item={item} key={item._id} navigation={navigation} />
          ))}
        </HotelContainer>
      </View>
    </MainContainer>
  );
};
