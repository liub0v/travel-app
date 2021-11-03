import React from 'react';
import {FlatList, Image, TouchableWithoutFeedback, View} from 'react-native';

import {
  SectionContainer,
  SectionHeaderButton,
  SectionHeaderTitle,
  SectionHeaderTitleWrapper,
  SectionHeaderWrapper,
} from './Section.style';

import arrow from '../../../assets/images/arrowButton.png';

const SectionHeader = ({title}) => {
  return (
    <SectionHeaderWrapper>
      <SectionHeaderTitleWrapper>
        <SectionHeaderTitle>{title}</SectionHeaderTitle>
      </SectionHeaderTitleWrapper>
      <SectionHeaderButton>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Image source={arrow} />
        </TouchableWithoutFeedback>
      </SectionHeaderButton>
    </SectionHeaderWrapper>
  );
};
export const Section = ({title, isHorizontal = false, data, renderItem}) => {
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
      <SectionHeader title={title} />
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
