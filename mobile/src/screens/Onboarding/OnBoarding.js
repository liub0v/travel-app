import React, {useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {saveProfileOnboarding} from '../../../redux/actions/AuthActions';

import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {FirstPage} from './FirstPage';
import {SecondPage} from './SecondPage';
import {ThirdPage} from './ThirdPage';

import {CenterPosition} from '../AuthScreens/LoginScreen/LoginScreen.style';
import {
  Arrow,
  OnboardingBackground,
  Pagination,
  Point,
  PointContainer,
} from './OnBoarding.style';

import arrowImage from '../../../assets/images/arrowButton.png';

export const OnBoarding = ({navigation}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pressHandler = () => {
    setPage(page + 1);
    if (page > 2) setPage(1);
  };
  const buttonHandler = () => {
    dispatch(saveProfileOnboarding(false));
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
                <Image source={arrowImage} />
              </Arrow>
            </TouchableWithoutFeedback>
          </View>
        </Pagination>
      )}
      {page === 3 && (
        <CenterPosition>
          <ButtonItem handler={buttonHandler} title={'Get started'} />
        </CenterPosition>
      )}
    </OnboardingBackground>
  );
};
