import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {
  TextHeader,
  ViewContainer,
  ImageItem,
  ViewWrapper,
  ImageWrapper,
  TextItem,
  TextWrapper,
} from './Onboarding.style';
import image1 from '../../../assets/images/imageOnboarding3_1.png';
import image2 from '../../../assets/images/imageOnboarding3_2.png';
import image3 from '../../../assets/images/imageOnboarding3_3.png';
import image4 from '../../../assets/images/imageOnboarding3_4.png';

const ImageContainer = ({image, text}) => {
  return (
    <ImageWrapper>
      <ImageItem source={image} />
      <TextWrapper>
        <TextItem>{text}</TextItem>
      </TextWrapper>
    </ImageWrapper>
  );
};
export const ThirdPage = () => {
  return (
    <View style={{flex: 1}}>
      <TextHeader>Find best deals</TextHeader>
      <ViewContainer>
        <ImageContainer image={image1} text={'326$'} />
        <ViewWrapper>
          <ImageContainer image={image2} text={'50$'} />
          <ImageContainer image={image3} text={'110$'} />
        </ViewWrapper>
        <ImageContainer image={image4} text={'438$'} />
      </ViewContainer>
    </View>
  );
};
