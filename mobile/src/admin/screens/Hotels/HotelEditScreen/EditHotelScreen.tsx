import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {updateHotel} from '../../../../../redux/actions/HotelActions';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {StarsRating} from '../../../../components/CommentInput/CommentInput';
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
} from './EditHotelScreen.style';

import pool from '../../../../../assets/images/pool.png';
import pets from '../../../../../assets/images/pets.png';
import tv from '../../../../../assets/images/tv.png';
import wifi from '../../../../../assets/images/wifi.png';
import coffee from '../../../../../assets/images/coffee.png';

export type Props = {
  route: any;
};
type HotelsOptionsProps = {
  hotelOptions?: string;
};

export class HotelsOptions<HotelsOptionsProps> {
  [name: string | symbol]: (() => string) | boolean;
  digitalTV: boolean;
  coffee: boolean;
  wifi: boolean;
  pets: boolean;
  pool: boolean;

  constructor(hotelOptions = '') {
    this.digitalTV = false;
    this.coffee = false;
    this.wifi = false;
    this.pets = false;
    this.pool = false;
    hotelOptions &&
      hotelOptions.split(',').forEach((item: string) => {
        this[item] = true;
      });
  }
  toString(): string {
    const hotelOptionsArray: string[] = [];
    for (let prop in this) {
      this[prop] && hotelOptionsArray.push(prop);
    }
    return hotelOptionsArray.join(',');
  }
  show(): any {
    const hotelOptionsArray: object[] = [];
    for (let prop in this) {
      if (this[prop]) {
        switch (prop) {
          case 'pool':
            hotelOptionsArray.push({title: 'Pool', image: pool});
            break;
          case 'digitalTV':
            hotelOptionsArray.push({title: 'DigitalTV', image: tv});
            break;
          case 'coffee':
            hotelOptionsArray.push({title: 'Coffee', image: coffee});
            break;
          case 'wifi':
            hotelOptionsArray.push({title: 'Wifi', image: wifi});
            break;
          case 'pets':
            hotelOptionsArray.push({title: 'Pets', image: pets});
            break;
        }
      }
    }
    return hotelOptionsArray;
  }
}

export const EditHotelScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotel;
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);
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
              <StarsRating
                initStarsNumber={hotel.starsNumber}
                setStarRating={setStarsNumber}
              />
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
          </>
        )}
      </Formik>
    </Container>
  );
};
export default EditHotelScreen;
