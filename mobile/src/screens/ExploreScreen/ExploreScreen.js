import React, {useEffect, useRef, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {useSelector} from 'react-redux';
import {popularDestinationsSelector} from '../../../redux/selectors/DestinationSelector';
import {popularAdventuresSelector} from '../../../redux/selectors/AdventureSelectors';
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
  const [adventureX, setAdventureX] = useState(0);
  const goHotelsCatalog = () => {
    navigation.navigate('HotelsCatalogByDestination');
  };
  const scrollRef = useRef();
  const adventuresRef = useRef(null);

  useEffect(() => {
    adventuresRef.current?.measure((width, height, px, py, fx, fy) => {
      setAdventureX(fy);
      console.log(width);
      console.log(height);
      console.log(py);
      console.log(fy);
    });
    console.log(adventureX);
  }, []);

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: adventureX,
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
        <Category
          image={guidesIcon}
          title={'Giudes'}
          passHandler={onPressTouch}
        />
      </CategoriesContainer>
      <Section
        title={'Popular destination'}
        isHorizontal={true}
        data={destinations}
        renderItem={Destination}
        showRightButton={false}
      />
      <Section
        ref={adventuresRef}
        title={'Adventures'}
        isHorizontal={true}
        data={adventures}
        renderItem={({item}) => (
          <Adventure item={item} navigation={navigation} />
        )}
        passHandler={goAdventureCatalog}
      />
      <View style={{width: '100%', flex: 1}}>
        <SectionHeader
          passHandler={goHotelsCatalog}
          title={'Hotel Best deals'}
          showRightButton={false}
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
