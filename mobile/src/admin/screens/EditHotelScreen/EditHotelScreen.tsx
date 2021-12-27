import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {deleteHotel, updateHotel} from '../../../../redux/actions/HotelActions';
import {ButtonItem} from '../../../components/Buttons/ButtonItem';
import {HotelsOptions} from '../../../services/HotelOptions';
import type {HotelsOptionsProps} from '../../../services/HotelOptions';
import {Formik} from 'formik';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  AddressInput,
  CheckBoxContainer,
  CheckBoxTitle,
  CheckBoxWrapper,
  CheckBoxWrapperChild,
  Container,
  NameInput,
  PriceInput,
  SummaryInput,
  Title,
  ButtonWrapper,
  InputWrapper,
  StarsWrapper,
} from './EditHotelScreen.style';
import {
  currentHotelSelector,
  deleteHotelStartedSelector,
  updateHotelIsLoadingSelector,
} from '../../../../redux/selectors/HotelSelectors';
import colors from '../../../constants/colors';
import {StarsRating} from '../../../screens/ReviewsScreen/ReviewsScreen';
import {Text, View} from 'react-native';
import {hotelValidationSchema} from '../../../services/validation';

export type Props = {};

export const EditHotelScreen: React.FC<Props> = () => {
  const hotel = useSelector(currentHotelSelector);
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);
  const deleteLoading = useSelector(deleteHotelStartedSelector);
  const updateLoading = useSelector(updateHotelIsLoadingSelector);
  const dispatch = useDispatch();
  const [image, setImage] = useState<Asset>();
  const [starsNumber, setStarsNumber] = useState(0);
  const selectFile = async () => {
    const res = await launchImageLibrary({
      maxHeight: 320,
      maxWidth: 500,
      mediaType: 'photo',
    });
    setImage(res?.assets?.[0]);
  };

  const editHandler = ({
    name,
    summary,
    price,
    address,
    starsNumber,
    hotelOptions,
  }: {
    name: string;
    summary: string;
    price: number;
    starsNumber: number;
    address: string;
    hotelOptions: HotelsOptions<HotelsOptionsProps>;
  }) => {
    dispatch(
      updateHotel({
        hotelID: hotel._id,
        name,
        summary,
        image,
        price: Number(price),
        address,
        starsNumber,
        hotelOptions: hotelOptions.toString(),
      }),
    );
  };
  const deleteHotelHandler = () => {
    dispatch(deleteHotel(hotel._id));
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 24,
      }}>
      <Formik
        validationSchema={hotelValidationSchema}
        initialValues={{
          name: hotel?.name ?? 'no name',
          summary: hotel?.summary ?? 'no summary',
          price: hotel?.price.toString() ?? '0.0',
          address: hotel?.address ?? 'no address',
          beds: '',
          hotelOptions: hotelOptions,
          starsNumber: hotel?.starsNumber ?? 0,
          image: '',
        }}
        onSubmit={editHandler}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <ButtonItem
              isLoading={false}
              title={'Select image'}
              handler={selectFile}
            />
            <InputWrapper>
              <Title>Name</Title>
              <NameInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </InputWrapper>
            {errors.name && touched.name && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.name}
              </Text>
            )}
            <InputWrapper>
              <Title>Summary</Title>
              <SummaryInput
                multiline={true}
                onChangeText={handleChange('summary')}
                onBlur={handleBlur('summary')}
                value={values.summary}
              />
            </InputWrapper>

            <InputWrapper>
              <Title>Price</Title>
              <PriceInput
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType="numeric"
              />
            </InputWrapper>
            {errors.price && touched.price && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.price}
              </Text>
            )}
            <InputWrapper>
              <Title>Address</Title>
              <AddressInput
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                keyboardType="numeric"
              />
            </InputWrapper>
            {errors.address && touched.address && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.address}
              </Text>
            )}
            <InputWrapper>
              <Title>Stars number</Title>
              <StarsWrapper>
                <StarsRating
                  initStarsNumber={hotel.starsNumber}
                  setStarRating={(number: number) => {
                    setStarsNumber(number);
                    setFieldValue('starsNumber', number);
                  }}
                />
              </StarsWrapper>
            </InputWrapper>
            {errors.starsNumber && touched.starsNumber && (
              <Text style={{color: colors.red, padding: 6}}>
                {' '}
                {errors.starsNumber}
              </Text>
            )}
            <InputWrapper>
              <Title>Hotel options</Title>
              <CheckBoxContainer>
                <CheckBoxWrapperChild>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.digitalTV}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.digitalTV', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`DigitalTV`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.coffee}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.coffee', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Coffee`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.wifi}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.wifi', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Wifi`}</CheckBoxTitle>
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
                    <CheckBoxTitle>{`Pets`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckBox
                      value={values.hotelOptions.pool}
                      onValueChange={nextValue =>
                        setFieldValue('hotelOptions.pool', nextValue)
                      }
                    />
                    <CheckBoxTitle>{`Pool`}</CheckBoxTitle>
                  </CheckBoxWrapper>
                </CheckBoxWrapperChild>
              </CheckBoxContainer>
            </InputWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={updateLoading}
                title={'Save changes'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
      <View style={{marginBottom: 48, width: '100%'}}>
        <ButtonItem
          isLoading={deleteLoading}
          title={'Delete hotel'}
          handler={deleteHotelHandler}
          theme={{backgroundColor: colors.red, textColor: colors.white}}
        />
      </View>
    </Container>
  );
};
export default EditHotelScreen;
