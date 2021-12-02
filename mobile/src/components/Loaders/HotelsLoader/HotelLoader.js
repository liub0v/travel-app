import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import colors from '../../../constants/colors';
import {HotelItem} from '../../../screens/ExploreScreen/components/Hotel.style';

export const HotelLoader = ({style}) => {
  const animateState = {
    start: 0,
    end: 1,
  };

  const value = useRef(new Animated.Value(animateState.start)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: animateState.end,
          useNativeDriver: false,
          duration: 500,
        }),
        Animated.timing(value, {
          toValue: animateState.start,
          useNativeDriver: false,
          duration: 500,
        }),
      ]),
      {
        iterations: 60,
      },
    ).start();
  }, []);
  const inputRange = [animateState.start, animateState.end];
  const opacity = value.interpolate({
    inputRange,
    outputRange: [0.4, 0.5],
  });
  return (
    <HotelItem>
      <Animated.View
        style={{
          borderBottomStartRadius: 16,
          borderTopStartRadius: 16,
          height: 90,
          width: '100%',
          backgroundColor: colors.grey,
          ...style,
          opacity,
        }}
      />
    </HotelItem>
  );
};
