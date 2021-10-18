import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {destinationsSelector} from '../../../redux/selectors/DestinationSelector';
import {useSelector} from 'react-redux';
import {adventures, hotels} from '../../api/mock';
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

const Category = ({image, title}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <CategoryItem>
        <Image source={image} />
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryItem>
    </TouchableWithoutFeedback>
  );
};

export const ExploreScreen = () => {
  const destinations = useSelector(destinationsSelector);
  return (
    <MainContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
      }}>
      <Preview />
      <CategoriesContainer>
        <Category image={hotelsIcon} title={'Hotels'} />
        <Category image={destinationsIcon} title={'Destinations'} />
        <Category image={adventuresIcon} title={'Adventures'} />
        <Category image={guidesIcon} title={'Giudes'} />
      </CategoriesContainer>
      <Section
        title={'Popular destination'}
        isHorizontal={true}
        data={destinations}
        renderItem={Destination}
      />
      <Section
        title={'Adventures'}
        isHorizontal={true}
        data={adventures}
        renderItem={Adventure}
      />
      <Section
        title={'Hotel Best deals'}
        isHorizontal={false}
        data={hotels}
        renderItem={Hotel}
      />
    </MainContainer>
  );
};
