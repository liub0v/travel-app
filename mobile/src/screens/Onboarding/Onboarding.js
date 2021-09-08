import React from 'react';
import {View, Text, Image, Button} from 'react-native';

import {
  Arrow,
  ImageItem,
  ImageItem1,
  ImageItem2,
  ImageItem3,
  Images,
  OnboardingBackground,
  Pagination,
  Point,
  TextDescription,
  TextHeader,
} from './Onboarding.style';
import image1 from '../../../assets/images/imageOnboarding1.png';
import image2 from '../../../assets/images/imageOnboarding2.png';
import image3 from '../../../assets/images/imageOnboarding3.png';
import arrow from '../../../assets/images/arrowButton.png';
export const Onboarding = () => {
  return (
    <OnboardingBackground>
      <TextHeader>Get inspiration for your next trip</TextHeader>
      <Images>
        <ImageItem1 source={image1}></ImageItem1>
        <ImageItem2 source={image2}></ImageItem2>
        <ImageItem3 source={image3}></ImageItem3>
      </Images>
      <TextDescription>
        We’re happy to share our best tips for destinations where you can relax.
        But you find the nicest city trips as well!
      </TextDescription>
      <Pagination>
        <Point />
        <Point />
        <Point />
        <Arrow source={arrow} />
      </Pagination>
    </OnboardingBackground>
  );
};
