import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {
  Arrow,
  ButtonStart,
  OnboardingBackground,
  Pagination,
  Point,
  PointsView,
} from './Onboarding.style';
import arrow from '../../../assets/images/arrowButton.png';
import {FirstPage} from './FirstPage';
import {SecondPage} from './SecondPage';
import {ThirdPage} from './ThirdPage';

export const Onboarding = () => {
  const [page, setPage] = useState(1);
  const pressHandler = () => {
    setPage(page + 1);
    if (page > 2) setPage(1);
    console.log(' Page', page);
  };
  useEffect(() => {}, [page]);
  return (
    <OnboardingBackground>
      {page === 1 && <FirstPage />}
      {page === 2 && <SecondPage />}
      {page === 3 && <ThirdPage />}
      <Pagination>
        <PointsView>
          <Point active={page === 1} />
          <Point active={page === 2} />
          <Point active={page === 3} />
        </PointsView>
        <TouchableHighlight onPress={pressHandler}>
          <Arrow source={arrow} />
        </TouchableHighlight>
      </Pagination>

      {page === 3 && <ButtonStart title={'Get started'} />}
    </OnboardingBackground>
  );
};
