import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {updateHotel} from '../../../../../redux/actions/HotelActions';
import {InputItem} from '../../../../screens/AuthScreens/LoginScreen/LoginScreen.style';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {StarsRating} from '../../../../components/CommentInput/CommentInput';

export type Props = {
  route: any;
};
type HotelsOptionsProps = {
  hotelOptions?: string;
};
class HotelsOptions<HotelsOptionsProps> {
  digitalTV: boolean;
  coffee: boolean;
  wifi: boolean;
  pets: boolean;
  pool: boolean;
  //i am not sure about this code
  constructor(hotelOptions = '') {
    this.digitalTV = false;
    this.coffee = false;
    this.wifi = false;
    this.pets = false;
    this.pool = false;
    hotelOptions &&
      hotelOptions.split(',').forEach((item: string) => {
        console.log(item);
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
}

export const EditHotelScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotel;
  const hotelOptions = new HotelsOptions(hotel?.hotelOptions);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [starsNumber, setStarsNumber] = useState(0);
  const selectFile = async () => {
    const res = await launchImageLibrary({maxHeight: 320, maxWidth: 500});
    setImage(res?.assets[0]);
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
    hotelOptions: object;
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
    <ScrollView style={{marginTop: 50}}>
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
            <Text>NAME</Text>
            <InputItem
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Text>SUMMARY</Text>
            <InputItem
              onChangeText={handleChange('summary')}
              onBlur={handleBlur('summary')}
              value={values.summary}
            />
            <Text>PRICE</Text>
            <InputItem
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              keyboardType="numeric"
            />
            <Text>ADDRESS</Text>
            <InputItem
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              keyboardType="numeric"
            />
            <StarsRating
              initStarsNumber={hotel.starsNumber}
              setStarRating={setStarsNumber}
            />
            <ButtonItem
              isLoading={false}
              title={'Select image'}
              handler={selectFile}
            />
            <Text>{`DigitalTV`}</Text>
            <CheckBox
              value={values.hotelOptions.digitalTV}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.digitalTV', nextValue)
              }
            />
            <Text>{`Coffee`}</Text>
            <CheckBox
              value={values.hotelOptions.coffee}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.coffee', nextValue)
              }
            />
            <Text>{`Wifi`}</Text>
            <CheckBox
              value={values.hotelOptions.wifi}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.wifi', nextValue)
              }
            />
            <Text>{`Pets`}</Text>
            <CheckBox
              value={values.hotelOptions.pets}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.pets', nextValue)
              }
            />
            <Text>{`Pool`}</Text>
            <CheckBox
              value={values.hotelOptions.pool}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.pool', nextValue)
              }
            />
            <ButtonItem
              isLoading={false}
              title={'Save changes'}
              handler={handleSubmit}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};
export default EditHotelScreen;
