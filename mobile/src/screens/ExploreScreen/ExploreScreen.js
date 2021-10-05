import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  AdventuresContainer,
  AdventuresItem,
  AdventuresItemImage,
  AdventuresItemLocation,
  AdventuresItemName,
  AdventuresItemsContainer,
  AdventuresItemTitleWrapper,
  CategoriesContainer,
  CategoryHeader,
  CategoryHeaderWrapper,
  CategoryTitle,
  CategoryWrapper,
  DestinationItem,
  DestinationItemImage,
  DestinationItemsContainer,
  DestinationItemTitle,
  DestinationItemTitleWrapper,
  DestinationsContainer,
  HotelsContainer,
  MainContainer,
  MainImage,
} from './ExploreScreen.style';
import mainImage from '../../../assets/images/Rome.png';
import hotelsIcon from '../../../assets/images/hotelsIcon.png';
import destinationsIcon from '../../../assets/images/DestinationsIcon.png';
import adventuresIcon from '../../../assets/images/AdventuresIcon.png';
import giudesIcon from '../../../assets/images/GiudesIcon.png';
import thailandImage from '../../../assets/images/Thailand.png';
import spainImage from '../../../assets/images/spainImage.jpeg';
import adventureImage1 from '../../../assets/images/Adventures1.png';
import adventureImage2 from '../../../assets/images/Adventures2.jpeg';
import adventureImage3 from '../../../assets/images/Adventures3.webp';
const destinations = [
  {
    image: thailandImage,
    title: 'Thailand',
  },
  {
    image: spainImage,
    title: 'Spain',
  },
  {
    image: mainImage,
    title: 'Rome',
  },
];
//150 250
const adventures = [
  {
    image: adventureImage2,
    name: 'Camp under the stars on a volcano',
    location: 'Kuta, Indonesia',
  },
  {
    image: adventureImage1,
    name: 'Volcanoes of Bali and Java',
    location: 'Kuta, Indonesia',
  },

  {
    image: adventureImage3,
    name: 'Hunt with eagle in Altai Mountains',
    location: 'Ulgii, Mongolia',
  },
];
const Category = ({image, title}) => {
  return (
    <TouchableWithoutFeedback>
      <CategoryWrapper>
        <Image source={image} width={200} height={130} />
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryWrapper>
    </TouchableWithoutFeedback>
  );
};
const Destination = ({image, title}) => {
  return (
    <DestinationItem>
      <DestinationItemImage source={image}></DestinationItemImage>
      <DestinationItemTitleWrapper>
        <DestinationItemTitle>{title}</DestinationItemTitle>
      </DestinationItemTitleWrapper>
    </DestinationItem>
  );
};
const Adventures = ({image, name, location}) => {
  return (
    <AdventuresItem>
      <AdventuresItemImage source={image}></AdventuresItemImage>
      <AdventuresItemTitleWrapper>
        <AdventuresItemName>{name}</AdventuresItemName>
        <AdventuresItemLocation>{location}</AdventuresItemLocation>
      </AdventuresItemTitleWrapper>
    </AdventuresItem>
  );
};

export const ExploreScreen = () => {
  return (
    <MainContainer
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
      }}>
      <MainImage source={mainImage} />
      <CategoriesContainer>
        <Category image={hotelsIcon} title={'Hotels'} />
        <Category image={destinationsIcon} title={'Destinations'} />
        <Category image={adventuresIcon} title={'Adventures'} />
        <Category image={giudesIcon} title={'Giudes'} />
      </CategoriesContainer>
      <DestinationsContainer>
        <CategoryHeaderWrapper>
          <CategoryHeader>{'Popular destination'}</CategoryHeader>
        </CategoryHeaderWrapper>
        <ScrollView horizontal={true}>
          <DestinationItemsContainer>
            {destinations.map(({image, title}, index) => {
              return <Destination key={index} image={image} title={title} />;
            })}
          </DestinationItemsContainer>
        </ScrollView>
      </DestinationsContainer>
      <AdventuresContainer>
        <CategoryHeaderWrapper>
          <CategoryHeader>{'Adventures '}</CategoryHeader>
        </CategoryHeaderWrapper>
        <ScrollView horizontal={true}>
          <AdventuresItemsContainer>
            {adventures.map(({image, name, location}, index) => {
              return (
                <Adventures
                  key={index}
                  image={image}
                  name={name}
                  location={location}
                />
              );
            })}
          </AdventuresItemsContainer>
        </ScrollView>
      </AdventuresContainer>
      <HotelsContainer></HotelsContainer>
    </MainContainer>
  );
};
