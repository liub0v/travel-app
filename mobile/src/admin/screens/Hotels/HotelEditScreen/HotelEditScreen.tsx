import React, {useState} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {updateHotel} from '../../../../../redux/actions/HotelActions';
import {InputItem} from '../../../../screens/AuthScreens/LoginScreen/LoginScreen.style';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {Stars} from '../../../../components/Stars/Stars';
import {StarsRating} from '../../../../components/CommentInput/CommentInput';
export type Props = {
  route: any;
};

export const HotelEditScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotelInfo;
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
    const hotelOptionsStr = '';
    console.log(hotelOptions);
    dispatch(
      updateHotel({
        hotelID: hotel._id,
        name,
        summary,
        image,
        price: Number(price),
        address,
        starsNumber,
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
          hotelOptions: {
            digitalTV: false,
            coffee: false,
            wifi: false,
            pets: false,
            pool: false,
          },
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
            <StarsRating setStarRating={setStarsNumber} />
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
            <CheckBox
              value={values.hotelOptions.coffee}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.coffee', nextValue)
              }
            />
            <CheckBox
              value={values.hotelOptions.coffee}
              onValueChange={nextValue =>
                setFieldValue('hotelOptions.coffee', nextValue)
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
export default HotelEditScreen;
