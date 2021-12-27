import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  CheckBoxContainer,
  CheckBoxWrapper,
  CheckBoxWrapperChild,
} from '../../admin/screens/EditHotelScreen/EditHotelScreen.style';
import {
  SectionGreenText,
  SectionTitle,
  SectionWhiteText,
  SliderContainer,
  RowWrapper,
  SectionContainer,
  MainContainer,
  SectionsWrapper,
  LabelWrapper,
  LabelText,
  SliderWrapper,
  ButtonWrapper,
} from './FilterScreen.style';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import colors from '../../constants/colors';
import {ButtonItem} from '../../components/Buttons/ButtonItem';
import {useDispatch} from 'react-redux';
import {HotelsOptions} from '../../services/HotelOptions';
import {Formik} from 'formik';
import {clearHotels} from '../../../redux/actions/HotelActions';

import {useNavigation} from '@react-navigation/core';
const Slider = ({handler}) => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);
  const {height, width} = useWindowDimensions();

  const onValuesChangeHandler = useCallback(
    values => {
      setMultiSliderValue(values);
      handler(values);
    },
    [handler],
  );

  return (
    <SliderContainer>
      <MultiSlider
        markerStyle={{
          ...Platform.select({
            ios: {
              height: 20,
              width: 20,
              backgroundColor: colors.green,
              borderColor: colors.green,
              shadowRadius: 0,
            },
            android: {
              height: 20,
              width: 20,
              backgroundColor: colors.green,
              borderRadius: 50,
            },
          }),
        }}
        pressedMarkerStyle={{
          ...Platform.select({
            android: {
              height: 20,
              width: 20,
              borderRadius: 20,
              backgroundColor: colors.green,
            },
          }),
        }}
        selectedStyle={{
          backgroundColor: colors.white,
        }}
        trackStyle={{
          backgroundColor: colors.grey,
        }}
        touchDimensions={{
          height: 20,
          width: 20,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={width * 0.8}
        onValuesChange={onValuesChangeHandler}
        min={0}
        max={10000}
        allowOverlap={false}
        minMarkerOverlapDistance={0}
      />
      <LabelWrapper>
        <SectionWhiteText>{`$${multiSliderValue[0]}`} </SectionWhiteText>
        <SectionWhiteText>{`$${multiSliderValue[1]}`}</SectionWhiteText>
      </LabelWrapper>
    </SliderContainer>
  );
};

export const FilterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hotelOptions = new HotelsOptions();
  const setFieldsHandler = useCallback(
    ({priceRange, hotelOptions, beds}) => {
      const filter = {
        priceRange: priceRange.join(','),
        hotelOptions: hotelOptions.toString(),
      };
      dispatch(clearHotels());
      navigation.navigate('HotelsCatalog', {filter});
    },
    [dispatch, navigation],
  );
  return (
    <MainContainer>
      <Formik
        initialValues={{
          priceRange: [0, 100],
          beds: 0,
          hotelOptions: hotelOptions,
        }}
        onSubmit={setFieldsHandler}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <>
            <SectionsWrapper>
              <SectionContainer>
                <SectionTitle>Price</SectionTitle>
                <RowWrapper>
                  <SectionWhiteText>
                    The average nightly price is{' '}
                  </SectionWhiteText>
                  <SectionGreenText>4,589₽</SectionGreenText>
                </RowWrapper>
                <SliderWrapper>
                  <Slider
                    handler={values => setFieldValue('priceRange', values)}
                  />
                </SliderWrapper>
              </SectionContainer>
              <SectionContainer>
                <SectionTitle>Popular Fields</SectionTitle>
                <CheckBoxContainer>
                  <CheckBoxWrapperChild>
                    <CheckBoxWrapper>
                      <CheckBox
                        value={values.hotelOptions.digitalTV}
                        onValueChange={nextValue =>
                          setFieldValue('hotelOptions.digitalTV', nextValue)
                        }
                      />
                      <SectionWhiteText>{`DigitalTV`}</SectionWhiteText>
                    </CheckBoxWrapper>
                    <CheckBoxWrapper>
                      <CheckBox
                        value={values.hotelOptions.coffee}
                        onValueChange={nextValue =>
                          setFieldValue('hotelOptions.coffee', nextValue)
                        }
                      />
                      <SectionWhiteText>{`Coffee`}</SectionWhiteText>
                    </CheckBoxWrapper>
                    <CheckBoxWrapper>
                      <CheckBox
                        value={values.hotelOptions.wifi}
                        onValueChange={nextValue =>
                          setFieldValue('hotelOptions.wifi', nextValue)
                        }
                      />
                      <SectionWhiteText>{`Wifi`}</SectionWhiteText>
                    </CheckBoxWrapper>
                  </CheckBoxWrapperChild>
                  <CheckBoxWrapperChild>
                    <CheckBoxWrapper>
                      <CheckBox
                        value={values.hotelOptions.pets}
                        onValueChange={nextValue =>
                          setFieldValue('hotelOptions.pets', nextValue)
                        }
                      />
                      <SectionWhiteText>{`Pets`}</SectionWhiteText>
                    </CheckBoxWrapper>
                    <CheckBoxWrapper>
                      <CheckBox
                        value={values.hotelOptions.pool}
                        onValueChange={nextValue =>
                          setFieldValue('hotelOptions.pool', nextValue)
                        }
                      />
                      <SectionWhiteText>{`Pool`}</SectionWhiteText>
                    </CheckBoxWrapper>
                  </CheckBoxWrapperChild>
                </CheckBoxContainer>
              </SectionContainer>
            </SectionsWrapper>
            <ButtonWrapper>
              <ButtonItem title="Set filters" handler={handleSubmit} />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </MainContainer>
  );
};
