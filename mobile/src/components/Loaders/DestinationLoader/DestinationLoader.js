import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import colors from '../../../constants/colors';
import {Section} from '../../Section/Section';
import {DestinationItem} from '../../../screens/ExploreScreen/components/Destination.style';

export const DestinationLoader = ({style}) => {
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
      title={'Destinations'}
      isHorizontal={true}
      data={[{_id: 1}, {_id: 2}, {_id: 3}]}
      renderItem={() => (
        <DestinationItem>
          <Animated.View
            style={{
              borderRadius: 16,
              height: 130,
              width: 200,
              backgroundColor: colors.grey,
              ...style,
              opacity,
            }}
          />
        </DestinationItem>
      )}
    />
  );
};
