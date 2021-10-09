import mainImage from '../../../../assets/images/Rome.png';
import React, {useRef} from 'react';
import {
  BookingButton,
  BookingButtonTitle,
  Container,
  Description,
  TextWrapper,
  Title,
  ButtonsWrapper,
  Wrapper,
  PointContainer,
  SearchBarInput,
  SearchBarWrapper,
  SearchBarIcon,
  SearchBarContainer,
} from './Preview.style';
import {Animated, Image, TouchableWithoutFeedback, View} from 'react-native';
import {Point} from '../../Onboarding/OnBoarding.style';
import searchIcon from '../../../../assets/images/searchIcon.png';
import searchIconWhite from '../../../../assets/images/searchIconWhite.png';
const SearchBar = () => {
  const [text, onChangeText] = React.useState();
  const animateState = {
    start: 0,
    end: 100,
  };

  const value = useRef(new Animated.Value(animateState.start)).current;

  const startAnimate = () => {
    Animated.timing(value, {
      toValue: animateState.end,
      useNativeDriver: false,
      duration: 500,
    }).start();
  };
  const inputRange = [animateState.start, animateState.end];
  const widthWrapper = value.interpolate({
    inputRange,
    outputRange: ['10%', '100%'],
  });
  const widthInput = value.interpolate({
    inputRange,
    outputRange: ['0%', '100%'],
  });
  const opacityUp = value.interpolate({inputRange, outputRange: [0, 1]});
  const opacityDown = value.interpolate({inputRange, outputRange: [1, 0]});
  const marginLeft = value.interpolate({
    inputRange,
    outputRange: ['90%', '0%'],
  });
  const background = value.interpolate({
    inputRange,
    outputRange: ['#FFFFFF00', 'white'],
  });
  return (
    <SearchBarContainer>
      <Animated.View
        style={{
          width: widthWrapper,
          backgroundColor: background,
          borderRadius: 16,
          marginLeft,
        }}>
        <SearchBarWrapper>
          <TouchableWithoutFeedback onPress={startAnimate}>
            <View
              style={{
                marginLeft: 24,
                marginRight: 12,
              }}>
              <Animated.View style={{opacity: opacityDown}}>
                <Image source={searchIconWhite} />
              </Animated.View>
              <Animated.View style={{position: 'absolute', opacity: opacityUp}}>
                <Image style={{}} source={searchIcon} />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={{flex: 1, opacity: opacityUp, width: widthInput}}>
            <SearchBarInput
              placeholder={'Where are you going?'}
              editable
              onChangeText={text => onChangeText(text)}
              value={value}
              onSubmitEditing={() => console.log(text)}
            />
          </Animated.View>
        </SearchBarWrapper>
      </Animated.View>
    </SearchBarContainer>
  );
};

export const Preview = () => {
  return (
    <Container source={mainImage}>
      <SearchBar />
      <Wrapper>
        <TextWrapper>
          <Title>{'Rome'}</Title>
          <Description>
            {
              'The city setting is stunning with a rich architectural and historical heritage'
            }
          </Description>
        </TextWrapper>
        <ButtonsWrapper>
          <BookingButton>
            <TouchableWithoutFeedback onPress={() => {}}>
              <BookingButtonTitle>{'Book now'}</BookingButtonTitle>
            </TouchableWithoutFeedback>
          </BookingButton>
          <PointContainer>
            <Point active={false} />
            <Point active={true} />
            <Point active={false} />
          </PointContainer>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};
