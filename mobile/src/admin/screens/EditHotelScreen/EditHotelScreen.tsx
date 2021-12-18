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
import {deleteHotelStartedSelector} from '../../../../redux/selectors/HotelSelectors';
import colors from '../../../constants/colors';
import {useRoute} from '@react-navigation/native';
import {StarsRating} from '../../../screens/ReviewsScreen/ReviewsScreen';

export type Props = {};

export const EditHotelScreen: React.FC<Props> = () => {
  const route = useRoute();
  const hotel = route.params?.hotel;
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);
  const deleteLoading = useSelector(deleteHotelStartedSelector);
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
    hotelOptions,
  }: {
    name: string;
    summary: string;
    price: number;
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
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <Formik
        initialValues={{
          name: hotel.name ?? 'no name',
          summary: hotel.summary ?? 'no summary',
          price: hotel.price.toString() ?? '0.0',
          address: hotel.address ?? 'no address',
          beds: '',
          hotelOptions: hotelOptions,
          starsNumber: hotel.starsNumber ?? 0,
          image: '',
        }}
        onSubmit={editHandler}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
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

            <InputWrapper>
              <Title>Address</Title>
              <AddressInput
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                keyboardType="numeric"
              />
            </InputWrapper>
            <InputWrapper>
              <Title>Stars number</Title>
              <StarsWrapper>
                <StarsRating
                  initStarsNumber={hotel.starsNumber}
                  setStarRating={setStarsNumber}
                />
              </StarsWrapper>
            </InputWrapper>

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
                isLoading={false}
                title={'Save changes'}
                handler={handleSubmit}
              />
            </ButtonWrapper>
            <ButtonWrapper>
              <ButtonItem
                isLoading={deleteLoading}
                title={'Delete hotel'}
                handler={deleteHotelHandler}
                theme={{backgroundColor: colors.red, textColor: colors.white}}
              />
            </ButtonWrapper>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default EditHotelScreen;
