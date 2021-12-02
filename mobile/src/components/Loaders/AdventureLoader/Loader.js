import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {AdventureItem} from './Loader.style';
import colors from '../../../constants/colors';
import {Section} from '../../Section/Section';

export const Loader = ({style}) => {
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
    <Section
      title={'Adventures'}
      isHorizontal={true}
      data={[{_id: 1}, {_id: 2}, {_id: 3}]}
      renderItem={() => (
        <AdventureItem>
          <Animated.View
            style={{
              borderRadius: 16,
              height: 250,
              width: 150,
              backgroundColor: colors.grey,
              ...style,
              opacity,
            }}
          />
        </AdventureItem>
      )}
    />
  );
};
