import React, {useState} from 'react';

import {
  ImageItem1,
  ImageItem2,
  ImageItem3,
  Images,
  TextDescription,
  TextHeader,
} from './Onboarding.style';
import image1 from '../../../assets/images/imageOnboarding1.png';
import image2 from '../../../assets/images/imageOnboarding2.png';
import image3 from '../../../assets/images/imageOnboarding3.png';
export const FirstPage = () => {
  return (
    <>
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
    </>
  );
};
