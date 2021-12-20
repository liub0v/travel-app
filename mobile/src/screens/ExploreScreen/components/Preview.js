import React, {useRef} from 'react';
import {Animated, TouchableWithoutFeedback} from 'react-native';

import {
  Container,
  Description,
  TextWrapper,
  Title,
  Wrapper,
  SearchBarInput,
  SearchBarWrapper,
  IconWrapper,
} from './Preview.style';

import searchIcon from '../../../../assets/images/searchIcon.png';
import searchIconWhite from '../../../../assets/images/searchIconWhite.png';
import mainImage from '../../../../assets/images/Rome.png';

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
  const backgroundColor = value.interpolate({
    inputRange,
    outputRange: ['#FFFFFF00', 'white'],
  });
  return (
    <SearchBarWrapper
      style={{
        width: widthWrapper,
        backgroundColor,
        marginLeft,
      }}>
      <TouchableWithoutFeedback onPress={startAnimate}>
        <IconWrapper>
          <Animated.Image
            source={searchIconWhite}
            style={{opacity: opacityDown}}
          />
          <Animated.Image
            source={searchIcon}
            style={{position: 'absolute', opacity: opacityUp}}
          />
        </IconWrapper>
      </TouchableWithoutFeedback>
      <Animated.View style={{opacity: opacityUp, width: widthInput}}>
        <SearchBarInput
          placeholder={'Where are you going?'}
          editable
          onChangeText={text => onChangeText(text)}
        />
      </Animated.View>
    </SearchBarWrapper>
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
      </Wrapper>
    </Container>
  );
};
