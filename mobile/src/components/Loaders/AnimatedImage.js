import {Animated} from 'react-native';
import colors from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import React, {useRef, useState} from 'react';

export const AnimatedImage = ({
  imageStyle,
  viewStyle,
  imageURL = '',
  resizeMode = null,
}) => {
  const animateState = {
    start: 0,
    end: 1,
  };
  const value = useRef(new Animated.Value(animateState.start)).current;
  const [backgroundColor, setBackgroundColor] = useState(colors.grey);
  const animation = useRef(
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
    ),
  ).current;

  const inputRange = [animateState.start, animateState.end];
  const opacity = value.interpolate({
    inputRange,
    outputRange: [1, 0.5],
  });

  return (
    <Animated.View
      style={{
        backgroundColor,
        opacity,
        ...viewStyle,
      }}>
      <FastImage
        resizeMode={resizeMode}
        style={imageStyle}
        blurRadius={5}
        source={{uri: imageURL}}
        onLoadStart={() => {
          setBackgroundColor(colors.grey);
          animation.start();
        }}
        onLoadEnd={() => {
          animation.stop();
          setBackgroundColor(colors.screenBackground);
          value.setValue(animateState.start);
        }}
      />
    </Animated.View>
  );
};
