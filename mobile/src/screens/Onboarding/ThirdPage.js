import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {
  TextHeader,
  ViewContainer,
  ViewItem,
  ViewWrapper,
} from './Onboarding.style';
export const ThirdPage = () => {
  return (
    <>
      <TextHeader>Find best deals</TextHeader>
      <ViewContainer>
        <ViewItem></ViewItem>
        <ViewWrapper>
          <ViewItem></ViewItem>
          <ViewItem></ViewItem>
        </ViewWrapper>
        <ViewItem></ViewItem>
      </ViewContainer>
    </>
  );
};
