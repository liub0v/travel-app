import {FlatList, Image, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import arrow from '../../../assets/images/arrowButton.png';
import {
  SectionContainer,
  SectionHeaderButton,
  SectionHeaderTitle,
  SectionHeaderTitleWrapper,
  SectionHeaderWrapper,
} from './Section.style';

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
export const Section = ({title, isHorizontal, data, renderItem}) => {
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
          horizontal={isHorizontal}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SectionContainer>
  );
};
