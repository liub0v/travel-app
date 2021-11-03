import React from 'react';

import {
  ImageItemLeft,
  ImageItemCenter,
  ImageItemRight,
  Images,
  TextDescription,
  TextHeader,
} from './OnBoarding.style';


import image1 from '../../../assets/images/imageOnboarding1.png';
import image2 from '../../../assets/images/imageOnboarding2.png';
import image3 from '../../../assets/images/imageOnboarding3.png';


export const FirstPage = () => {
  return (
    <>
      <TextHeader>Get inspiration for your next trip</TextHeader>
      <Images>
        <ImageItemLeft source={image1} />
        <ImageItemCenter source={image2} />
        <ImageItemRight source={image3} />
      </Images>
      <TextDescription>
        We’re happy to share our best tips for destinations where you can relax.
        But you find the nicest city trips as well!
      </TextDescription>
    </>
  );
};
