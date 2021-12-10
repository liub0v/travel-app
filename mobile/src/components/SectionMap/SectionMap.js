import React from 'react';
import {ScrollView, View} from 'react-native';
import {AnimatedLoader} from '../Loaders/AnimatedLoader';
import {SectionHeader} from '../Section/Section';

const Map = ({data, component, isLoading, loaderStyle}) => {
  const mockLoader = [{_id: 1}, {_id: 2}, {_id: 3}];
  if (isLoading) {
    return (
      <>
        {mockLoader?.map(item => (
          <AnimatedLoader style={loaderStyle} key={item._id} />
        ))}
      </>
    );
  }
  return <>{data?.map(item => component(item))}</>;
};

export const SectionMap = ({
  data,
  component,
  isLoading = false,
  loaderStyle,
  horizontal = false,
  headerOptions,
}) => {
  const MapComponent = (
    <Map
      data={data}
      component={component}
      isLoading={isLoading}
      loaderStyle={loaderStyle}
    />
  );
  const SectionHeaderComponent = <SectionHeader {...headerOptions} />;
  if (horizontal) {
    return (
      <>
        {SectionHeaderComponent}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row'}}>
          {MapComponent}
        </ScrollView>
      </>
    );
  } else
    return (
      <>
        {SectionHeaderComponent}
        <View>{MapComponent}</View>
      </>
    );
};
