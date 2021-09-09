import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Arrow,
  ButtonStart,
  ButtonText,
  ButtonWrapper,
  OnboardingBackground,
  Pagination,
  Point,
  PointContainer,
} from './Onboarding.style';
import arrow from '../../../assets/images/arrowButton.png';
import {FirstPage} from './FirstPage';
import {SecondPage} from './SecondPage';
import {ThirdPage} from './ThirdPage';
import {Constants} from 'react-native-unimodules';

export const Onboarding = () => {
  const [page, setPage] = useState(1);
  const pressHandler = () => {
    setPage(page + 1);
    if (page > 2) setPage(1);
    console.log(' Page', page);
  };
  const buttonHandler = () => {
    setPage(1);
  };
  const component = () => {
    switch (page) {
      case 1:
        return <FirstPage />;
      case 2:
        return <SecondPage />;
      case 3:
        return <ThirdPage />;
    }
  };
  useEffect(() => {}, [page]);
  return (
    <OnboardingBackground>
      {component()}
      {page !== 3 && (
        <Pagination>
          <PointContainer>
            <Point active={page === 1} />
            <Point active={page === 2} />
            <Point active={page === 3} />
          </PointContainer>
          <View>
            <TouchableWithoutFeedback onPress={pressHandler}>
              <Arrow>
                <Image source={arrow} />
              </Arrow>
            </TouchableWithoutFeedback>
          </View>
        </Pagination>
      )}
      {page === 3 && (
        <ButtonWrapper>
          <ButtonStart onPress={buttonHandler}>
            <ButtonText>Get started</ButtonText>
          </ButtonStart>
        </ButtonWrapper>
      )}
    </OnboardingBackground>
  );
};
