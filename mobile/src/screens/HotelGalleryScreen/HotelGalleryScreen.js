import React from 'react';
import {getHotelGallerySelector} from '../../../redux/selectors/HotelSelectors';
import {useSelector} from 'react-redux';
import {Dimensions, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MainContainer} from './HotelGalleryScreen.style';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const height = (width * 100) / 70;

export const HotelGalleryScreen = () => {
  const route = useRoute();
  const hotelID = route.params.hotelID;
  const galleySelector = getHotelGallerySelector(hotelID);
  const gallery = useSelector(galleySelector);

  return (
    <MainContainer horizontal pagingEnabled>
      {gallery?.map((imageURL, index) => (
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={1} key={index}>
          <FastImage
            resizeMode="contain"
            style={{width, height}}
            source={{uri: imageURL}}
          />
        </ScrollView>
      ))}
    </MainContainer>
  );
};
