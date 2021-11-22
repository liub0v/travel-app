import React from 'react';
import {getHotelGallerySelector} from '../../../redux/selectors/HotelSelectors';
import {useSelector} from 'react-redux';
import {Dimensions, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {MainContainer} from './HotelGalleryScreen.style';

const {width} = Dimensions.get('window');
const height = (width * 100) / 70;

export const HotelGalleryScreen = ({route}) => {
  const hotelID = route.params.hotelID;
  const galleySelector = getHotelGallerySelector(hotelID);
  const gallery = useSelector(galleySelector);

  return (
    <MainContainer horizontal pagingEnabled>
      {gallery.map(imageURL => (
        <ScrollView maximumZoomScale={2.5} minimumZoomScale={1}>
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
