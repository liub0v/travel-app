import React, {useRef, useState} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';

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
  SectionWrapper,
} from './ExploreScreen.style';

import hotelsIcon from '../../../assets/images/hotelsIcon.png';
import destinationsIcon from '../../../assets/images/DestinationsIcon.png';
import adventuresIcon from '../../../assets/images/AdventuresIcon.png';
import guidesIcon from '../../../assets/images/GiudesIcon.png';
import {HotelContainer} from '../SavedScreen/SavedScreen.style';
import {Loader} from '../../components/Loaders/AdventureLoader/Loader';
import {HotelLoader} from '../../components/Loaders/HotelsLoader/HotelLoader';
import {DestinationLoader} from '../../components/Loaders/DestinationLoader/DestinationLoader';

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
        {popularDestinationsIsLoading ? (
          <DestinationLoader />
        ) : (
          <Section
            title={'Popular destinations'}
            isHorizontal={true}
            data={destinations}
            renderItem={({item}) => <Destination item={item} key={item._id} />}
            showRightButton={false}
          />
        )}
      </SectionWrapper>

      <SectionWrapper
        onLayout={event => setAdventuresY(event.nativeEvent.layout.y)}>
        {popularAdventuresIsLoading ? (
          <Loader />
        ) : (
          <Section
            title={'Adventures'}
            isHorizontal={true}
            data={adventures}
            renderItem={({item}) => <Adventure item={item} key={item._id} />}
            passHandler={goAdventureCatalog}
          />
        )}
      </SectionWrapper>

      <SectionWrapper
        onLayout={event => setHotelsY(event.nativeEvent.layout.y)}>
        <SectionHeader
          passHandler={goHotelsCatalog}
          title={'Hotel Best deals'}
          showRightButton={true}
        />
        {popularHotelsIsLoading ? (
          <>
            {[{_id: 1}]?.map(item => (
              <HotelLoader key={item._id} />
            ))}
          </>
        ) : (
          <>
            {hotels?.map(item => (
              <Hotel item={item} key={item._id} />
            ))}
          </>
        )}
      </SectionWrapper>
    </MainContainer>
  );
};
