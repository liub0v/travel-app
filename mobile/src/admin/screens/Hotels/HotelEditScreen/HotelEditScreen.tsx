import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateHotel} from '../../../../../redux/actions/HotelActions';
import {InputItem} from '../../../../screens/AuthScreens/LoginScreen/LoginScreen.style';
import {ButtonItem} from '../../../../components/Buttons/ButtonItem';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
export type Props = {
  route: any;
};

export const HotelEditScreen: React.FC<Props> = ({route}) => {
  const hotel = route.params.hotelInfo;
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const selectFile = async () => {
    const res = await launchImageLibrary({maxHeight: 320, maxWidth: 500});
    setImage(res?.assets[0]);
  };
  const editHandler = ({name, summary}: {name: string; summary: string}) => {
    dispatch(updateHotel({hotelID: hotel._id, name, summary, image}));
  };
  return (
    <View style={{marginTop: 50}}>
      <Formik
        initialValues={{
          name: hotel.name || 'no name',
          summary: hotel.summary || 'no summary',
          price: hotel.price || '0.0',
          address: '',
          beds: '',
          hotelOptions: '',
          starsNumber: '',
          image: '',
        }}
        onSubmit={editHandler}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
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
            <ButtonItem
              isLoading={false}
              title={'Save changes'}
              handler={handleSubmit}
            />
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={selectFile}>
        <Text>Select File</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HotelEditScreen;
