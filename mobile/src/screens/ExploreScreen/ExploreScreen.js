import React, {useRef, useState} from 'react';
import {StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';

import {useSelector} from 'react-redux';
import {
  popularDestinationsLoaderSelector,
  popularDestinationsSelector,
} from '../../../redux/selectors/DestinationSelector';
import {
  popularAdventuresLoaderSelector,
  popularAdventuresSelector,
} from '../../../redux/selectors/AdventureSelectors';
import {
  popularHotelsLoaderSelector,
  popularHotelsSelector,
} from '../../../redux/selectors/HotelSelectors';

import {Destination} from './components/Destination';
import {Adventure} from './components/Adventure';
import {Hotel} from './components/Hotel';
import {Preview} from './components/Preview';

import {
  CategoriesContainer,
  CategoryTitle,
  CategoryItem,
  MainContainer,
  SectionWrapper,
} from './ExploreScreen.style';

import hotelsIcon from '../../../assets/images/hotelsIcon.png';
import destinationsIcon from '../../../assets/images/DestinationsIcon.png';
import adventuresIcon from '../../../assets/images/AdventuresIcon.png';
import guidesIcon from '../../../assets/images/GiudesIcon.png';
import {SectionMap} from '../../components/SectionMap/SectionMap';

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
  const scrollRef = useRef();

  const [adventuresY, setAdventuresY] = useState(0);
  const [hotelsY, setHotelsY] = useState(0);
  const [destinationsY, setDestinationsY] = useState(0);

  const destinations = useSelector(popularDestinationsSelector);
  const adventures = useSelector(popularAdventuresSelector);
  const hotels = useSelector(popularHotelsSelector);
  const popularAdventuresIsLoading = useSelector(
    popularAdventuresLoaderSelector,
  );
  const popularHotelsIsLoading = useSelector(popularHotelsLoaderSelector);
  const popularDestinationsIsLoading = useSelector(
    popularDestinationsLoaderSelector,
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
          passHandler={goToAdventureSection}
        />
        <Category
          image={guidesIcon}
          title={'Guides'}
          passHandler={goGuidesCatalog}
        />
      </CategoriesContainer>
      <SectionWrapper
        onLayout={event => setDestinationsY(event.nativeEvent.layout.y)}>
        <SectionMap
          horizontal
          headerOptions={{
            title: 'Popular destinations',
          }}
          isLoading={popularDestinationsIsLoading}
          loaderStyle={loaderStyles.destination}
          data={destinations}
          component={item => <Destination item={item} key={item._id} />}
        />
      </SectionWrapper>
      <SectionWrapper
        onLayout={event => setAdventuresY(event.nativeEvent.layout.y)}>
        <SectionMap
          horizontal
          headerOptions={{
            passHandler: goAdventureCatalog,
            title: 'Adventures',
            showRightButton: true,
          }}
          isLoading={popularAdventuresIsLoading}
          loaderStyle={loaderStyles.adventure}
          data={adventures}
          component={item => <Adventure item={item} key={item._id} />}
        />
      </SectionWrapper>
      <SectionWrapper
        onLayout={event => setHotelsY(event.nativeEvent.layout.y)}>
        <SectionMap
          headerOptions={{
            passHandler: goHotelsCatalog,
            title: 'Hotel Best deals',
            showRightButton: true,
          }}
          isLoading={popularHotelsIsLoading}
          loaderStyle={loaderStyles.hotel}
          data={hotels}
          component={item => <Hotel item={item} key={item._id} />}
        />
      </SectionWrapper>
    </MainContainer>
  );
};

const loaderStyles = StyleSheet.create({
  destination: {
    borderRadius: 16,
    height: 130,
    width: 200,
    marginRight: 12,
    marginLeft: 12,
    marginTop: 24,
  },
  adventure: {
    borderRadius: 16,
    height: 250,
    width: 150,
    marginRight: 12,
    marginLeft: 12,
    marginTop: 24,
  },
  hotel: {
    borderBottomStartRadius: 16,
    borderTopStartRadius: 16,
    height: 90,
    width: '100%',
    marginLeft: 12,
    marginTop: 24,
  },
});
