import React from 'react';
import {View} from 'react-native';
import {TextDescription, TextHeader, ImageView} from './OnBoarding.style';
import image from '../../../assets/images/imageOnboarding4.png';

export const SecondPage = () => {
  return (
    <View>
      <>
        <TextHeader>Find best place for your journey</TextHeader>
        <ImageView source={image} />
        <TextDescription>
          We’re happy to share our best tips for destinations where you can
          relax. But you find the nicest city trips as well!
        </TextDescription>
      </>
    </View>
  );
};
