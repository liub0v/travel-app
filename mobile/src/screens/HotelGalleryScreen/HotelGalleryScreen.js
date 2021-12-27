import React, {useState} from 'react';
import {currentHotelSelector} from '../../../redux/selectors/HotelSelectors';
import {useSelector} from 'react-redux';
import {Dimensions, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageWrapper, MainContainer} from './HotelGalleryScreen.style';

import {Spinner} from '../../components/Loaders/Spinner';

export const HotelGalleryScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gallery = useSelector(currentHotelSelector)?.gallery;

  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(
    (Dimensions.get('window').width * 100) / 60,
  );

  return (
    <MainContainer horizontal pagingEnabled>
      {gallery?.map((imageURL, index) => (
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get('window').width,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          maximumZoomScale={2.5}
          minimumZoomScale={1}
          key={index}>
          {isLoading && <Spinner />}
          <ImageWrapper>
            <FastImage
              resizeMode="contain"
              style={{width, height}}
              source={{uri: imageURL}}
              onLoadStart={() => {
                setWidth(1);
                setHeight(1);
                setIsLoading(true);
              }}
              onLoadEnd={() => {
                setWidth(Dimensions.get('window').width);
                setHeight((Dimensions.get('window').width * 100) / 60);
                setIsLoading(false);
              }}
            />
          </ImageWrapper>
        </ScrollView>
      ))}
    </MainContainer>
  );
};
