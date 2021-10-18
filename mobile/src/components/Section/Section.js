import React from 'react';
import {FlatList, Image, TouchableWithoutFeedback, View} from 'react-native';
import PropTypes from 'prop-types';
import arrow from '../../../assets/images/arrowButton.png';
import {
  SectionContainer,
  SectionHeaderButton,
  SectionHeaderTitle,
  SectionHeaderTitleWrapper,
  SectionHeaderWrapper,
} from './Section.style';

const SectionHeader = ({title = 'Section', showRightButton}) => {
  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitleWrapper>
        <SectionHeaderTitle>{title}</SectionHeaderTitle>
      </SectionHeaderTitleWrapper>
      {showRightButton && (
        <SectionHeaderButton>
          <TouchableWithoutFeedback onPress={() => {}}>
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
}) => {
  const rowContainerStyle = {
    marginTop: 20,
    flexDirection: 'row',
  };
  const columnContainerStyle = {
    marginTop: 20,
    flexDirection: 'column',
  };
  return (
    <SectionContainer>
      <SectionHeader title={title} showRightButton={showRightButton} />
      <View style={isHorizontal ? rowContainerStyle : columnContainerStyle}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={isHorizontal}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
