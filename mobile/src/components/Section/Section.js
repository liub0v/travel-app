import React from 'react';
import {Animated, Image, TouchableWithoutFeedback, View} from 'react-native';
import PropTypes from 'prop-types';

import {
  SectionContainer,
  SectionHeaderButton,
  SectionHeaderTitle,
  SectionHeaderTitleWrapper,
  SectionHeaderWrapper,
} from './Section.style';

import arrow from '../../../assets/images/arrowButton.png';

export const SectionHeader = ({
  title = 'Section',
  showRightButton = true,
  passHandler = () => {},
}) => {
  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitleWrapper>
        <SectionHeaderTitle>{title}</SectionHeaderTitle>
      </SectionHeaderTitleWrapper>
      {showRightButton && (
        <SectionHeaderButton>
          <TouchableWithoutFeedback onPress={passHandler}>
            <Image source={arrow} />
          </TouchableWithoutFeedback>
        </SectionHeaderButton>
      )}
    </SectionHeaderWrapper>
  );
};
export const Section = ({
  title = 'Section',
  isHorizontal = false,
  data,
  renderItem,
  showRightButton = true,
  passHandler = () => {},
}) => {
  const rowContainerStyle = {
    marginTop: 12,
    flexDirection: 'row',
  };
  const columnContainerStyle = {
    marginTop: 12,
    flexDirection: 'column',
  };
  return (
    <SectionContainer>
      <SectionHeader
        title={title}
        showRightButton={showRightButton}
        passHandler={passHandler}
      />
      <View style={isHorizontal ? rowContainerStyle : columnContainerStyle}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={isHorizontal}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </SectionContainer>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  isHorizontal: PropTypes.bool,
  data: PropTypes.array,
  renderItem: PropTypes.elementType,
};
